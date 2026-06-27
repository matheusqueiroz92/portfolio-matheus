'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { getDictionary, type Dictionary, type Locale } from '@/i18n'
import {
  getInitialLocale,
  getLocaleHtmlLang,
  getNextLocale,
  setStoredLocale,
} from '@/lib/locale-storage'

interface LocaleContextValue {
  locale: Locale
  dictionary: Dictionary
  mounted: boolean
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function LocaleHtmlSync({ locale, mounted }: { locale: Locale; mounted: boolean }) {
  useEffect(() => {
    if (!mounted) return
    document.documentElement.lang = getLocaleHtmlLang(locale)
  }, [locale, mounted])

  return null
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initialLocale = getInitialLocale()
    setLocaleState(initialLocale)
    setStoredLocale(initialLocale)
    setMounted(true)
  }, [])

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    setStoredLocale(nextLocale)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => {
      const nextLocale = getNextLocale(current)
      setStoredLocale(nextLocale)
      return nextLocale
    })
  }, [])

  const dictionary = useMemo(() => getDictionary(locale), [locale])

  const value = useMemo(
    () => ({
      locale,
      dictionary,
      mounted,
      setLocale,
      toggleLocale,
    }),
    [locale, dictionary, mounted, setLocale, toggleLocale],
  )

  return (
    <LocaleContext.Provider value={value}>
      <LocaleHtmlSync locale={locale} mounted={mounted} />
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
