import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ScrollDownButton } from '@/components/ui/scroll-down-button'
import { renderWithProviders } from '@/test/render-with-providers'

describe('ScrollDownButton', () => {
  it('renders localized scroll down link', () => {
    renderWithProviders(<ScrollDownButton href="#about" />)

    expect(screen.getByRole('link', { name: 'Rolar para a próxima seção' })).toHaveAttribute(
      'href',
      '#about',
    )
  })

  it('supports custom label', () => {
    renderWithProviders(<ScrollDownButton href="#projects" label="Ir para projetos" />)

    expect(screen.getByRole('link', { name: 'Ir para projetos' })).toBeInTheDocument()
  })
})
