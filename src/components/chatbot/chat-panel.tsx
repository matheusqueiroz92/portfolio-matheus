'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, X } from 'lucide-react'

import type { ChatMessage, ChatPhase } from '@/hooks/use-chatbot'
import type { Dictionary } from '@/i18n/types'

import { ChatInput } from './chat-input'
import { ChatMessages } from './chat-messages'
import { ChatSuggestions } from './chat-suggestions'

interface ChatPanelProps {
  isOpen: boolean
  messages: ChatMessage[]
  phase: ChatPhase
  isLoading: boolean
  limitReached: boolean
  copy: Dictionary['chatbot']
  onClose: () => void
  onSend: (message: string) => void
}

export function ChatPanel({
  isOpen,
  messages,
  phase,
  isLoading,
  limitReached,
  copy,
  onClose,
  onSend,
}: ChatPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const showSuggestions = messages.length === 0 && !isLoading && !limitReached

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          data-lenis-prevent
          className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-xl backdrop-blur-xl sm:right-6 sm:bottom-24"
          style={{ maxHeight: 'min(32rem, 70dvh)' }}
          role="dialog"
          aria-modal="true"
          aria-label={copy.title}
        >
          <header className="flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">{copy.title}</h2>
                <p className="text-xs text-muted-foreground">{copy.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.close}
              className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          <ChatMessages
            messages={messages}
            phase={phase}
            welcome={copy.welcome}
            copy={copy}
          />

          {showSuggestions ? (
            <ChatSuggestions
              suggestions={copy.suggestions}
              disabled={isLoading}
              onSelect={onSend}
            />
          ) : null}

          <footer className="mt-auto">
            <ChatInput
              copy={copy}
              isLoading={isLoading}
              limitReached={limitReached}
              disabled={isLoading}
              onSend={onSend}
            />
          </footer>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
