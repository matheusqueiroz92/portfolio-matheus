import { beforeEach, describe, expect, it } from 'vitest'

import { CHATBOT_LIMITS } from '@/lib/chatbot/config'
import {
  getQuestionCount,
  getRemainingQuestions,
  hasReachedLimit,
  incrementQuestionCount,
} from '@/lib/chatbot/question-limit'

describe('question limit', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('starts with zero questions used', () => {
    expect(getQuestionCount()).toBe(0)
    expect(getRemainingQuestions()).toBe(CHATBOT_LIMITS.maxQuestionsPerSession)
    expect(hasReachedLimit()).toBe(false)
  })

  it('increments and tracks remaining questions', () => {
    incrementQuestionCount()
    incrementQuestionCount()

    expect(getQuestionCount()).toBe(2)
    expect(getRemainingQuestions()).toBe(CHATBOT_LIMITS.maxQuestionsPerSession - 2)
    expect(hasReachedLimit()).toBe(false)
  })

  it('detects when the session limit is reached', () => {
    for (let i = 0; i < CHATBOT_LIMITS.maxQuestionsPerSession; i++) {
      incrementQuestionCount()
    }

    expect(getQuestionCount()).toBe(CHATBOT_LIMITS.maxQuestionsPerSession)
    expect(getRemainingQuestions()).toBe(0)
    expect(hasReachedLimit()).toBe(true)
  })

  it('ignores invalid stored values', () => {
    window.sessionStorage.setItem(CHATBOT_LIMITS.storageKey, '{"count":-1}')
    expect(getQuestionCount()).toBe(0)
  })
})
