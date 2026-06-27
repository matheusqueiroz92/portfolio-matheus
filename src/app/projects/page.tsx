import { Metadata } from 'next'

import { ProjectsIndexShell } from '@/app/projects/projects-index-shell'
import { getDictionary } from '@/i18n'
import { getAllProjects } from '@/lib/content'
import {
  filterProjects,
  paginateItems,
  parsePageParam,
  parseQueryParam,
  PROJECTS_PAGE_SIZE,
} from '@/lib/list-utils'
import { createPageMetadata } from '@/lib/metadata'
import { getServerLocale } from '@/lib/server-locale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const seo = getDictionary(locale).seo.projects

  return createPageMetadata(locale, {
    title: seo.title,
    description: seo.description,
  })
}

interface ProjectsIndexPageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function ProjectsIndexPage({ searchParams }: ProjectsIndexPageProps) {
  const params = await searchParams
  const query = parseQueryParam(params.q)
  const page = parsePageParam(params.page)

  const allProjects = await getAllProjects()
  const filteredProjects = filterProjects(allProjects, query)
  const paginatedProjects = paginateItems(filteredProjects, page, PROJECTS_PAGE_SIZE)

  return (
    <ProjectsIndexShell
      allProjects={allProjects}
      paginatedProjects={paginatedProjects}
      query={query}
    />
  )
}
