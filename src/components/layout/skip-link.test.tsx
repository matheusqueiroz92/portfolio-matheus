import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SkipLink } from '@/components/layout/skip-link'
import { renderWithProviders } from '@/test/render-with-providers'

describe('SkipLink', () => {
  it('renders localized skip link', () => {
    renderWithProviders(<SkipLink />)

    const link = screen.getByRole('link', { name: 'Pular para o conteúdo principal' })
    expect(link).toHaveAttribute('href', '#conteudo-principal')
  })
})
