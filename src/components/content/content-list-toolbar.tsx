'use client'

import { Suspense } from 'react'

import { ContentSearch } from '@/components/content/content-search'
import { useLocale } from '@/providers/locale-provider'
import { cn } from '@/lib/utils'

interface ContentListToolbarProps {
  totalItems: number
  itemSingular: string
  itemPlural: string
  searchPlaceholder: string
  query?: string
  className?: string
}

function ResultsSummary({
  totalItems,
  itemSingular,
  itemPlural,
  query,
}: Pick<ContentListToolbarProps, 'totalItems' | 'itemSingular' | 'itemPlural' | 'query'>) {
  const { dictionary } = useLocale()
  const items = totalItems === 1 ? itemSingular : itemPlural

  if (query?.trim()) {
    return (
      <p className="text-sm text-muted-foreground">
        {totalItems === 0
          ? dictionary.content.noResultsFor(query.trim())
          : dictionary.content.resultsFound(totalItems, items, query.trim())}
      </p>
    )
  }

  return (
    <p className="text-sm text-muted-foreground">
      {dictionary.content.totalCount(totalItems, items)}
    </p>
  )
}

export function ContentListToolbar({
  totalItems,
  itemSingular,
  itemPlural,
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
      <ResultsSummary
        totalItems={totalItems}
        itemSingular={itemSingular}
        itemPlural={itemPlural}
        query={query}
      />
    </div>
  )
}
