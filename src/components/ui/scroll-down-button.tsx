'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import { useLocale } from '@/providers/locale-provider'

interface ScrollDownButtonProps {
  href: string
  label?: string
  spacing?: 'default' | 'relaxed'
}

export function ScrollDownButton({ href, label, spacing = 'default' }: ScrollDownButtonProps) {
  const { dictionary } = useLocale()

  const positionClass =
    spacing === 'relaxed'
      ? 'bottom-4 sm:bottom-5'
      : 'bottom-10 sm:bottom-12'

  return (
    <div
      className={`scroll-down-button absolute left-1/2 -translate-x-1/2 pb-[env(safe-area-inset-bottom)] motion-reduce:animate-none ${positionClass}`}
    >
      <Link
        href={href}
        aria-label={label ?? dictionary.common.scrollDown}
        className="group inline-flex items-center justify-center rounded-full p-1"
      >
        <ChevronDown
          className="h-6 w-6 animate-bounce text-muted-foreground transition-colors duration-300 group-hover:text-primary motion-reduce:animate-none"
          aria-hidden="true"
        />
      </Link>
    </div>
  )
}

export default ScrollDownButton
