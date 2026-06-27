import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { sampleProjects } from '@/test/fixtures/content'
import { renderWithProviders } from '@/test/render-with-providers'

const navigationMocks = vi.hoisted(() => ({
  replace: vi.fn(),
  pathname: '/projects',
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
  getAllProjects: vi.fn(),
}))

vi.mock('@/lib/server-locale', () => ({
  getServerLocale: vi.fn().mockResolvedValue('pt-BR'),
}))

import { getAllProjects } from '@/lib/content'
import ProjectsIndexPage from './page'

const projectsSearchPlaceholder = 'Buscar por título, tecnologia ou tag…'

describe('ProjectsIndexPage (/projects)', () => {
  beforeEach(() => {
    navigationMocks.replace.mockClear()
    navigationMocks.pathname = '/projects'
    navigationMocks.searchParams = new URLSearchParams()
    vi.mocked(getAllProjects).mockResolvedValue(sampleProjects)
  })

  it('lists all projects on the index page', async () => {
    const ui = await ProjectsIndexPage({ searchParams: Promise.resolve({}) })
    renderWithProviders(ui)

    expect(screen.getByRole('heading', { name: 'Todos os projetos' })).toBeInTheDocument()
    expect(screen.getByText(sampleProjects[0].title)).toBeInTheDocument()
    expect(screen.getByText(sampleProjects[1].title)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: `Ver case: ${sampleProjects[0].title}` }),
    ).toHaveAttribute('href', `/projects/${sampleProjects[0].slug}`)
  })

  it('filters projects by search query', async () => {
    navigationMocks.searchParams = new URLSearchParams('q=Alpha')
    const ui = await ProjectsIndexPage({ searchParams: Promise.resolve({ q: 'Alpha' }) })
    renderWithProviders(ui)

    expect(screen.getByText('Projeto Teste Alpha')).toBeInTheDocument()
    expect(screen.queryByText('Projeto Teste Beta')).not.toBeInTheDocument()
  })

  it('shows empty results message when search has no matches', async () => {
    const ui = await ProjectsIndexPage({ searchParams: Promise.resolve({ q: 'inexistente' }) })
    renderWithProviders(ui)

    expect(screen.getByRole('heading', { name: 'Nenhum projeto encontrado' })).toBeInTheDocument()
  })
})

describe('ProjectsIndexPage search bar', () => {
  beforeEach(() => {
    navigationMocks.replace.mockClear()
    navigationMocks.pathname = '/projects'
    navigationMocks.searchParams = new URLSearchParams()
    vi.mocked(getAllProjects).mockResolvedValue(sampleProjects)
  })

  it('renders the search input with localized placeholder', async () => {
    const ui = await ProjectsIndexPage({ searchParams: Promise.resolve({}) })
    renderWithProviders(ui)

    expect(screen.getByRole('search')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: projectsSearchPlaceholder })).toBeInTheDocument()
  })

  it('syncs the input value from the url query string', async () => {
    navigationMocks.searchParams = new URLSearchParams('q=Alpha')
    const ui = await ProjectsIndexPage({ searchParams: Promise.resolve({ q: 'Alpha' }) })
    renderWithProviders(ui)

    expect(screen.getByRole('textbox', { name: projectsSearchPlaceholder })).toHaveValue('Alpha')
    expect(screen.getByText(/1 projeto encontrado para “Alpha”/)).toBeInTheDocument()
  })

  it('updates the url after debounce when typing', async () => {
    vi.useFakeTimers()
    const ui = await ProjectsIndexPage({ searchParams: Promise.resolve({}) })
    renderWithProviders(ui)

    const input = screen.getByRole('textbox', { name: projectsSearchPlaceholder })
    fireEvent.change(input, { target: { value: 'nextjs' } })
    vi.advanceTimersByTime(300)

    expect(navigationMocks.replace).toHaveBeenCalledWith('/projects?q=nextjs', { scroll: false })
    vi.useRealTimers()
  })

  it('clears the search and resets the url', async () => {
    navigationMocks.searchParams = new URLSearchParams('q=Alpha')
    const ui = await ProjectsIndexPage({ searchParams: Promise.resolve({ q: 'Alpha' }) })
    renderWithProviders(ui)

    fireEvent.click(screen.getByRole('button', { name: 'Limpar busca' }))

    expect(navigationMocks.replace).toHaveBeenCalledWith('/projects', { scroll: false })
    expect(screen.getByRole('textbox', { name: projectsSearchPlaceholder })).toHaveValue('')
  })

  it('submits the search immediately on form submit', async () => {
    const user = userEvent.setup()
    const ui = await ProjectsIndexPage({ searchParams: Promise.resolve({}) })
    renderWithProviders(ui)

    const input = screen.getByRole('textbox', { name: projectsSearchPlaceholder })
    await user.type(input, 'typescript')
    await user.keyboard('{Enter}')

    expect(navigationMocks.replace).toHaveBeenCalledWith('/projects?q=typescript', { scroll: false })
  })
})
