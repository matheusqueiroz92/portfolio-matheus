import { Metadata } from 'next'
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
import { getAllPosts } from '@/lib/content'
import {
  BLOG_PAGE_SIZE,
  filterBlogPosts,
  normalizeSearchText,
  paginateItems,
  parsePageParam,
  parseQueryParam,
} from '@/lib/list-utils'

export const metadata: Metadata = {
  title: 'Blog | Matheus Queiroz',
  description:
    'Artigos sobre desenvolvimento fullstack, IA aplicada, arquitetura de software e os bastidores dos projetos que construo.',
}

interface BlogIndexPageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const params = await searchParams
  const query = parseQueryParam(params.q)
  const page = parsePageParam(params.page)
  const isSearching = normalizeSearchText(query).length > 0

  const allPosts = await getAllPosts()
  const featuredPost = !isSearching && page === 1 ? allPosts[0] : null
  const listSource = isSearching ? allPosts : allPosts.slice(featuredPost ? 1 : 0)
  const filteredPosts = filterBlogPosts(listSource, query)
  const paginatedPosts = paginateItems(filteredPosts, page, BLOG_PAGE_SIZE)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
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
          <BackButton href="/" label="início" />

          <FadeIn className="mb-14 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="eyebrow mb-4 rounded-full border border-primary/20 bg-primary/10 px-4 py-1">
                Blog
              </span>
              <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
                Notas &amp; bastidores
              </h1>
              <div className="mx-auto h-1 w-20 rounded-full bg-primary/60" />
              <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
                Artigos sobre desenvolvimento fullstack, IA aplicada, arquitetura e os aprendizados
                que colho construindo software de verdade.
              </p>
            </div>
          </FadeIn>

          {allPosts.length === 0 ? (
            <ContentEmptyResults
              icon={Rss}
              title="Nenhum post por aqui ainda"
              description="Logo, logo começam a aparecer as primeiras leituras. Volte em breve."
            />
          ) : (
            <>
              <ContentListToolbar
                totalItems={paginatedPosts.totalItems}
                itemLabel="posts"
                searchPlaceholder="Buscar por título, resumo ou tag…"
                query={query}
              />

              {featuredPost && <BlogFeaturedPost post={featuredPost} />}

              {paginatedPosts.items.length === 0 ? (
                <ContentEmptyResults
                  icon={Rss}
                  title="Nenhum post encontrado"
                  description="Tente outro termo de busca ou limpe o filtro para ver todos os artigos."
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
