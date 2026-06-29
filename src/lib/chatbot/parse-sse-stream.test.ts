import { describe, expect, it, vi } from 'vitest'

import { parseSseStream } from '@/lib/chatbot/parse-sse-stream'

function encodeSse(events: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  const payload = events.join('\n\n') + '\n\n'

  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(payload))
      controller.close()
    },
  })
}

describe('parseSseStream', () => {
  it('parses status, token and done events', async () => {
    const onStatus = vi.fn()
    const onToken = vi.fn()
    const onDone = vi.fn()

    const stream = encodeSse([
      'event: status\ndata: {"phase":"searching"}',
      'event: status\ndata: {"phase":"generating"}',
      'event: token\ndata: {"text":"Olá"}',
      'event: token\ndata: {"text":" mundo"}',
      'event: done\ndata: {"resposta":"Olá mundo"}',
    ])

    const result = await parseSseStream(stream, { onStatus, onToken, onDone })

    expect(result).toBe('Olá mundo')
    expect(onStatus).toHaveBeenCalledWith('searching')
    expect(onStatus).toHaveBeenCalledWith('generating')
    expect(onToken).toHaveBeenNthCalledWith(1, 'Olá', 'Olá')
    expect(onToken).toHaveBeenNthCalledWith(2, ' mundo', 'Olá mundo')
    expect(onDone).toHaveBeenCalledWith('Olá mundo')
  })

  it('throws on error events', async () => {
    const onError = vi.fn()
    const stream = encodeSse(['event: error\ndata: {"error":"Falha no agente"}'])

    await expect(parseSseStream(stream, { onError })).rejects.toThrow('Falha no agente')
    expect(onError).toHaveBeenCalledWith('Falha no agente')
  })

  it('throws when body is null', async () => {
    await expect(parseSseStream(null)).rejects.toThrow('Stream body is empty')
  })
})
