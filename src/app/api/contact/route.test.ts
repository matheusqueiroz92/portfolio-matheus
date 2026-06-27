import { beforeEach, describe, expect, it, vi } from 'vitest'

const sendMock = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}))

import { POST } from './route'

function createRequest(body: unknown): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendMock.mockReset()
    vi.stubEnv('RESEND_API_KEY', 're_test_key')
    vi.stubEnv('RESEND_FROM_EMAIL', 'from@example.com')
    vi.stubEnv('RESEND_TO_EMAIL', 'to@example.com')
  })

  it('returns 400 for malformed json payload', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: 'not-json',
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: 'Payload inválido.' })
  })

  it('returns 400 for invalid form data', async () => {
    const response = await POST(
      createRequest({ name: 'A', email: 'invalid', message: 'curta' }),
    )

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toBe('Dados inválidos.')
    expect(body.issues).toBeDefined()
  })

  it('returns 500 when resend env vars are missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '')

    const response = await POST(
      createRequest({
        name: 'Matheus Queiroz',
        email: 'matheus@example.com',
        message: 'Mensagem válida para teste.',
      }),
    )

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: 'Serviço de e-mail não configurado.' })
  })

  it('returns 502 when resend fails to send', async () => {
    sendMock.mockResolvedValue({ error: { message: 'failed' } })

    const response = await POST(
      createRequest({
        name: 'Matheus Queiroz',
        email: 'matheus@example.com',
        message: 'Mensagem válida para teste.',
      }),
    )

    expect(response.status).toBe(502)
    expect(sendMock).toHaveBeenCalledOnce()
  })

  it('returns 200 and escapes html in email body on success', async () => {
    sendMock.mockResolvedValue({ error: null })

    const response = await POST(
      createRequest({
        name: '<script>alert(1)</script>',
        email: 'matheus@example.com',
        message: 'Linha 1\n<script>hack</script>',
      }),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })

    const payload = sendMock.mock.calls[0][0]
    expect(payload.html).toContain('&lt;script&gt;')
    expect(payload.html).toContain('<br />')
    expect(payload.replyTo).toBe('matheus@example.com')
  })
})
