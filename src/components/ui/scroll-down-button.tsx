'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import { useLocale } from '@/providers/locale-provider'

interface ScrollDownButtonProps {
  href: string
  label?: string
}

export function ScrollDownButton({ href, label }: ScrollDownButtonProps) {
  const { dictionary } = useLocale()

  return (
    <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 pb-[env(safe-area-inset-bottom)] animate-bounce motion-reduce:animate-none">
      <Link
        href={href}
        aria-label={label ?? dictionary.common.scrollDown}
        className="group inline-flex items-center justify-center rounded-full p-1"
      >
        <ChevronDown
          className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-300"
          aria-hidden="true"
        />
      </Link>
    </div>
  )
}

export default ScrollDownButton
