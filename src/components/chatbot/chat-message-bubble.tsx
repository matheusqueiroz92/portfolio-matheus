import { cn } from '@/lib/utils'

import type { ChatMessage } from '@/hooks/use-chatbot'

interface ChatMessageBubbleProps {
  message: ChatMessage
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user'
  const isStreaming = message.status === 'streaming'

  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm transition-colors duration-200',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted/80 text-foreground border border-border/50 rounded-bl-md backdrop-blur-sm',
          message.status === 'error' && 'border-destructive/40 text-destructive',
        )}
      >
        <p className="whitespace-pre-wrap break-words">
          {message.content}
          {isStreaming && message.content.trim() && (
            <span
              className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current align-middle"
              aria-hidden="true"
            />
          )}
        </p>
      </div>
    </div>
  )
}
