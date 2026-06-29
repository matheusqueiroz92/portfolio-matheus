import { beforeEach, describe, expect, it, vi } from 'vitest'

import { POST } from './route'

const fetchMock = vi.fn()

function createRequest(body: unknown): Request {
  return new Request('http://localhost/api/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/chat/stream', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
    vi.stubEnv('CHATBOT_API_URL', 'https://chatbot.example.com')
  })

  it('returns 400 for malformed json payload', async () => {
    const request = new Request('http://localhost/api/chat/stream', {
      method: 'POST',
      body: 'not-json',
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: 'Payload inválido.' })
  })

  it('returns 400 for empty input', async () => {
    const response = await POST(createRequest({ input: '   ' }))
    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toBe('Dados inválidos.')
  })

  it('proxies successful SSE responses', async () => {
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('event: token\ndata: {"text":"Oi"}\n\n'))
        controller.close()
      },
    })

    fetchMock.mockResolvedValue(
      new Response(stream, {
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
      }),
    )

    const response = await POST(createRequest({ input: 'Olá' }))

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toContain('text/event-stream')
    expect(fetchMock).toHaveBeenCalledWith('https://chatbot.example.com/api/rag/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({ input: 'Olá' }),
    })
  })

  it('returns 429 when upstream is rate limited', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 429 }))

    const response = await POST(createRequest({ input: 'Pergunta' }))
    expect(response.status).toBe(429)
  })

  it('returns 502 when upstream fails', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }))

    const response = await POST(createRequest({ input: 'Pergunta' }))
    expect(response.status).toBe(502)
  })
})
