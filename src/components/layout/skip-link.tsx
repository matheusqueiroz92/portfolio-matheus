'use client'

import { useLocale } from '@/providers/locale-provider'

export function SkipLink() {
  const { dictionary } = useLocale()

  return (
    <a href="#conteudo-principal" className="skip-link">
      {dictionary.common.skipToContent}
    </a>
  )
}
