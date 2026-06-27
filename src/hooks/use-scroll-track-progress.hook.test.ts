import { createRef } from 'react'
import { renderHook, act } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const lenisOn = vi.fn()
const lenisOff = vi.fn()

vi.mock('lenis/react', () => ({
  useLenis: () => ({
    on: lenisOn,
    off: lenisOff,
  }),
}))

import { useScrollTrackProgress } from '@/hooks/use-scroll-track-progress'

function createTrackElement(top: number, height: number): HTMLDivElement {
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

describe('useScrollTrackProgress', () => {
  beforeEach(() => {
    lenisOn.mockClear()
    lenisOff.mockClear()
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
  })

  it('measures progress through lenis scroll events', async () => {
    const trackRef = createRef<HTMLDivElement>()
    trackRef.current = createTrackElement(20, 2000)

    const { result } = renderHook(() => useScrollTrackProgress(trackRef))

    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve))
    })

    expect(result.current.phase).toBe('pinned')
    expect(result.current.progress).toBeGreaterThan(0)
    expect(lenisOn).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
