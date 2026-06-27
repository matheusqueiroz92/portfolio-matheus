import { describe, expect, it } from 'vitest'

import { createContactFormSchema } from './contact-schema'

describe('contactFormSchema', () => {
  it('accepts valid contact data', () => {
    const result = createContactFormSchema('pt-BR').safeParse({
      name: 'Matheus Queiroz',
      email: 'contato@matheusqueiroz.dev.br',
      message: 'Gostaria de conversar sobre uma oportunidade fullstack.',
    })

    expect(result.success).toBe(true)
  })

  it('rejects short names', () => {
    const result = createContactFormSchema('pt-BR').safeParse({
      name: 'A',
      email: 'contato@matheusqueiroz.dev.br',
      message: 'Mensagem válida com mais de dez caracteres.',
    })

    expect(result.success).toBe(false)
  })

  it('rejects invalid emails', () => {
    const result = createContactFormSchema('pt-BR').safeParse({
      name: 'Matheus Queiroz',
      email: 'email-invalido',
      message: 'Mensagem válida com mais de dez caracteres.',
    })

    expect(result.success).toBe(false)
  })

  it('rejects short messages', () => {
    const result = createContactFormSchema('pt-BR').safeParse({
      name: 'Matheus Queiroz',
      email: 'contato@matheusqueiroz.dev.br',
      message: 'curta',
    })

    expect(result.success).toBe(false)
  })

  it('returns localized validation messages in english', () => {
    const result = createContactFormSchema('en').safeParse({
      name: 'A',
      email: 'invalid-email',
      message: 'short',
    })

    expect(result.success).toBe(false)

    if (result.success) return

    const messages = result.error.issues.map((issue) => issue.message)
    expect(messages).toContain('Name must be at least 2 characters')
    expect(messages).toContain('Invalid email')
    expect(messages).toContain('Message must be at least 10 characters')
  })
})
