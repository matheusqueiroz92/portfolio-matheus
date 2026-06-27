import type { Metadata } from 'next'

import { getFeaturedProjects, getFlagshipProject } from '@/lib/content'
import { createSiteMetadata } from '@/lib/metadata'
import { getServerLocale } from '@/lib/server-locale'

import { HomeShell } from './home-shell'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  return createSiteMetadata(locale)
}

export default async function Home() {
  const [featuredProjects, flagshipProject] = await Promise.all([
    getFeaturedProjects(),
    getFlagshipProject(),
  ])

  const gridProjects = flagshipProject
    ? featuredProjects.filter((project) => project.slug !== flagshipProject.slug)
    : featuredProjects

  return <HomeShell featuredProjects={gridProjects} flagshipProject={flagshipProject} />
}
