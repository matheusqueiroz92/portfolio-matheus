import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BackButton } from '@/components/layout/back-button'
import { renderWithProviders } from '@/test/render-with-providers'

describe('BackButton', () => {
  it('renders localized back link', () => {
    renderWithProviders(<BackButton href="/projects" label="projetos" />)

    const link = screen.getByRole('link', { name: 'Voltar para projetos' })
    expect(link).toHaveAttribute('href', '/projects')
  })
})
