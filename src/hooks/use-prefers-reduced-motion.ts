'use client'

import { useMemo, useSyncExternalStore } from 'react'

/**
 * Retorna `true` quando o usuário prefere movimento reduzido.
 * Hidrata com `false` no servidor; corrige no cliente via subscribe.
 */
export function usePrefersReducedMotion(): boolean {
  const subscribe = useMemo(() => {
    return (callback: () => void) => {
      if (typeof window === 'undefined') return () => {}
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    }
  }, [])

  const getSnapshot = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
