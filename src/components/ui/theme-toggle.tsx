'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLocale } from '@/providers/locale-provider'

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { dictionary } = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (theme === 'system' ? resolvedTheme : theme) ?? 'light'

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
          className="relative w-14 h-7 bg-secondary cursor-pointer rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label={dictionary.theme.toggle}
        >
          <span className="sr-only">{dictionary.theme.toggle}</span>

          <div className="absolute inset-0 rounded-full bg-linear-to-r from-secondary to-muted transition-all duration-300" />

          <div className="absolute inset-0 flex items-center justify-between px-1.5">
            <Sun className="w-3.5 h-3.5 text-primary transition-all duration-300" />
            <Moon className="w-3.5 h-3.5 text-primary transition-all duration-300" />
          </div>

          <div
            className={`absolute top-0.5 w-6 h-6 bg-card rounded-full shadow-lg transition-all duration-300 ease-out ${
              !mounted ? 'left-7' : currentTheme === 'light' ? 'left-0.5' : 'left-7'
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-card to-secondary shadow-inner" />

            <div className="absolute inset-0 flex items-center justify-center">
              {mounted ? (
                currentTheme === 'light' ? (
                  <Sun className="w-3 h-3 text-primary" />
                ) : (
                  <Moon className="w-3 h-3 text-primary" />
                )
              ) : null}
            </div>
          </div>

          <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/20 to-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{dictionary.theme.label}</TooltipContent>
    </Tooltip>
  )
}
