'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { buildListHref, getPaginationRange } from '@/lib/list-utils'
import { useLocale } from '@/providers/locale-provider'
import { cn } from '@/lib/utils'

interface ContentPaginationProps {
  basePath: string
  currentPage: number
  totalPages: number
  query?: string
  className?: string
}

export function ContentPagination({
  basePath,
  currentPage,
  totalPages,
  query,
  className,
}: ContentPaginationProps) {
  const { dictionary } = useLocale()

  if (totalPages <= 1) return null

  const pages = getPaginationRange(currentPage, totalPages)
  const previousPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  return (
    <nav
      aria-label={dictionary.content.paginationAria}
      className={cn('flex flex-wrap items-center justify-center gap-2', className)}
    >
      {previousPage ? (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={buildListHref(basePath, { q: query, page: previousPage })}
            aria-label={dictionary.content.previous}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            {dictionary.content.previous}
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled aria-hidden="true">
          <ChevronLeft className="h-4 w-4" />
          {dictionary.content.previous}
        </Button>
      )}

      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-sm text-muted-foreground"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size="icon-sm"
              asChild={page !== currentPage}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page === currentPage ? (
                <span>{page}</span>
              ) : (
                <Link
                  href={buildListHref(basePath, { q: query, page })}
                  aria-label={dictionary.content.goToPage(page)}
                >
                  {page}
                </Link>
              )}
            </Button>
          ),
        )}
      </div>

      {nextPage ? (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={buildListHref(basePath, { q: query, page: nextPage })}
            aria-label={dictionary.content.next}
          >
            {dictionary.content.next}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled aria-hidden="true">
          {dictionary.content.next}
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  )
}
