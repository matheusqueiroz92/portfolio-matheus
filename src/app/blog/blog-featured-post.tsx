'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Rss } from 'lucide-react'

import { FadeIn } from '@/components/motion'
import { Badge } from '@/components/ui/badge'
import { formatLocaleDate } from '@/lib/format-locale-date'
import { useLocale } from '@/providers/locale-provider'
import type { BlogPostListItem } from '@/types'

interface BlogFeaturedPostProps {
  post: BlogPostListItem
}

export function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  const { locale, dictionary } = useLocale()
  const copy = dictionary.pages.blog

  return (
    <FadeIn className="mb-12">
      <Link
        href={`/blog/${post.slug}`}
        className="card-hover-lift group relative grid overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:grid-cols-[1.1fr_1fr]"
        aria-label={copy.readAria(post.title)}
      >
        {post.coverImage?.url ? (
          <div className="relative aspect-16/10 bg-muted/30 md:aspect-auto md:min-h-[320px]">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt ?? post.title}
              fill
              className="object-contain transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 640px"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-card/80 via-card/20 to-transparent" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center bg-muted/40 md:min-h-[320px]">
            <Rss className="h-10 w-10 text-primary/40" aria-hidden="true" />
          </div>
        )}

        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="eyebrow mb-3">{copy.featured}</p>
          <h2 className="mb-3 text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary md:text-3xl">
            {post.title}
          </h2>
          <p className="mb-5 line-clamp-3 leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.publishedDate}>
              {formatLocaleDate(post.publishedDate, locale)}
            </time>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-border/60 bg-background/50 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
            {copy.readArticle}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </FadeIn>
  )
}
