import { describe, expect, it } from 'vitest'

import { contactFormSchema } from './contact-schema'

describe('contactFormSchema', () => {
  it('accepts valid contact data', () => {
    const result = contactFormSchema.safeParse({
      name: 'Matheus Queiroz',
      email: 'contato@matheusqueiroz.dev.br',
      message: 'Gostaria de conversar sobre uma oportunidade fullstack.',
    })

    expect(result.success).toBe(true)
  })

  it('rejects short names', () => {
    const result = contactFormSchema.safeParse({
      name: 'A',
      email: 'contato@matheusqueiroz.dev.br',
      message: 'Mensagem válida com mais de dez caracteres.',
    })

    expect(result.success).toBe(false)
  })

  it('rejects invalid emails', () => {
    const result = contactFormSchema.safeParse({
      name: 'Matheus Queiroz',
      email: 'email-invalido',
      message: 'Mensagem válida com mais de dez caracteres.',
    })

    expect(result.success).toBe(false)
  })

  it('rejects short messages', () => {
    const result = contactFormSchema.safeParse({
      name: 'Matheus Queiroz',
      email: 'contato@matheusqueiroz.dev.br',
      message: 'curta',
    })

    expect(result.success).toBe(false)
  })
})
