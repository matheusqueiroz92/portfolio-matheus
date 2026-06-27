'use client'

import { useLenis } from 'lenis/react'
import { useCallback, useEffect, useState, type RefObject } from 'react'

export const PROJECT_BELT_HEADER_OFFSET = 80

export type ScrollTrackPhase = 'before' | 'pinned' | 'after'

interface ScrollTrackState {
  progress: number
  phase: ScrollTrackPhase
}

export function computeScrollTrackState(trackEl: HTMLElement | null): ScrollTrackState {
  if (!trackEl || typeof window === 'undefined') {
    return { progress: 0, phase: 'before' }
  }

  const rect = trackEl.getBoundingClientRect()
  const pinHeight = Math.max(window.innerHeight - PROJECT_BELT_HEADER_OFFSET, 320)
  const scrollable = Math.max(1, trackEl.offsetHeight - pinHeight)
  const scrolled = PROJECT_BELT_HEADER_OFFSET - rect.top
  const progress = Math.min(1, Math.max(0, scrolled / scrollable))

  if (scrolled <= 0) return { progress: 0, phase: 'before' }
  if (scrolled >= scrollable) return { progress: 1, phase: 'after' }
  return { progress, phase: 'pinned' }
}

/**
 * Mede progresso (0→1) dentro de um trilho alto de scroll.
 * Dimensões do trilho vêm de CSS (vh) — este hook só roda no cliente
 * para evitar hydration mismatch.
 */
export function useScrollTrackProgress(
  trackRef: RefObject<HTMLElement | null>,
): ScrollTrackState {
  const lenis = useLenis()
  const [state, setState] = useState<ScrollTrackState>({
    progress: 0,
    phase: 'before',
  })

  const measure = useCallback(() => {
    setState(computeScrollTrackState(trackRef.current))
  }, [trackRef])

  useEffect(() => {
    let raf = 0

    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }

    schedule()

    window.addEventListener('resize', schedule, { passive: true })

    if (lenis) {
      lenis.on('scroll', schedule)
      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', schedule)
        lenis.off('scroll', schedule)
      }
    }

    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule)
    }
  }, [lenis, measure])

  return state
}
