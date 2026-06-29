'use client'

import { useMemo, useSyncExternalStore } from 'react'

/**
 * Observa uma media query no cliente. No servidor retorna `defaultValue`
 * (false por padrão) para evitar hydration mismatch.
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const subscribe = useMemo(() => {
    return (callback: () => void) => {
      if (typeof window === 'undefined') return () => {}
      const mq = window.matchMedia(query)
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    }
  }, [query])

  const getSnapshot = () => {
    if (typeof window === 'undefined') return defaultValue
    return window.matchMedia(query).matches
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => defaultValue)
}

/** Viewports abaixo de 1024px — tablet portrait e celular. */
export function useCompactViewport(): boolean {
  return useMediaQuery('(max-width: 1023px)')
}
