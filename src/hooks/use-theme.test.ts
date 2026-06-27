import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { useTheme } from '@/hooks/use-theme'

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('loads saved theme from localStorage', () => {
    window.localStorage.setItem('theme', 'dark')

    const { result } = renderHook(() => useTheme())

    act(() => {})

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles theme and persists preference', () => {
    window.localStorage.setItem('theme', 'light')

    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
