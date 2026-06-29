export const CHATBOT_LIMITS = {
  maxQuestionsPerSession: 8,
  maxInputLength: 500,
  storageKey: 'portfolio-chatbot-session',
} as const

export const CHATBOT_DEFAULT_API_URL = 'https://task-agent-ai-production.up.railway.app'

export function getChatbotApiUrl(): string {
  return process.env.CHATBOT_API_URL ?? CHATBOT_DEFAULT_API_URL
}
