import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ContactSection } from '@/components/sections/contact-section'
import { CONTACT_INFO, SOCIAL_LINKS } from '@/constants/site'
import { renderWithProviders } from '@/test/render-with-providers'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode }) => <div {...props}>{children}</div>,
  },
}))

const fetchMock = vi.fn()

describe('ContactSection', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })

  it('renders contact links and whatsapp button', () => {
    renderWithProviders(<ContactSection />)

    expect(screen.getByRole('link', { name: CONTACT_INFO.email })).toHaveAttribute(
      'href',
      `mailto:${CONTACT_INFO.email}`,
    )
    expect(screen.getByRole('link', { name: SOCIAL_LINKS[0].url })).toHaveAttribute(
      'href',
      SOCIAL_LINKS[0].url,
    )
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      CONTACT_INFO.whatsapp,
    )
  })

  it('shows validation errors for invalid form data', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactSection />)

    await user.type(screen.getByLabelText('Nome'), 'A')
    await user.type(screen.getByLabelText('Email'), 'email-invalido')
    await user.type(screen.getByLabelText('Mensagem'), 'curta')
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(await screen.findByText('O nome deve ter pelo menos 2 caracteres')).toBeInTheDocument()
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
    expect(screen.getByText('A mensagem deve ter pelo menos 10 caracteres')).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('submits the form and shows success message', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    })

    const user = userEvent.setup()
    renderWithProviders(<ContactSection />)

    await user.type(screen.getByLabelText('Nome'), 'Matheus Queiroz')
    await user.type(screen.getByLabelText('Email'), 'contato@example.com')
    await user.type(
      screen.getByLabelText('Mensagem'),
      'Gostaria de conversar sobre uma oportunidade fullstack.',
    )
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Matheus Queiroz',
          email: 'contato@example.com',
          message: 'Gostaria de conversar sobre uma oportunidade fullstack.',
        }),
      })
    })

    expect(
      await screen.findByText('Mensagem enviada com sucesso! Entrarei em contato em breve.'),
    ).toBeInTheDocument()
  })

  it('shows error message when submission fails', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Não foi possível enviar a mensagem.' }),
    })

    const user = userEvent.setup()
    renderWithProviders(<ContactSection />)

    await user.type(screen.getByLabelText('Nome'), 'Matheus Queiroz')
    await user.type(screen.getByLabelText('Email'), 'contato@example.com')
    await user.type(
      screen.getByLabelText('Mensagem'),
      'Mensagem válida para simular falha no envio.',
    )
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(await screen.findByText('Erro ao enviar mensagem')).toBeInTheDocument()
    expect(screen.getByText('Não foi possível enviar a mensagem.')).toBeInTheDocument()
  })
})
