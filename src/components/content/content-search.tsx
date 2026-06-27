'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconSearch } from '@/components/ui/icons/icon-search'
import { buildListHref } from '@/lib/list-utils'
import { useLocale } from '@/providers/locale-provider'
import { cn } from '@/lib/utils'

interface ContentSearchProps {
  placeholder?: string
  className?: string
  debounceMs?: number
}

/**
 * Barra de busca sincronizada com a query string `?q=`.
 * Atualiza a URL com debounce e reseta a paginação ao buscar.
 */
export function ContentSearch({
  placeholder = 'Buscar…',
  className,
  debounceMs = 300,
}: ContentSearchProps) {
  const { dictionary } = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''

  const [value, setValue] = useState(urlQuery)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setValue(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  function pushQuery(nextQuery: string) {
    const href = buildListHref(pathname, { q: nextQuery })
    router.replace(href, { scroll: false })
  }

  function handleChange(nextValue: string) {
    setValue(nextValue)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      pushQuery(nextValue)
    }, debounceMs)
  }

  function handleClear() {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setValue('')
    pushQuery('')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    pushQuery(value)
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn('relative w-full max-w-xl', className)}
    >
      <label htmlFor="content-search" className="sr-only">
        {placeholder}
      </label>
      <span className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-muted-foreground">
        <IconSearch size={16} />
      </span>
      <Input
        id="content-search"
        type="text"
        inputMode="search"
        enterKeyHint="search"
        name="q"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-10 border-border/60 bg-card/60 pr-10 pl-9 backdrop-blur-sm"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleClear}
          className="absolute top-1/2 right-1.5 z-10 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={dictionary.content.clearSearch}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </form>
  )
}
