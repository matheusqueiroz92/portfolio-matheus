import { getPersonJsonLd } from '@/lib/metadata'

export function JsonLd() {
  const data = getPersonJsonLd()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
