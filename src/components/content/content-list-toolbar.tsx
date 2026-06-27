import { Suspense } from 'react'

import { ContentSearch } from '@/components/content/content-search'
import { cn } from '@/lib/utils'

interface ContentListToolbarProps {
  totalItems: number
  itemLabel: string
  searchPlaceholder: string
  query?: string
  className?: string
}

function ResultsSummary({
  totalItems,
  itemLabel,
  query,
}: Pick<ContentListToolbarProps, 'totalItems' | 'itemLabel' | 'query'>) {
  const label = totalItems === 1 ? itemLabel.replace(/s$/, '') : itemLabel

  if (query?.trim()) {
    return (
      <p className="text-sm text-muted-foreground">
        {totalItems === 0
          ? `Nenhum resultado para “${query.trim()}”`
          : `${totalItems} ${label} encontrado${totalItems === 1 ? '' : 's'} para “${query.trim()}”`}
      </p>
    )
  }

  return (
    <p className="text-sm text-muted-foreground">
      {totalItems} {label}
    </p>
  )
}

export function ContentListToolbar({
  totalItems,
  itemLabel,
  searchPlaceholder,
  query,
  className,
}: ContentListToolbarProps) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <Suspense fallback={<div className="h-10 w-full max-w-xl rounded-md bg-muted/30" />}>
        <ContentSearch placeholder={searchPlaceholder} />
      </Suspense>
      <ResultsSummary totalItems={totalItems} itemLabel={itemLabel} query={query} />
    </div>
  )
}
