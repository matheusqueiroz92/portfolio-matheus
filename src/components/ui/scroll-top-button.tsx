'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

import { useLocale } from '@/providers/locale-provider'

export function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const { dictionary } = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer')
      if (!footer) return

      const footerRect = footer.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const isFooterVisible = footerRect.top < windowHeight && footerRect.bottom > 0

      setIsVisible(isFooterVisible)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <Link
      href="#inicio"
      aria-label={dictionary.common.scrollTop}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-8 left-8 z-40 bg-primary text-primary-foreground p-4 rounded-full shadow-2xl hover:bg-primary/90 transition-all duration-500 hover:scale-110 active:scale-95 group ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={28} aria-hidden="true" />
    </Link>
  )
}

export default ScrollTopButton
