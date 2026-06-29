import { NextResponse } from 'next/server'

import { chatStreamRequestSchema } from '@/lib/chatbot/chat-schema'
import { getChatbotApiUrl } from '@/lib/chatbot/config'

export const runtime = 'nodejs'

/**
 * Proxy SSE para o backend RAG no Railway.
 * O browser chama esta rota (mesma origem) para evitar CORS.
 */
export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
  }

  const parsed = chatStreamRequestSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Dados inválidos.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const apiUrl = getChatbotApiUrl()

  let upstream: Response
  try {
    upstream = await fetch(`${apiUrl}/api/rag/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({ input: parsed.data.input }),
    })
  } catch (error) {
    console.error('[api/chat/stream] Upstream fetch failed:', error)
    return NextResponse.json(
      { error: 'Não foi possível conectar ao assistente.' },
      { status: 502 },
    )
  }

  if (!upstream.ok) {
    const status = upstream.status
    if (status === 429) {
      return NextResponse.json(
        { error: 'Muitas requisições. Aguarde um momento.' },
        { status: 429 },
      )
    }

    const errorBody = await upstream.text().catch(() => '')
    console.error('[api/chat/stream] Upstream error:', status, errorBody)
    return NextResponse.json(
      { error: 'O assistente não respondeu no momento.' },
      { status: 502 },
    )
  }

  if (!upstream.body) {
    return NextResponse.json({ error: 'Resposta vazia do assistente.' }, { status: 502 })
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
