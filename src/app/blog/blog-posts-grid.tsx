'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Rss } from 'lucide-react'

import { FadeInStagger, FadeInItem } from '@/components/motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatLocaleDate } from '@/lib/format-locale-date'
import { useLocale } from '@/providers/locale-provider'
import type { BlogPostListItem } from '@/types'

interface BlogPostsGridProps {
  posts: BlogPostListItem[]
}

export function BlogPostsGrid({ posts }: BlogPostsGridProps) {
  const { locale, dictionary } = useLocale()
  const copy = dictionary.pages.blog
  const staggerKey = posts.map((post) => post.slug).join('|')

  return (
    <FadeInStagger
      key={staggerKey}
      immediate
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      stagger={0.1}
    >
      {posts.map((post) => (
        <FadeInItem key={post.slug} className="h-full">
          <Card className="card-hover-lift group relative flex h-full flex-col overflow-hidden border border-border/60 bg-card/80 py-0 backdrop-blur-sm focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-background">
            <Link
              href={`/blog/${post.slug}`}
              className="absolute inset-0 z-10 rounded-[inherit] focus:outline-none"
              aria-label={copy.readAria(post.title)}
            >
              <span className="sr-only">{copy.readAria(post.title)}</span>
            </Link>

            {post.coverImage?.url ? (
              <div className="relative h-48 overflow-hidden bg-muted/30">
                <Image
                  src={post.coverImage.url}
                  alt={post.coverImage.alt ?? post.title}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card/80 via-card/30 to-transparent" />
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center bg-muted/40">
                <Rss className="h-8 w-8 text-primary/40" aria-hidden="true" />
              </div>
            )}

            <CardContent className="flex grow flex-col p-5">
              <p className="eyebrow mb-2">{formatLocaleDate(post.publishedDate, locale)}</p>
              <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                {post.title}
              </h3>
              <p className="line-clamp-3 grow text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
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

              <div className="mt-5 text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-primary transition-transform duration-300 group-hover:translate-x-0.5">
                  {copy.readArticle}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </CardContent>
          </Card>
        </FadeInItem>
      ))}
    </FadeInStagger>
  )
}
