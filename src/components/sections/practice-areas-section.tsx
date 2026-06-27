'use client'

import { Code, Zap, Globe, Brain, Sparkles } from 'lucide-react'
import { ScrollDownButton } from '../ui/scroll-down-button'
import { SectionHeader } from '../ui/section-header'
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/motion'
import { useLocale } from '@/providers/locale-provider'

const SERVICE_ICONS = [Code, Zap, Globe, Brain] as const

export function PracticeAreasSection() {
  const { dictionary } = useLocale()
  const services = dictionary.practiceAreas.services

  return (
    <section id="areas-atuacao" className="section-shell transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow={dictionary.practiceAreas.eyebrow}
            title={dictionary.practiceAreas.title}
            subtitle={dictionary.practiceAreas.subtitle}
          />
        </FadeIn>

        <FadeInStagger className="grid md:grid-cols-2 gap-4 sm:gap-6" stagger={0.15}>
          {services.map((service, index) => {
            const isFeatured = service.featured === true
            const Icon = SERVICE_ICONS[index] ?? Code

            return (
              <FadeInItem
                key={index}
                className={`service-card group relative p-5 sm:p-6 backdrop-blur-sm rounded-2xl border ${
                  isFeatured
                    ? 'border-primary/60 bg-[color-mix(in_srgb,var(--primary)_5%,var(--card))] shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_25%,transparent)]'
                    : 'border-border/60 bg-card/80'
                }`}
              >
                {isFeatured && (
                  <span className="absolute right-4 top-4 sm:right-5 sm:top-5 inline-flex items-center gap-1 rounded-full border border-primary/40 bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-wider text-primary">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {dictionary.practiceAreas.featuredBadge}
                  </span>
                )}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${
                      isFeatured ? 'bg-primary/15 text-primary' : 'bg-muted/70 text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-xl sm:text-2xl font-semibold text-foreground mb-2 ${
                        isFeatured ? 'pr-20 sm:pr-24 md:pr-28' : ''
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </FadeInItem>
            )
          })}
        </FadeInStagger>
      </div>

      <ScrollDownButton href="#tecnologias" />
    </section>
  )
}
