import { describe, expect, it, vi, beforeEach } from 'vitest'

import { getServerLocale } from './server-locale'

const cookiesMock = vi.fn()

vi.mock('next/headers', () => ({
  cookies: () => cookiesMock(),
}))

describe('getServerLocale', () => {
  beforeEach(() => {
    cookiesMock.mockReset()
  })

  it('returns locale from cookie when valid', async () => {
    cookiesMock.mockResolvedValue({
      get: (key: string) => (key === 'portfolio-locale' ? { value: 'en' } : undefined),
    })

    await expect(getServerLocale()).resolves.toBe('en')
  })

  it('falls back to default locale for missing or invalid cookie', async () => {
    cookiesMock.mockResolvedValue({
      get: () => undefined,
    })

    await expect(getServerLocale()).resolves.toBe('pt-BR')
  })
})
