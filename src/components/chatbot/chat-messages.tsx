'use client'

import { useEffect, useRef } from 'react'

import type { ChatMessage, ChatPhase } from '@/hooks/use-chatbot'
import type { Dictionary } from '@/i18n/types'

import { ChatMessageBubble } from './chat-message-bubble'
import { ChatTypingIndicator } from './chat-typing-indicator'

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

  const lastAssistant = [...messages].reverse().find((message) => message.role === 'assistant')
  const showTypingIndicator =
    (phase === 'searching' || phase === 'generating') && !lastAssistant?.content.trim()
  const typingLabel = phase === 'searching' ? copy.searching : copy.generating

  return (
    <div
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
      data-lenis-prevent
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-y-contain px-4 py-3"
    >
      {messages.length === 0 ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{welcome}</p>
      ) : (
        messages
          .filter(
            (message) =>
              !(message.role === 'assistant' && message.status === 'streaming' && !message.content.trim()),
          )
          .map((message) => <ChatMessageBubble key={message.id} message={message} />)
      )}

      {showTypingIndicator ? <ChatTypingIndicator label={typingLabel} /> : null}

      <div ref={endRef} />
    </div>
  )
}
