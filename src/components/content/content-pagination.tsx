import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { buildListHref, getPaginationRange } from '@/lib/list-utils'
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
  if (totalPages <= 1) return null

  const pages = getPaginationRange(currentPage, totalPages)
  const previousPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  return (
    <nav
      aria-label="Paginação"
      className={cn('flex flex-wrap items-center justify-center gap-2', className)}
    >
      {previousPage ? (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={buildListHref(basePath, { q: query, page: previousPage })}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Anterior
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled aria-hidden="true">
          <ChevronLeft className="h-4 w-4" />
          Anterior
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
                  aria-label={`Ir para página ${page}`}
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
          <Link href={buildListHref(basePath, { q: query, page: nextPage })} aria-label="Próxima página">
            Próxima
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled aria-hidden="true">
          Próxima
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  )
}
