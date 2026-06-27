import { Metadata } from 'next'

import { BlogIndexShell } from '@/app/blog/blog-index-shell'
import { getDictionary } from '@/i18n'
import { getAllPosts } from '@/lib/content'
import {
  BLOG_PAGE_SIZE,
  filterBlogPosts,
  normalizeSearchText,
  paginateItems,
  parsePageParam,
  parseQueryParam,
} from '@/lib/list-utils'
import { createPageMetadata } from '@/lib/metadata'
import { getServerLocale } from '@/lib/server-locale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const seo = getDictionary(locale).seo.blog

  return createPageMetadata(locale, {
    title: seo.title,
    description: seo.description,
  })
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
    <BlogIndexShell
      allPosts={allPosts}
      featuredPost={featuredPost}
      paginatedPosts={paginatedPosts}
      query={query}
    />
  )
}
