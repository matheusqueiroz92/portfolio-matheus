import { describe, expect, it } from 'vitest'

import { formatLocaleDate } from '@/lib/format-locale-date'

describe('formatLocaleDate', () => {
  it('formats dates in portuguese', () => {
    const formatted = formatLocaleDate('2026-03-15', 'pt-BR')
    expect(formatted).toContain('2026')
    expect(formatted.toLowerCase()).toMatch(/março|marco/)
  })

  it('formats dates in english', () => {
    const formatted = formatLocaleDate('2026-03-15', 'en')
    expect(formatted).toContain('2026')
    expect(formatted.toLowerCase()).toContain('march')
  })
})
