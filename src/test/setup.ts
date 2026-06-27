import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { createElement, type ReactNode } from 'react'
import { afterEach, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/projects',
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: ReactNode
    [key: string]: unknown
  }) => createElement('a', { href, ...props }, children),
}))

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  document.cookie = ''
  vi.clearAllMocks()
})
