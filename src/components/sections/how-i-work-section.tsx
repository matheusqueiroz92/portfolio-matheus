'use client'

import { Search, Layers, RefreshCw, Rocket } from 'lucide-react'
import { ScrollDownButton } from '../ui/scroll-down-button'
import { SectionHeader } from '../ui/section-header'
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/motion'

const PILLARS = [
  {
    icon: Search,
    title: 'Entendimento do negócio',
    description:
      'Alinho problema, usuário e métrica de sucesso antes de codar. Decisões técnicas partem do impacto real no negócio.',
  },
  {
    icon: Layers,
    title: 'Arquitetura antes de código',
    description:
      'Monorepo, TypeScript, validação compartilhada e decisões documentadas. Estruturo para escalar sem retrabalho.',
  },
  {
    icon: RefreshCw,
    title: 'Entrega iterativa',
    description:
      'MVP funcional, feedback contínuo e CI como gate de qualidade. Entregas frequentes com base sólida.',
  },
  {
    icon: Rocket,
    title: 'Ownership ponta a ponta',
    description:
      'Do design da API ao deploy e monitoramento. Assumo a responsabilidade completa pelo ciclo de vida do produto.',
  },
] as const

export function HowIWorkSection() {
  return (
    <section
      id="como-trabalho"
      className="section-shell bg-background/50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow="Metodologia"
            title="Como Trabalho"
            subtitle="Uma abordagem estruturada para transformar requisitos de negócio em software confiável, escalável e entregue com previsibilidade."
          />
        </FadeIn>

        <FadeInStagger className="grid md:grid-cols-2 gap-4 sm:gap-6" stagger={0.12}>
          {PILLARS.map((pillar) => (
            <FadeInItem
              key={pillar.title}
              className="service-card group relative p-5 sm:p-6 backdrop-blur-sm rounded-2xl border border-border/60 bg-card/80"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-muted/70 text-foreground group-hover:scale-110 transition-transform duration-300">
                  <pillar.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{pillar.description}</p>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>

      <ScrollDownButton href="#areas-atuacao" />
    </section>
  )
}
