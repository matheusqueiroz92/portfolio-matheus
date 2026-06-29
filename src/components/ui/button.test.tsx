import { render, screen } from '@testing-library/react'
import Link from 'next/link'
import { describe, expect, it } from 'vitest'

import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders a native button by default', () => {
    render(<Button>Enviar</Button>)

    const button = screen.getByRole('button', { name: 'Enviar' })
    expect(button.tagName).toBe('BUTTON')
    expect(button).toHaveAttribute('data-variant', 'default')
  })

  it('supports variants and asChild', () => {
    render(
      <Button variant="outline" size="sm" asChild>
        <Link href="/projects">Ver projetos</Link>
      </Button>,
    )

    const link = screen.getByRole('link', { name: 'Ver projetos' })
    expect(link).toHaveAttribute('data-variant', 'outline')
    expect(link).toHaveAttribute('data-size', 'sm')
  })
})
