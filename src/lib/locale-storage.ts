import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n'

export const LOCALE_STORAGE_KEY = 'portfolio-locale'
export const LOCALE_COOKIE_KEY = 'portfolio-locale'

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  return stored && isLocale(stored) ? stored : null
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`
}

export function getInitialLocale(): Locale {
  return getStoredLocale() ?? DEFAULT_LOCALE
}

export function getNextLocale(locale: Locale): Locale {
  return locale === 'pt-BR' ? 'en' : 'pt-BR'
}

export function getLocaleHtmlLang(locale: Locale): string {
  return locale === 'pt-BR' ? 'pt-BR' : 'en'
}
