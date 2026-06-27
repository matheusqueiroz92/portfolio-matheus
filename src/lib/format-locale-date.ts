import type { Locale } from '@/i18n'

export function formatLocaleDate(value: string, locale: Locale): string {
  return new Date(value).toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
