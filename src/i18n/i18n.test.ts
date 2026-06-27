import { describe, expect, it } from 'vitest'

import { getDictionary, isLocale, resolveLocale } from '@/i18n'
import { en } from '@/i18n/locales/en'
import { ptBR } from '@/i18n/locales/pt-BR'

function collectKeys(value: unknown, prefix = ''): string[] {
  if (typeof value === 'function') {
    return [prefix]
  }

  if (Array.isArray(value)) {
    return [prefix]
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, nestedValue]) =>
      collectKeys(nestedValue, prefix ? `${prefix}.${key}` : key),
    )
  }

  return [prefix]
}

describe('i18n dictionaries', () => {
  it('returns portuguese dictionary by default', () => {
    expect(getDictionary('pt-BR')).toEqual(ptBR)
  })

  it('returns english dictionary', () => {
    expect(getDictionary('en')).toEqual(en)
  })

  it('keeps the same translation keys in both locales', () => {
    const ptKeys = collectKeys(ptBR).sort()
    const enKeys = collectKeys(en).sort()

    expect(enKeys).toEqual(ptKeys)
  })

  it('validates supported locales', () => {
    expect(isLocale('pt-BR')).toBe(true)
    expect(isLocale('en')).toBe(true)
    expect(isLocale('es')).toBe(false)
  })

  it('falls back to default locale for invalid values', () => {
    expect(resolveLocale('invalid')).toBe('pt-BR')
    expect(resolveLocale('en')).toBe('en')
  })
})

describe('localized copy helpers', () => {
  it('builds footer copyright for both locales', () => {
    expect(getDictionary('pt-BR').footer.copyright(2026)).toContain('Todos os direitos reservados')
    expect(getDictionary('en').footer.copyright(2026)).toContain('All rights reserved')
  })

  it('provides localized project aria labels', () => {
    expect(getDictionary('pt-BR').projects.viewCaseAria('ERP')).toBe('Ver case: ERP')
    expect(getDictionary('en').projects.viewCaseAria('ERP')).toBe('View case study: ERP')
  })
})
