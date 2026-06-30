import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectDetailShell } from '@/app/projects/project-detail-shell'
import { MdxContent } from '@/components/mdx'
import { getDictionary } from '@/i18n'
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/content'
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
  const seo = getDictionary(locale).seo.projects
  const { slug } = await params
  const project = await getProjectBySlug(normalizeSlug(slug))

  if (!project) {
    return createPageMetadata(locale, {
      title: seo.projectNotFound,
      description: seo.description,
    })
  }

  const title = seo.projectTitle(project.title)

  return createPageMetadata(locale, {
    title,
    description: project.description,
    openGraph: {
      ...(project.projectImage?.url && {
        images: [
          {
            url: absoluteUrl(project.projectImage.url),
            alt: project.projectImage.alt ?? project.title,
          },
        ],
      }),
    },
  })
}

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(normalizeSlug(slug))

  if (!project) notFound()

  const { content, ...projectMeta } = project

  return (
    <ProjectDetailShell project={projectMeta}>
      {content ? <MdxContent source={content} /> : null}
    </ProjectDetailShell>
  )
}
