/**
 * Content loader
 *
 * Lê arquivos MDX de `src/content/posts` e `src/content/projects` em tempo de
 * build (React Server Components). Valida o frontmatter, converte para os
 * tipos consumidos pelo front e calcula metadados derivados (ex.: tempo de
 * leitura estimado).
 *
 * Este módulo é server-only: usa `node:fs/promises` e `node:path`. Nunca
 * importe dele a partir de componentes `"use client"`.
 */

import { cache } from 'react'
import { promises as fs } from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'
import readingTime from 'reading-time'

import type { BlogPost, BlogPostListItem, ContentImage, Project, ProjectListItem } from '@/types'

// -----------------------------------------------------------------------------
// Caminhos base
// -----------------------------------------------------------------------------

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content')
const POSTS_DIR = path.join(CONTENT_ROOT, 'posts')
const PROJECTS_DIR = path.join(CONTENT_ROOT, 'projects')

// -----------------------------------------------------------------------------
// Utilitários compartilhados
// -----------------------------------------------------------------------------

/**
 * Lista arquivos `.mdx` de um diretório. Retorna array vazio se o diretório
 * ainda não existir (ex.: nenhum projeto/post criado ainda).
 */
async function listMdxFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    return entries
      .filter(
        (entry) => entry.isFile() && entry.name.endsWith('.mdx') && !entry.name.startsWith('_'),
      )
      .map((entry) => entry.name)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw err
  }
}

/**
 * Normaliza um caminho de imagem vindo do frontmatter para um `ContentImage`
 * tipado. Aceita:
 *   - string   → `{ url }`
 *   - objeto   → mantém `alt`/`width`/`height`
 *   - null/undefined → `null`
 */
function toContentImage(value: unknown, fallbackAlt: string): ContentImage | null {
  if (!value) return null
  if (typeof value === 'string') {
    return { url: value, alt: fallbackAlt }
  }
  if (typeof value === 'object' && value !== null && 'url' in value) {
    const obj = value as Record<string, unknown>
    const url = typeof obj.url === 'string' ? obj.url : null
    if (!url) return null
    return {
      url,
      alt: typeof obj.alt === 'string' ? obj.alt : fallbackAlt,
      width: typeof obj.width === 'number' ? obj.width : undefined,
      height: typeof obj.height === 'number' ? obj.height : undefined,
    }
  }
  return null
}

function asStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null
  const strings = value.filter((v): v is string => typeof v === 'string')
  return strings.length > 0 ? strings : null
}

function requireString(data: Record<string, unknown>, key: string, fileLabel: string): string {
  const value = data[key]
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(
      `[content] Frontmatter inválido em "${fileLabel}": campo "${key}" é obrigatório e precisa ser string.`,
    )
  }
  return value
}

function optionalString(data: Record<string, unknown>, key: string): string | undefined {
  const value = data[key]
  return typeof value === 'string' && value.trim() !== '' ? value : undefined
}

/**
 * Normaliza datas do frontmatter. gray-matter devolve `Date` para valores
 * YAML reconhecidos, mas o tipo `BlogPost.publishedDate` é `string` (ISO).
 */
function normalizeDate(value: unknown, fileLabel: string): string {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString()
  }
  throw new Error(
    `[content] Frontmatter inválido em "${fileLabel}": "publishedDate" precisa ser uma data válida.`,
  )
}

/**
 * Deriva um slug a partir do nome do arquivo, removendo a extensão.
 */
function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, '')
}

// -----------------------------------------------------------------------------
// Blog
// -----------------------------------------------------------------------------

interface ParsedPost {
  data: BlogPost
  listItem: BlogPostListItem
}

