import { describe, expect, it } from 'vitest'

import type { BlogPostListItem, ProjectListItem } from '@/types'

import {
  BLOG_PAGE_SIZE,
  buildListHref,
  filterBlogPosts,
  filterProjects,
  getPaginationRange,
  matchesSearchQuery,
  normalizeSearchText,
  paginateItems,
  parsePageParam,
  parseQueryParam,
  PROJECTS_PAGE_SIZE,
} from './list-utils'

const sampleProjects: ProjectListItem[] = [
  {
    id: 'finnance',
    title: 'M-Finnance AI',
    slug: 'm-finnance-ai',
    description: 'Plataforma financeira com IA para análise de gastos.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    tags: ['fintech', 'ia'],
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    scale: 'MVP',
  },
  {
    id: 'move',
    title: 'M-Move App',
    slug: 'm-move-app',
    description: 'App de treinos e acompanhamento físico.',
    technologies: ['React Native', 'Node.js'],
    tags: ['mobile', 'saude'],
    updatedAt: '2024-06-01T00:00:00.000Z',
    createdAt: '2024-06-01T00:00:00.000Z',
  },
  {
    id: 'oticas',
    title: 'Óticas Queiroz',
    slug: 'oticas-queiroz',
    description: 'Monorepo com Turborepo para rede de óticas.',
    technologies: ['Turborepo', 'Next.js'],
    tags: ['monorepo', 'varejo'],
    updatedAt: '2024-03-01T00:00:00.000Z',
    createdAt: '2024-03-01T00:00:00.000Z',
    scale: '10 filiais',
  },
]

const samplePosts: BlogPostListItem[] = [
  {
    id: 'ia-automacao',
    title: 'IA além do chat',
    slug: 'ia-alem-do-chat-automacao',
    excerpt: 'Como aplicar IA em automações reais de negócio.',
    publishedDate: '2025-02-01T00:00:00.000Z',
    tags: ['ia', 'automacao'],
  },
  {
    id: 'prompt-finance',
    title: 'Engenharia de prompt em sistemas financeiros',
    slug: 'engenharia-de-prompt-sistemas-financeiros',
    excerpt: 'Padrões de prompt para fluxos financeiros confiáveis.',
    publishedDate: '2025-01-15T00:00:00.000Z',
    tags: ['ia', 'fintech'],
  },
  {
    id: 'monorepo',
    title: 'Monorepo com Turborepo',
    slug: 'monorepo-turborepo-oticas-queiroz',
    excerpt: 'Bastidores da arquitetura do projeto Óticas Queiroz.',
    publishedDate: '2024-12-01T00:00:00.000Z',
    tags: ['monorepo', 'arquitetura'],
  },
]

describe('normalizeSearchText', () => {
  it('remove acentos e normaliza caixa', () => {
    expect(normalizeSearchText('  Engenharia de Prompt  ')).toBe('engenharia de prompt')
    expect(normalizeSearchText('Óticas')).toBe('oticas')
  })
})

describe('matchesSearchQuery', () => {
  it('faz busca parcial case-insensitive', () => {
    expect(matchesSearchQuery('Next.js Fullstack', 'next')).toBe(true)
    expect(matchesSearchQuery('React Native', 'vue')).toBe(false)
  })

  it('retorna true para query vazia', () => {
    expect(matchesSearchQuery('qualquer texto', '')).toBe(true)
  })
})

describe('parseQueryParam', () => {
  it('normaliza string e array de query params', () => {
    expect(parseQueryParam(' next ')).toBe('next')
    expect(parseQueryParam(['react', 'ignored'])).toBe('react')
    expect(parseQueryParam(undefined)).toBe('')
  })
})

describe('parsePageParam', () => {
  it('valida números de página', () => {
    expect(parsePageParam('3')).toBe(3)
    expect(parsePageParam('0')).toBe(1)
    expect(parsePageParam('-1')).toBe(1)
    expect(parsePageParam('abc')).toBe(1)
    expect(parsePageParam(undefined, 2)).toBe(2)
  })
})

describe('filterProjects', () => {
  it('filtra por título, descrição, tecnologia, tag e escala', () => {
    expect(filterProjects(sampleProjects, 'finnance')).toHaveLength(1)
    expect(filterProjects(sampleProjects, 'turborepo')).toHaveLength(1)
    expect(filterProjects(sampleProjects, 'mobile')).toHaveLength(1)
    expect(filterProjects(sampleProjects, '10 filiais')).toHaveLength(1)
    expect(filterProjects(sampleProjects, 'inexistente')).toHaveLength(0)
  })

  it('retorna todos os projetos quando a busca está vazia', () => {
    expect(filterProjects(sampleProjects, '')).toHaveLength(sampleProjects.length)
  })
})

describe('filterBlogPosts', () => {
  it('filtra por título, excerpt e tags', () => {
    expect(filterBlogPosts(samplePosts, 'prompt')).toHaveLength(1)
    expect(filterBlogPosts(samplePosts, 'monorepo')).toHaveLength(1)
    expect(filterBlogPosts(samplePosts, 'fintech')).toHaveLength(1)
    expect(filterBlogPosts(samplePosts, 'graphql')).toHaveLength(0)
  })
})

describe('paginateItems', () => {
  it('divide itens em páginas', () => {
    const page1 = paginateItems(sampleProjects, 1, 2)
    const page2 = paginateItems(sampleProjects, 2, 2)

    expect(page1.items).toHaveLength(2)
    expect(page1.page).toBe(1)
    expect(page1.totalPages).toBe(2)
    expect(page1.totalItems).toBe(3)

    expect(page2.items).toHaveLength(1)
    expect(page2.page).toBe(2)
  })

  it('limita página acima do total', () => {
    const result = paginateItems(sampleProjects, 99, 2)
    expect(result.page).toBe(2)
    expect(result.items).toHaveLength(1)
  })

  it('expõe tamanhos padrão de página', () => {
    expect(PROJECTS_PAGE_SIZE).toBeGreaterThan(0)
    expect(BLOG_PAGE_SIZE).toBeGreaterThan(0)
  })
})

describe('buildListHref', () => {
  it('monta URLs com query e página', () => {
    expect(buildListHref('/projects', {})).toBe('/projects')
    expect(buildListHref('/projects', { q: 'next' })).toBe('/projects?q=next')
    expect(buildListHref('/blog', { q: 'ia', page: 2 })).toBe('/blog?q=ia&page=2')
    expect(buildListHref('/blog', { page: 1 })).toBe('/blog')
  })
})

describe('getPaginationRange', () => {
  it('retorna todas as páginas quando o total é pequeno', () => {
    expect(getPaginationRange(2, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('insere reticências em listas longas', () => {
    expect(getPaginationRange(5, 10)).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 10])
  })
})
