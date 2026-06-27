import { en } from '@/i18n/locales/en'
import { ptBR } from '@/i18n/locales/pt-BR'
import { DEFAULT_LOCALE, LOCALES, type Dictionary, type Locale } from '@/i18n/types'

const dictionaries: Record<Locale, Dictionary> = {
  'pt-BR': ptBR,
  en,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export function resolveLocale(value: string | null | undefined): Locale {
  if (value && isLocale(value)) {
    return value
  }

  return DEFAULT_LOCALE
}

export { DEFAULT_LOCALE, LOCALES }
export type { Dictionary, Locale }
