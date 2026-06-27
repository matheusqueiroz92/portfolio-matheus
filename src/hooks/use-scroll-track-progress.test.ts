import { describe, expect, it } from 'vitest'

import {
  computeScrollTrackState,
  PROJECT_BELT_HEADER_OFFSET,
} from '@/hooks/use-scroll-track-progress'

function createTrackElement({
  top,
  height,
}: {
  top: number
  height: number
}): HTMLElement {
  const element = document.createElement('div')

  element.getBoundingClientRect = () =>
    ({
      top,
      left: 0,
      right: 0,
      bottom: top + 100,
      width: 100,
      height: 100,
      x: 0,
      y: top,
      toJSON: () => ({}),
    }) as DOMRect

  Object.defineProperty(element, 'offsetHeight', {
    configurable: true,
    value: height,
  })

  return element
}

describe('computeScrollTrackState', () => {
  it('returns before phase when track is below header offset', () => {
    const track = createTrackElement({ top: PROJECT_BELT_HEADER_OFFSET + 50, height: 2000 })

    expect(computeScrollTrackState(track)).toEqual({ progress: 0, phase: 'before' })
  })

  it('returns pinned phase with partial progress', () => {
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
    const track = createTrackElement({ top: 20, height: 2000 })

    const state = computeScrollTrackState(track)

    expect(state.phase).toBe('pinned')
    expect(state.progress).toBeGreaterThan(0)
    expect(state.progress).toBeLessThan(1)
  })

  it('returns after phase when scroll reaches end of track', () => {
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
    const track = createTrackElement({ top: -2000, height: 2000 })

    expect(computeScrollTrackState(track)).toEqual({ progress: 1, phase: 'after' })
  })

  it('handles null track element', () => {
    expect(computeScrollTrackState(null)).toEqual({ progress: 0, phase: 'before' })
  })
})
