import { CHATBOT_LIMITS } from '@/lib/chatbot/config'

interface SessionData {
  count: number
}

function readSessionData(): SessionData {
  if (typeof window === 'undefined') {
    return { count: 0 }
  }

  try {
    const raw = window.sessionStorage.getItem(CHATBOT_LIMITS.storageKey)
    if (!raw) return { count: 0 }

    const parsed = JSON.parse(raw) as Partial<SessionData>
    const count = typeof parsed.count === 'number' && parsed.count >= 0 ? parsed.count : 0
    return { count }
  } catch {
    return { count: 0 }
  }
}

function writeSessionData(data: SessionData): void {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(CHATBOT_LIMITS.storageKey, JSON.stringify(data))
}

export function getQuestionCount(): number {
  return readSessionData().count
}

export function getRemainingQuestions(): number {
  return Math.max(0, CHATBOT_LIMITS.maxQuestionsPerSession - getQuestionCount())
}

export function hasReachedLimit(): boolean {
  return getQuestionCount() >= CHATBOT_LIMITS.maxQuestionsPerSession
}

export function incrementQuestionCount(): void {
  const data = readSessionData()
  writeSessionData({ count: data.count + 1 })
}
