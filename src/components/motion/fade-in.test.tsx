import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FadeIn } from '@/components/motion/fade-in'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  },
}))

describe('FadeIn', () => {
  it('renders children with motion props', () => {
    render(
      <FadeIn immediate direction="left" distance={12}>
        Conteúdo animado
      </FadeIn>,
    )

    expect(screen.getByText('Conteúdo animado')).toBeInTheDocument()
  })
})
