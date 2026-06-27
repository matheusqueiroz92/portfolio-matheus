import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

describe('usePrefersReducedMotion', () => {
  it('returns false by default', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('reduce') ? false : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when user prefers reduced motion', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('reduce'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })
})
