import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('form controls', () => {
  it('renders input field', () => {
    render(<Input placeholder="Seu nome" aria-label="Nome" />)

    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveAttribute('data-slot', 'input')
  })

  it('renders textarea field', () => {
    render(<Textarea placeholder="Mensagem" aria-label="Mensagem" />)

    expect(screen.getByRole('textbox', { name: 'Mensagem' })).toHaveAttribute('data-slot', 'textarea')
  })
})
