'use client'

import { Languages } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLocale } from '@/providers/locale-provider'

export function LanguageToggle() {
  const { locale, toggleLocale, dictionary } = useLocale()
  const ariaLabel =
    locale === 'pt-BR'
      ? dictionary.language.switchToEnglish
      : dictionary.language.switchToPortuguese

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={toggleLocale}
          aria-label={ariaLabel}
          className="text-muted-foreground cursor-pointer transition-all duration-300 hover:scale-110 hover:text-foreground rounded-full p-1"
        >
          <Languages className="w-5 h-5" aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{dictionary.language.label}</TooltipContent>
    </Tooltip>
  )
}
