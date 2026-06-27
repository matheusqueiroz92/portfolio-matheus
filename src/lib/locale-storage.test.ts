import { beforeEach, describe, expect, it } from 'vitest'

import {
  LOCALE_COOKIE_KEY,
  LOCALE_STORAGE_KEY,
  getInitialLocale,
  getLocaleHtmlLang,
  getNextLocale,
  getStoredLocale,
  setStoredLocale,
} from '@/lib/locale-storage'

describe('locale storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns null when nothing is stored', () => {
    expect(getStoredLocale()).toBeNull()
  })

  it('persists and reads the selected locale', () => {
    setStoredLocale('en')
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en')
    expect(document.cookie).toContain(`${LOCALE_COOKIE_KEY}=en`)
    expect(getStoredLocale()).toBe('en')
  })

  it('ignores invalid stored values', () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'fr')
    expect(getStoredLocale()).toBeNull()
    expect(getInitialLocale()).toBe('pt-BR')
  })

  it('toggles between supported locales', () => {
    expect(getNextLocale('pt-BR')).toBe('en')
    expect(getNextLocale('en')).toBe('pt-BR')
  })

  it('maps locale to html lang attribute', () => {
    expect(getLocaleHtmlLang('pt-BR')).toBe('pt-BR')
    expect(getLocaleHtmlLang('en')).toBe('en')
  })
})
