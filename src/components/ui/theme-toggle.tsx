'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (theme === 'system' ? resolvedTheme : theme) ?? 'light'

  return (
    <button
      onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
      className="relative w-14 h-7 bg-secondary rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Alternar tema"
    >
      <span className="sr-only">Alternar tema</span>

      {/* Track background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-muted transition-all duration-300" />

      {/* Icons on track */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className="w-3.5 h-3.5 text-primary transition-all duration-300" />
        <Moon className="w-3.5 h-3.5 text-primary transition-all duration-300" />
      </div>

      {/* Sliding handle */}
      <div
        className={`absolute top-0.5 w-6 h-6 bg-card rounded-full shadow-lg transition-all duration-300 ease-out ${
          !mounted ? 'left-7' : currentTheme === 'light' ? 'left-0.5' : 'left-7'
        }`}
      >
        {/* Handle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-card to-secondary shadow-inner" />

        {/* Handle icon */}
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

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  )
}
