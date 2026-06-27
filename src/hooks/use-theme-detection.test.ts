import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useThemeDetection } from '@/hooks/use-theme-detection'

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'dark',
  }),
}))

describe('useThemeDetection', () => {
  it('returns dark theme after mount', () => {
    const { result } = renderHook(() => useThemeDetection())

    expect(result.current.isDark).toBe(true)
    expect(result.current.mounted).toBe(true)
  })
})
