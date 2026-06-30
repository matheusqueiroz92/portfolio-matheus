'use client'

import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_INFO } from '@/constants/site'
import { CHATBOT_LIMITS } from '@/lib/chatbot/config'
import type { Dictionary } from '@/i18n/types'

interface ChatInputProps {
  copy: Dictionary['chatbot']
  disabled?: boolean
  isLoading?: boolean
  limitReached?: boolean
  onSend: (message: string) => void
}

export function ChatInput({
  copy,
  disabled,
  isLoading,
  limitReached,
  onSend,
}: ChatInputProps) {
  const [value, setValue] = useState('')

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled || isLoading || limitReached) return
    onSend(trimmed)
    setValue('')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    submit()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  if (limitReached) {
    return (
      <div className="border-t border-border/60 px-4 py-3">
        <p className="text-sm leading-relaxed text-muted-foreground">{copy.limitReached}</p>
        <p className="mt-2 text-sm leading-relaxed">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-primary underline decoration-primary/30 underline-offset-[3px] hover:decoration-primary"
          >
            {CONTACT_INFO.email}
          </a>
          <span className="text-muted-foreground"> · </span>
          <a
            href="tel:+5577988334370"
            className="text-primary underline decoration-primary/30 underline-offset-[3px] hover:decoration-primary"
          >
            {CONTACT_INFO.phone}
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border/60 px-3 py-3">
      <div className="flex items-end gap-2">
        <Textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={copy.placeholder}
          disabled={disabled || isLoading}
          maxLength={CHATBOT_LIMITS.maxInputLength}
          rows={1}
          aria-label={copy.placeholder}
          className="min-h-10 max-h-28 resize-none border-border/60 bg-background/60 backdrop-blur-sm"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || isLoading || !value.trim()}
          aria-label={copy.send}
          className="shrink-0 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    </form>
  )
}
