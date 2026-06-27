import type { LucideIcon } from 'lucide-react'

import { FadeIn } from '@/components/motion'

interface ContentEmptyResultsProps {
  icon: LucideIcon
  title: string
  description: string
}

export function ContentEmptyResults({ icon: Icon, title, description }: ContentEmptyResultsProps) {
  return (
    <FadeIn className="text-center">
      <div className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card/60 p-10 backdrop-blur-sm">
        <Icon className="mx-auto mb-4 h-8 w-8 text-primary/70" aria-hidden="true" />
        <h2 className="mb-2 text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </FadeIn>
  )
}
