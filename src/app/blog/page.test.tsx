import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { samplePosts } from '@/test/fixtures/content'
import { renderWithProviders } from '@/test/render-with-providers'

const navigationMocks = vi.hoisted(() => ({
  replace: vi.fn(),
  pathname: '/blog',
  searchParams: new URLSearchParams(),
}))

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string }) => <img alt={alt} {...props} />,
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    resolvedTheme: 'light',
    setTheme: vi.fn(),
  }),
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode }) => <div {...props}>{children}</div>,
  },
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: navigationMocks.replace,
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => navigationMocks.pathname,
  useSearchParams: () => navigationMocks.searchParams,
}))

vi.mock('@/lib/content', () => ({
  getAllPosts: vi.fn(),
}))

vi.mock('@/lib/server-locale', () => ({
  getServerLocale: vi.fn().mockResolvedValue('pt-BR'),
}))

import { getAllPosts } from '@/lib/content'
import BlogIndexPage from './page'

const blogSearchPlaceholder = 'Buscar por título, resumo ou tag…'

describe('BlogIndexPage (/blog)', () => {
  beforeEach(() => {
    navigationMocks.replace.mockClear()
    navigationMocks.pathname = '/blog'
    navigationMocks.searchParams = new URLSearchParams()
    vi.mocked(getAllPosts).mockResolvedValue(samplePosts)
  })

  it('lists blog posts and highlights the featured post', async () => {
    const ui = await BlogIndexPage({ searchParams: Promise.resolve({}) })
    renderWithProviders(ui)

    expect(screen.getByRole('heading', { name: 'Notas & bastidores' })).toBeInTheDocument()
    expect(screen.getByText('Em destaque')).toBeInTheDocument()
    expect(screen.getAllByText(samplePosts[0].title).length).toBeGreaterThan(0)
    expect(screen.getByText(samplePosts[1].title)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: `Ler: ${samplePosts[1].title}` })).toHaveAttribute(
      'href',
      `/blog/${samplePosts[1].slug}`,
    )
  })

  it('filters posts by search query', async () => {
    navigationMocks.searchParams = new URLSearchParams('q=Regular')
    const ui = await BlogIndexPage({ searchParams: Promise.resolve({ q: 'Regular' }) })
    renderWithProviders(ui)

    expect(screen.getByText('Post Regular')).toBeInTheDocument()
    expect(screen.queryByText('Post em Destaque')).not.toBeInTheDocument()
  })

  it('shows empty results message when search has no matches', async () => {
    const ui = await BlogIndexPage({ searchParams: Promise.resolve({ q: 'graphql' }) })
    renderWithProviders(ui)

    expect(screen.getByRole('heading', { name: 'Nenhum post encontrado' })).toBeInTheDocument()
  })
})

describe('BlogIndexPage search bar', () => {
  beforeEach(() => {
    navigationMocks.replace.mockClear()
    navigationMocks.pathname = '/blog'
    navigationMocks.searchParams = new URLSearchParams()
    vi.mocked(getAllPosts).mockResolvedValue(samplePosts)
  })

  it('renders the search input with localized placeholder', async () => {
    const ui = await BlogIndexPage({ searchParams: Promise.resolve({}) })
    renderWithProviders(ui)

    expect(screen.getByRole('search')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: blogSearchPlaceholder })).toBeInTheDocument()
  })

  it('syncs the input value from the url query string', async () => {
    navigationMocks.searchParams = new URLSearchParams('q=Regular')
    const ui = await BlogIndexPage({ searchParams: Promise.resolve({ q: 'Regular' }) })
    renderWithProviders(ui)

    expect(screen.getByRole('textbox', { name: blogSearchPlaceholder })).toHaveValue('Regular')
    expect(screen.getByText(/1 post encontrado para “Regular”/)).toBeInTheDocument()
  })

  it('updates the url after debounce when typing', async () => {
    vi.useFakeTimers()
    const ui = await BlogIndexPage({ searchParams: Promise.resolve({}) })
    renderWithProviders(ui)

    const input = screen.getByRole('textbox', { name: blogSearchPlaceholder })
    fireEvent.change(input, { target: { value: 'arquitetura' } })
    vi.advanceTimersByTime(300)

    expect(navigationMocks.replace).toHaveBeenCalledWith('/blog?q=arquitetura', { scroll: false })
    vi.useRealTimers()
  })

  it('clears the search and resets the url', async () => {
    navigationMocks.searchParams = new URLSearchParams('q=Regular')
    const ui = await BlogIndexPage({ searchParams: Promise.resolve({ q: 'Regular' }) })
    renderWithProviders(ui)

    fireEvent.click(screen.getByRole('button', { name: 'Limpar busca' }))

    expect(navigationMocks.replace).toHaveBeenCalledWith('/blog', { scroll: false })
    expect(screen.getByRole('textbox', { name: blogSearchPlaceholder })).toHaveValue('')
  })

  it('submits the search immediately on form submit', async () => {
    const user = userEvent.setup()
    const ui = await BlogIndexPage({ searchParams: Promise.resolve({}) })
    renderWithProviders(ui)

    const input = screen.getByRole('textbox', { name: blogSearchPlaceholder })
    await user.type(input, 'typescript')
    await user.keyboard('{Enter}')

    expect(navigationMocks.replace).toHaveBeenCalledWith('/blog?q=typescript', { scroll: false })
  })
})
