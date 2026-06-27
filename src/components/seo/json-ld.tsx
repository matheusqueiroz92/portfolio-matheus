'use client'

import { useMemo } from 'react'

import { getPersonJsonLd } from '@/lib/metadata'
import { useLocale } from '@/providers/locale-provider'

export function JsonLd() {
  const { locale, mounted } = useLocale()
  const data = useMemo(() => getPersonJsonLd(mounted ? locale : 'pt-BR'), [locale, mounted])

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
