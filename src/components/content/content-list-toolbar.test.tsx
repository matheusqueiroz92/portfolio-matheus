import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ContentListToolbar } from '@/components/content/content-list-toolbar'
import { renderWithProviders } from '@/test/render-with-providers'

describe('ContentListToolbar', () => {
  it('shows total count without active query', () => {
    renderWithProviders(
      <ContentListToolbar
        totalItems={3}
        itemSingular="projeto"
        itemPlural="projetos"
        searchPlaceholder="Buscar projetos"
      />,
    )

    expect(screen.getByText('3 projetos')).toBeInTheDocument()
  })

  it('shows filtered results summary', () => {
    renderWithProviders(
      <ContentListToolbar
        totalItems={2}
        itemSingular="post"
        itemPlural="posts"
        searchPlaceholder="Buscar posts"
        query="next"
      />,
    )

    expect(screen.getByText(/2 posts encontrados para “next”/)).toBeInTheDocument()
  })

  it('shows empty results message for query without matches', () => {
    renderWithProviders(
      <ContentListToolbar
        totalItems={0}
        itemSingular="post"
        itemPlural="posts"
        searchPlaceholder="Buscar posts"
        query="graphql"
      />,
    )

    expect(screen.getByText(/Nenhum resultado para “graphql”/)).toBeInTheDocument()
  })
})