async function parsePostFile(filename: string): Promise<ParsedPost> {
  const fullPath = path.join(POSTS_DIR, filename)
  const raw = await fs.readFile(fullPath, 'utf-8')
  const { data, content } = matter(raw)

  const fileLabel = `posts/${filename}`
  const slug = optionalString(data, 'slug') ?? slugFromFilename(filename)

  const title = requireString(data, 'title', fileLabel)
  const excerpt = requireString(data, 'excerpt', fileLabel)
  const publishedDate = normalizeDate(data.publishedDate, fileLabel)
  const coverImage = toContentImage(data.coverImage, title)
  const tags = asStringArray(data.tags)
  const readingStats = readingTime(content)

  const listItem: BlogPostListItem = {
    id: slug,
    title,
    slug,
    excerpt,
    coverImage,
    publishedDate,
    tags,
  }

  const fullPost: BlogPost = {
    ...listItem,
    content,
    readingTimeMinutes: Math.max(1, Math.round(readingStats.minutes)),
  }

  return { data: fullPost, listItem }
}

const loadAllPosts = cache(async (): Promise<ParsedPost[]> => {
  const files = await listMdxFiles(POSTS_DIR)
  const parsed = await Promise.all(files.map((file) => parsePostFile(file)))

  // Ordena por data de publicação, mais recentes primeiro.
  return parsed.sort(
    (a, b) => new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime(),
  )
})

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  const posts = await loadAllPosts()
  return posts.map((p) => p.listItem)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadAllPosts()
  const match = posts.find((p) => p.data.slug === slug)
  return match?.data ?? null
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await loadAllPosts()
  return posts.map((p) => p.data.slug)
}

// -----------------------------------------------------------------------------
// Projetos
// -----------------------------------------------------------------------------

interface ParsedProject {
  data: Project
  listItem: ProjectListItem
  order: number
  featured: boolean
  publishedDate: string
}

async function parseProjectFile(filename: string): Promise<ParsedProject> {
  const fullPath = path.join(PROJECTS_DIR, filename)
  const raw = await fs.readFile(fullPath, 'utf-8')
  const { data, content } = matter(raw)

  const fileLabel = `projects/${filename}`
  const slug = optionalString(data, 'slug') ?? slugFromFilename(filename)

  const title = requireString(data, 'title', fileLabel)
  const description = requireString(data, 'description', fileLabel)
  const publishedDate = normalizeDate(data.publishedDate, fileLabel)
  const projectImage = toContentImage(data.projectImage, title)
  const urlProject = optionalString(data, 'urlProject')
  const urlRepository = optionalString(data, 'urlRepository')
  const technologies = asStringArray(data.technologies)
  const tags = asStringArray(data.tags)
  const scale = optionalString(data, 'scale')
  const featured = data.featured === true
  const order =
    typeof data.order === 'number' && Number.isFinite(data.order)
      ? data.order
      : Number.MAX_SAFE_INTEGER

  const listItem: ProjectListItem = {
    id: slug,
    title,
    slug,
    description,
    projectImage,
    urlProject,
    urlRepository,
    technologies,
    tags,
    updatedAt: publishedDate,
    createdAt: publishedDate,
    scale,
  }

  const fullProject: Project = {
    ...listItem,
    content,
  }

  return { data: fullProject, listItem, order, featured, publishedDate }
}

const loadAllProjects = cache(async (): Promise<ParsedProject[]> => {
  const files = await listMdxFiles(PROJECTS_DIR)
  const parsed = await Promise.all(files.map((file) => parseProjectFile(file)))

  // Ordena por:
  //   1) `order` crescente (número menor → primeiro)
  //   2) `publishedDate` decrescente (desempate)
  return parsed.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  })
})

export async function getAllProjects(): Promise<ProjectListItem[]> {
  const projects = await loadAllProjects()
  return projects.map((p) => p.listItem)
}

/**
 * Retorna apenas os projetos marcados como `featured: true` no frontmatter.
 * Usado no carrossel da home.
 */
export async function getFeaturedProjects(): Promise<ProjectListItem[]> {
  const projects = await loadAllProjects()
  return projects.filter((p) => p.featured).map((p) => p.listItem)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await loadAllProjects()
  const match = projects.find((p) => p.data.slug === slug)
  return match?.data ?? null
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await loadAllProjects()
  return projects.map((p) => p.data.slug)
}
