'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import type { Dictionary } from '@/i18n/types'
import { parseSseStream, type ChatStreamPhase } from '@/lib/chatbot/parse-sse-stream'
import { requestChatStream } from '@/lib/chatbot/request-chat-stream'
import {
  getRemainingQuestions,
  hasReachedLimit,
  incrementQuestionCount,
} from '@/lib/chatbot/question-limit'

export type ChatMessageStatus = 'streaming' | 'done' | 'error'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  status?: ChatMessageStatus
}

export type ChatPhase = 'idle' | ChatStreamPhase

function createMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

interface UseChatbotOptions {
  copy: Dictionary['chatbot']
}

export function useChatbot({ copy }: UseChatbotOptions) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [phase, setPhase] = useState<ChatPhase>('idle')
  const [isLoading, setIsLoading] = useState(false)
  const [remainingQuestions, setRemainingQuestions] = useState(() => getRemainingQuestions())
  const abortRef = useRef<AbortController | null>(null)

  const refreshRemaining = useCallback(() => {
    setRemainingQuestions(getRemainingQuestions())
  }, [])

  useEffect(() => {
    refreshRemaining()
  }, [refreshRemaining])

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const sendMessage = useCallback(
    async (input: string) => {
      const trimmed = input.trim()
      if (!trimmed || isLoading) return

      if (hasReachedLimit()) {
        return
      }

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: 'user',
        content: trimmed,
        status: 'done',
      }

      const assistantId = createMessageId()
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        status: 'streaming',
      }

      setMessages((prev) => [...prev, userMessage, assistantMessage])
      setIsLoading(true)
      setPhase('idle')

      try {
        const response = await requestChatStream(trimmed, controller.signal)

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { error?: string } | null
          const errorMessage =
            response.status === 429
              ? copy.rateLimited
              : (payload?.error ?? copy.genericError)

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: errorMessage, status: 'error' }
                : msg,
            ),
          )
          return
        }

        incrementQuestionCount()
        refreshRemaining()

        await parseSseStream(response.body, {
          onStatus: (nextPhase) => setPhase(nextPhase),
          onToken: (_token, accumulated) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantId ? { ...msg, content: accumulated, status: 'streaming' } : msg,
              ),
            )
          },
          onDone: (resposta) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantId ? { ...msg, content: resposta, status: 'done' } : msg,
              ),
            )
          },
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: copy.genericError, status: 'error' }
              : msg,
          ),
        )
      } finally {
        setIsLoading(false)
        setPhase('idle')
        abortRef.current = null
      }
    },
    [copy.genericError, copy.rateLimited, isLoading, refreshRemaining],
  )

  return {
    isOpen,
    messages,
    phase,
    isLoading,
    remainingQuestions,
    limitReached: remainingQuestions <= 0,
    toggleOpen,
    close,
    sendMessage,
  }
}
