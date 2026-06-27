import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ContentPagination } from '@/components/content/content-pagination'
import { renderWithProviders } from '@/test/render-with-providers'

describe('ContentPagination', () => {
  it('returns null when there is only one page', () => {
    const { container } = renderWithProviders(
      <ContentPagination basePath="/projects" currentPage={1} totalPages={1} />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders navigation links for multi-page lists', () => {
    renderWithProviders(
      <ContentPagination basePath="/projects" currentPage={2} totalPages={5} query="next" />,
    )

    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Paginação')
    expect(screen.getByRole('link', { name: 'Anterior' })).toHaveAttribute(
      'href',
      '/projects?q=next',
    )
    expect(screen.getByRole('link', { name: 'Próxima' })).toHaveAttribute(
      'href',
      '/projects?q=next&page=3',
    )
    expect(screen.getByText('2').closest('[aria-current="page"]')).toBeTruthy()
  })
})
