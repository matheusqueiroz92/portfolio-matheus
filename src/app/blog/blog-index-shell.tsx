'use client'

import { Rss } from 'lucide-react'

import { BlogFeaturedPost } from '@/app/blog/blog-featured-post'
import { BlogPostsGrid } from '@/app/blog/blog-posts-grid'
import { ContentEmptyResults } from '@/components/content/content-empty-results'
import { ContentListToolbar } from '@/components/content/content-list-toolbar'
import { ContentPagination } from '@/components/content/content-pagination'
import { Header, Footer } from '@/components/layout'
import { BackButton } from '@/components/layout/back-button'
import { FadeIn } from '@/components/motion'
import { ScrollTopButton } from '@/components/ui/scroll-top-button'
import { LocalizedMetadata } from '@/components/seo/localized-metadata'
import { useLocale } from '@/providers/locale-provider'
import type { BlogPostListItem } from '@/types'

interface BlogIndexShellProps {
  allPosts: BlogPostListItem[]
  featuredPost: BlogPostListItem | null
  paginatedPosts: {
    items: BlogPostListItem[]
    page: number
    totalPages: number
    totalItems: number
  }
  query: string
}

export function BlogIndexShell({
  allPosts,
  featuredPost,
  paginatedPosts,
  query,
}: BlogIndexShellProps) {
  const { dictionary } = useLocale()
  const copy = dictionary.pages.blog
  const seo = dictionary.seo.blog

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <LocalizedMetadata title={seo.title} description={seo.description} />
      <Header />

      <main id="conteudo-principal" className="relative px-4 pt-28 pb-24 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 0%, var(--background-gradient-start) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <BackButton href="/" label={dictionary.nav.home.toLowerCase()} />

          <FadeIn className="mb-14 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="eyebrow mb-4 rounded-full border border-primary/20 bg-primary/10 px-4 py-1">
                {copy.eyebrow}
              </span>
              <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">{copy.title}</h1>
              <div className="mx-auto h-1 w-20 rounded-full bg-primary/60" />
              <p className="mx-auto mt-4 max-w-2xl px-2 text-base text-muted-foreground sm:text-xl">{copy.subtitle}</p>
            </div>
          </FadeIn>

          {allPosts.length === 0 ? (
            <ContentEmptyResults
              icon={Rss}
              title={copy.emptyTitle}
              description={copy.emptyDescription}
            />
          ) : (
            <>
              <ContentListToolbar
                totalItems={paginatedPosts.totalItems}
                itemSingular={copy.item}
                itemPlural={copy.items}
                searchPlaceholder={copy.searchPlaceholder}
                query={query}
              />

              {featuredPost && <BlogFeaturedPost post={featuredPost} />}

              {paginatedPosts.items.length === 0 ? (
                <ContentEmptyResults
                  icon={Rss}
                  title={copy.noResultsTitle}
                  description={copy.noResultsDescription}
                />
              ) : (
                <BlogPostsGrid posts={paginatedPosts.items} />
              )}

              <ContentPagination
                basePath="/blog"
                currentPage={paginatedPosts.page}
                totalPages={paginatedPosts.totalPages}
                query={query}
                className="mt-10"
              />
            </>
          )}
        </div>
      </main>

      <ScrollTopButton />
      <Footer />
    </div>
  )
}
