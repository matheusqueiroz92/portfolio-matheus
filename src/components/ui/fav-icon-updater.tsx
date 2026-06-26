'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

function updateIcon(rel: string, href: string) {
  const existing = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (existing) {
    existing.href = href
    return
  }

  const link = document.createElement('link')
  link.rel = rel
  link.href = href
  document.head.appendChild(link)
}

export function FaviconUpdater() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const currentTheme = (theme === 'system' ? resolvedTheme : theme) ?? 'light'
    const isDark = currentTheme === 'dark'
    const icon = isDark ? '/icon-matheus-dev.svg' : '/icon-matheus-dev-2.svg'

    updateIcon('icon', icon)
    updateIcon('shortcut icon', icon)
    updateIcon('apple-touch-icon', icon)
  }, [theme, resolvedTheme])

  return null
}
