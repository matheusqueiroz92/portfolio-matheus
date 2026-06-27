import type { BlogPostListItem, ProjectListItem } from '@/types'

export const PROJECTS_PAGE_SIZE = 9
export const BLOG_PAGE_SIZE = 6

export interface PaginatedResult<T> {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export type PaginationItem = number | 'ellipsis'

/**
 * Normaliza parâmetros de query string do Next.js (`string | string[] | undefined`).
 */
export function parseQueryParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0]?.trim() ?? ''
  return value?.trim() ?? ''
}

export function parsePageParam(value: string | string[] | undefined, defaultPage = 1): number {
  const raw = parseQueryParam(value)
  if (!raw) return defaultPage

  const parsed = Number.parseInt(raw, 10)
  if (!Number.isFinite(parsed) || parsed < 1) return defaultPage

  return parsed
}

/**
 * Remove acentos e colapsa espaços para comparação case-insensitive.
 */
export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
}

export function matchesSearchQuery(haystack: string, query: string): boolean {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return true

  return normalizeSearchText(haystack).includes(normalizedQuery)
}

function matchesAnyField(fields: (string | null | undefined)[], query: string): boolean {
  if (!normalizeSearchText(query)) return true
  return fields.some((field) => field && matchesSearchQuery(field, query))
}

export function filterProjects(projects: ProjectListItem[], query: string): ProjectListItem[] {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return projects

  return projects.filter((project) =>
    matchesAnyField(
      [
        project.title,
        project.description,
        project.scale,
        ...(project.technologies ?? []),
        ...(project.tags ?? []),
      ],
      query,
    ),
  )
}

export function filterBlogPosts(posts: BlogPostListItem[], query: string): BlogPostListItem[] {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return posts

  return posts.filter((post) =>
    matchesAnyField([post.title, post.excerpt, ...(post.tags ?? [])], query),
  )
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number,
): PaginatedResult<T> {
  const safePageSize = Math.max(1, pageSize)
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * safePageSize

  return {
    items: items.slice(start, start + safePageSize),
    page: safePage,
    pageSize: safePageSize,
    totalItems,
    totalPages,
  }
}

export function buildListHref(
  basePath: string,
  params: { q?: string; page?: number },
): string {
  const searchParams = new URLSearchParams()
  const query = params.q?.trim()

  if (query) searchParams.set('q', query)
  if (params.page && params.page > 1) searchParams.set('page', String(params.page))

  const qs = searchParams.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

/**
 * Gera a sequência de páginas visíveis com reticências para listas longas.
 */
export function getPaginationRange(current: number, total: number): PaginationItem[] {
  if (total <= 1) return [1]
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const pages = new Set<number>([1, total, current, current - 1, current + 1])
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b)

  const result: PaginationItem[] = []

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index]
    const previous = sorted[index - 1]

    if (previous !== undefined && page - previous > 1) {
      result.push('ellipsis')
    }

    result.push(page)
  }

  return result
}
