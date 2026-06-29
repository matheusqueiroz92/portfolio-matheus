import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FloatingChatbot } from '@/components/chatbot/floating-chatbot'
import { renderWithProviders } from '@/test/render-with-providers'

vi.mock('@/hooks/use-chatbot', () => ({
  useChatbot: () => ({
    isOpen: false,
    messages: [],
    phase: 'idle',
    isLoading: false,
    remainingQuestions: 8,
    limitReached: false,
    toggleOpen: vi.fn(),
    close: vi.fn(),
    sendMessage: vi.fn(),
  }),
}))

describe('FloatingChatbot', () => {
  it('renders the floating action button with localized label', () => {
    renderWithProviders(<FloatingChatbot />)

    expect(
      screen.getByRole('button', { name: 'Abrir assistente virtual' }),
    ).toBeInTheDocument()
  })
})
