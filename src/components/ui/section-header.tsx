import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <header className={cn(isCenter ? 'text-center' : 'text-left', className)}>
      {eyebrow && (
        <p className={cn('eyebrow mb-3', isCenter && 'mx-auto')}>{eyebrow}</p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={cn(
          'section-accent-line mt-4',
          isCenter ? 'mx-auto' : '',
        )}
      />
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed',
            isCenter && 'mx-auto max-w-2xl',
            !isCenter && 'max-w-2xl',
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  )
}
