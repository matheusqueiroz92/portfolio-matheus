import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ScrollTopButton } from '@/components/ui/scroll-top-button'
import { renderWithProviders } from '@/test/render-with-providers'

describe('ScrollTopButton', () => {
  it('becomes visible when footer enters viewport', () => {
    const footer = document.createElement('footer')
    document.body.appendChild(footer)

    footer.getBoundingClientRect = () =>
      ({
        top: 100,
        bottom: 200,
        left: 0,
        right: 0,
        width: 100,
        height: 100,
        x: 0,
        y: 100,
        toJSON: () => ({}),
      }) as DOMRect

    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })

    renderWithProviders(<ScrollTopButton />)

    fireEvent.scroll(window)

    const link = screen.getByRole('link', { name: 'Voltar ao topo da página' })
    expect(link).toHaveAttribute('href', '#inicio')
    expect(link).toHaveAttribute('aria-hidden', 'false')

    document.body.removeChild(footer)
  })
})
