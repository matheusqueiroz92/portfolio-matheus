'use client'

import { useEffect } from 'react'

import { useLocale } from '@/providers/locale-provider'

interface LocalizedMetadataProps {
  title: string
  description?: string
}

function setMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`
  let meta = document.querySelector(selector)

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, key)
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', content)
}

export function LocalizedMetadata({ title, description }: LocalizedMetadataProps) {
  const { mounted } = useLocale()

  useEffect(() => {
    if (!mounted) return

    document.title = title

    if (description) {
      setMetaTag('name', 'description', description)
      setMetaTag('property', 'og:title', title)
      setMetaTag('property', 'og:description', description)
      setMetaTag('name', 'twitter:title', title)
      setMetaTag('name', 'twitter:description', description)
    }
  }, [title, description, mounted])

  return null
}
