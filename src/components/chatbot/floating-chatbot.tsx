'use client'

import { BotMessageSquare, MessageCircle, X } from 'lucide-react'
import { motion } from 'framer-motion'

import { useChatbot } from '@/hooks/use-chatbot'
import { useLocale } from '@/providers/locale-provider'

import { ChatPanel } from './chat-panel'

export function FloatingChatbot() {
  const { dictionary } = useLocale()
  const copy = dictionary.chatbot

  const {
    isOpen,
    messages,
    phase,
    isLoading,
    limitReached,
    toggleOpen,
    close,
    sendMessage,
  } = useChatbot({ copy })

  return (
    <>
      <ChatPanel
        isOpen={isOpen}
        messages={messages}
        phase={phase}
        isLoading={isLoading}
        limitReached={limitReached}
        copy={copy}
        onClose={close}
        onSend={sendMessage}
      />

      <motion.button
        type="button"
        onClick={toggleOpen}
        aria-label={isOpen ? copy.close : copy.open}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-4 z-50 flex size-14 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-6"
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <BotMessageSquare className="size-6" aria-hidden="true" />
        )}
      </motion.button>
    </>
  )
}
