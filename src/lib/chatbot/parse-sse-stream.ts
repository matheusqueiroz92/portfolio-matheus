export type ChatStreamPhase = 'searching' | 'generating'

export interface ParseSseStreamCallbacks {
  onStatus?: (phase: ChatStreamPhase) => void
  onToken?: (token: string, accumulated: string) => void
  onDone?: (resposta: string) => void
  onError?: (error: string) => void
}

export async function parseSseStream(
  body: ReadableStream<Uint8Array> | null,
  callbacks: ParseSseStreamCallbacks = {},
): Promise<string> {
  if (!body) {
    throw new Error('Stream body is empty')
  }

  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let resposta = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const chunks = buffer.split('\n\n')
    buffer = chunks.pop() ?? ''

    for (const chunk of chunks) {
      if (!chunk.trim() || chunk.startsWith(':')) continue

      let event = 'message'
      let data = ''

      for (const line of chunk.split('\n')) {
        if (line.startsWith('event: ')) event = line.slice(7)
        if (line.startsWith('data: ')) data = line.slice(6)
      }

      if (!data) continue

      const payload = JSON.parse(data) as Record<string, unknown>

      if (event === 'status' && typeof payload.phase === 'string') {
        if (payload.phase === 'searching' || payload.phase === 'generating') {
          callbacks.onStatus?.(payload.phase)
        }
      }

      if (event === 'token' && typeof payload.text === 'string') {
        resposta += payload.text
        callbacks.onToken?.(payload.text, resposta)
      }

      if (event === 'done' && typeof payload.resposta === 'string') {
        resposta = payload.resposta
        callbacks.onDone?.(resposta)
      }

      if (event === 'error') {
        const message = typeof payload.error === 'string' ? payload.error : 'Stream error'
        callbacks.onError?.(message)
        throw new Error(message)
      }
    }
  }

  return resposta
}
