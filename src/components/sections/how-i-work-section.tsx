'use client'

import { Search, Layers, RefreshCw, Rocket } from 'lucide-react'
import { ScrollDownButton } from '../ui/scroll-down-button'
import { SectionHeader } from '../ui/section-header'
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/motion'
import { useLocale } from '@/providers/locale-provider'

const PILLAR_ICONS = [Search, Layers, RefreshCw, Rocket] as const

export function HowIWorkSection() {
  const { dictionary } = useLocale()

  return (
    <section
      id="how-i-work"
      className="section-shell bg-background/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow={dictionary.howIWork.eyebrow}
            title={dictionary.howIWork.title}
            subtitle={dictionary.howIWork.subtitle}
          />
        </FadeIn>

        <FadeInStagger className="grid md:grid-cols-2 gap-4 sm:gap-6" stagger={0.12}>
          {dictionary.howIWork.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index] ?? Search

            return (
              <FadeInItem
                key={index}
                className="service-card group relative p-5 sm:p-6 backdrop-blur-sm rounded-2xl border border-border/60 bg-card/80"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-muted/70 text-foreground group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{pillar.description}</p>
                  </div>
                </div>
              </FadeInItem>
            )
          })}
        </FadeInStagger>
      </div>

      <ScrollDownButton href="#practice-areas" />
    </section>
  )
}
