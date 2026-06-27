import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LOCALE_STORAGE_KEY } from '@/lib/locale-storage'
import { LocaleProvider, useLocale } from '@/providers/locale-provider'

describe('LocaleProvider', () => {
  it('provides default portuguese dictionary', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })

    expect(result.current.locale).toBe('pt-BR')
    expect(result.current.dictionary.common.backTo).toBe('Voltar para')
  })

  it('toggles locale and persists to storage', async () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })

    await act(async () => {
      result.current.toggleLocale()
    })

    expect(result.current.locale).toBe('en')
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en')
  })

  it('throws when used outside provider', () => {
    expect(() => renderHook(() => useLocale())).toThrow(
      'useLocale must be used within LocaleProvider',
    )
  })
})
