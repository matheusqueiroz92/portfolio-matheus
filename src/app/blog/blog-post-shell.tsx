'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock } from 'lucide-react'

import { Header, Footer } from '@/components/layout'
import { MdxContent } from '@/components/mdx'
import { Badge } from '@/components/ui/badge'
import { LocalizedMetadata } from '@/components/seo/localized-metadata'
import { formatLocaleDate } from '@/lib/format-locale-date'
import { useLocale } from '@/providers/locale-provider'
import type { BlogPost } from '@/types'

interface BlogPostShellProps {
  post: BlogPost
}

export function BlogPostShell({ post }: BlogPostShellProps) {
  const { locale, dictionary } = useLocale()
  const copy = dictionary.pages.blog
  const seo = dictionary.seo.blog

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <LocalizedMetadata title={seo.postTitle(post.title)} description={post.excerpt} />
      <Header />

      <main id="conteudo-principal" className="relative pt-28 pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 0%, var(--background-gradient-start) 0%, transparent 70%)',
          }}
        />

        <article className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {copy.backToBlog}
            </Link>

            <header className="space-y-4 mb-10">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                <time dateTime={post.publishedDate}>
                  {formatLocaleDate(post.publishedDate, locale)}
                </time>
                {post.readingTimeMinutes ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {copy.readingTime(post.readingTimeMinutes)}
                  </span>
                ) : null}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-border/70 bg-background/60 text-foreground/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {post.coverImage?.url && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/60 mb-10">
                <Image
                  src={post.coverImage.url}
                  alt={post.coverImage.alt ?? post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            )}

            <div className="mdx-prose max-w-none">
              <MdxContent source={post.content} />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
