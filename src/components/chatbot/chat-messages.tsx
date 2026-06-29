'use client'

import { useEffect, useRef } from 'react'

import type { ChatMessage, ChatPhase } from '@/hooks/use-chatbot'
import type { Dictionary } from '@/i18n/types'

import { ChatMessageBubble } from './chat-message-bubble'

interface ChatMessagesProps {
  messages: ChatMessage[]
  phase: ChatPhase
  welcome: string
  copy: Dictionary['chatbot']
}

export function ChatMessages({ messages, phase, welcome, copy }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, phase])

  const statusLabel =
    phase === 'searching' ? copy.searching : phase === 'generating' ? copy.generating : null

  return (
    <div
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-3"
    >
      {messages.length === 0 ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{welcome}</p>
      ) : (
        messages.map((message) => <ChatMessageBubble key={message.id} message={message} />)
      )}

      {statusLabel ? (
        <p className="text-xs text-muted-foreground animate-pulse" aria-live="polite">
          {statusLabel}
        </p>
      ) : null}

      <div ref={endRef} />
    </div>
  )
}
