import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogPostShell } from '@/app/blog/blog-post-shell'
import { MdxContent } from '@/components/mdx'
import { getDictionary } from '@/i18n'
import { getAllPostSlugs, getPostBySlug } from '@/lib/content'
import { absoluteUrl, createPageMetadata } from '@/lib/metadata'
import { getServerLocale } from '@/lib/server-locale'

interface PageProps {
  params: Promise<{ slug: string }>
}

function normalizeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).normalize('NFC')
  } catch {
    return slug
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getServerLocale()
  const seo = getDictionary(locale).seo.blog
  const { slug } = await params
  const post = await getPostBySlug(normalizeSlug(slug))

  if (!post) {
    return createPageMetadata(locale, {
      title: seo.postNotFound,
      description: seo.description,
    })
  }

  const title = seo.postTitle(post.title)

  return createPageMetadata(locale, {
    title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      publishedTime: post.publishedDate,
      ...(post.coverImage?.url && {
        images: [
          {
            url: absoluteUrl(post.coverImage.url),
            alt: post.coverImage.alt ?? post.title,
          },
        ],
      }),
    },
  })
}

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(normalizeSlug(slug))

  if (!post) notFound()

  const { content, ...postMeta } = post

  return (
    <BlogPostShell post={postMeta}>
      <MdxContent source={content} />
    </BlogPostShell>
  )
}
