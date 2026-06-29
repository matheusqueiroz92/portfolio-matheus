/**
 * Requisição same-origin para o proxy Next.js — evita CORS com o backend Railway.
 */
export async function requestChatStream(
  input: string,
  signal?: AbortSignal,
): Promise<Response> {
  return fetch('/api/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
    signal,
  })
}
