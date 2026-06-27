import { describe, expect, it } from 'vitest'

import { cn } from './utils'

describe('cn', () => {
  it('merge classes with tailwind conflict resolution', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra')
  })

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('')
  })
})
