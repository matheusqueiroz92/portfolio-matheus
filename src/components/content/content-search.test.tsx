import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ContentSearch } from '@/components/content/content-search'
import { renderWithProviders } from '@/test/render-with-providers'

const replaceMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  usePathname: () => '/projects',
  useSearchParams: () => new URLSearchParams('q=next'),
}))

describe('ContentSearch', () => {
  it('syncs input value from url query', () => {
    renderWithProviders(<ContentSearch placeholder="Buscar projetos" />)

    expect(screen.getByRole('textbox', { name: 'Buscar projetos' })).toHaveValue('next')
  })

  it('updates url after debounce when typing', () => {
    vi.useFakeTimers()
    renderWithProviders(<ContentSearch debounceMs={300} />)

    const input = screen.getByRole('textbox', { name: 'Buscar…' })
    fireEvent.change(input, { target: { value: 'react' } })
    vi.advanceTimersByTime(300)

    expect(replaceMock).toHaveBeenCalledWith('/projects?q=react', { scroll: false })
    vi.useRealTimers()
  })

  it('clears search immediately', () => {
    renderWithProviders(<ContentSearch />)

    fireEvent.click(screen.getByRole('button', { name: 'Limpar busca' }))

    expect(replaceMock).toHaveBeenCalledWith('/projects', { scroll: false })
    expect(screen.getByRole('textbox', { name: 'Buscar…' })).toHaveValue('')
  })
})
