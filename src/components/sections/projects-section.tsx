'use client'

import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '../ui/badge'
import { ScrollDownButton } from '../ui/scroll-down-button'
import { SectionHeader } from '../ui/section-header'
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/motion'
import { ProjectsScrollBelt, shouldUseProjectsBelt } from './projects-scroll-belt'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { useLocale } from '@/providers/locale-provider'
import type { Dictionary } from '@/i18n/types'
import type { ProjectListItem } from '@/types'

interface ProjectsSectionProps {
  projects: ProjectListItem[]
  flagshipProject?: ProjectListItem | null
}

function ProjectRow({
  project,
  copy,
  index,
}: {
  project: ProjectListItem
  copy: Dictionary['projects']
  index: number
}) {
  const year = new Date(project.updatedAt).getFullYear()
  const meta = project.scale ? `${year} · ${project.scale}` : `${year}`

  return (
    <article className="project-row group">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={copy.viewCaseAria(project.title)}
        className="absolute inset-0 z-10 rounded-[inherit] focus:outline-none"
      >
        <span className="sr-only">{copy.viewCaseAria(project.title)}</span>
      </Link>

      <div className="min-w-0 flex flex-col gap-3 sm:pr-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="project-row-index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="eyebrow" aria-label={copy.yearScaleAria}>
            {meta}
          </p>
        </div>

        <h3 className="text-xl sm:text-[1.35rem] font-semibold text-foreground leading-snug transition-colors duration-300 group-hover:text-primary group-focus-within:text-primary">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm sm:text-[0.9375rem] leading-relaxed line-clamp-2 sm:line-clamp-3">
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((technology) => (
              <Badge
                key={technology}
                variant="outline"
                className="text-[0.6875rem] border-border/60 bg-background/40 font-normal"
              >
                {technology}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge
                variant="outline"
                className="text-[0.6875rem] border-border/60 bg-background/40 font-normal"
              >
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-1 mt-auto">
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5"
          >
            {copy.viewCase}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>

          <div className="flex items-center gap-1.5">
            {project.urlProject && (
              <Link
                href={project.urlProject}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:border-primary/50 hover:bg-muted/50 hover:text-foreground transition-colors duration-300"
                aria-label={copy.openDemoAria(project.title)}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
            {project.urlRepository && (
              <Link
                href={project.urlRepository}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:border-primary/50 hover:bg-muted/50 hover:text-foreground transition-colors duration-300"
                aria-label={copy.openRepoAria(project.title)}
              >
                <Github className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {project.projectImage?.url ? (
        <div className="project-thumb-frame sm:order-last">
          <Image
            src={project.projectImage.url}
            alt={project.projectImage.alt ?? project.title}
            fill
            className="transition-opacity duration-300 group-hover:opacity-95"
            sizes="(max-width: 640px) 100vw, 240px"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="project-thumb-frame sm:order-last flex items-center justify-center"
        >
          <span className="project-row-index text-base">{String(index + 1).padStart(2, '0')}</span>
        </div>
      )}
    </article>
  )
}

function FlagshipCard({
  flagshipProject,
  copy,
  githubLabel,
}: {
  flagshipProject: ProjectListItem
  copy: Dictionary['projects']
  githubLabel: string
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-primary/35 bg-[color-mix(in_srgb,var(--primary)_5%,var(--card))] shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_16%,transparent)]">
      <div className="grid lg:grid-cols-[1fr_1.12fr]">
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 lg:order-1">
          <span className="eyebrow mb-3">{copy.featuredCase}</span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3 leading-tight">
            {flagshipProject.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-5">{flagshipProject.description}</p>

          <ul className="space-y-2 mb-6">
            {copy.flagshipHighlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/projects/${flagshipProject.slug}`}
              className="btn-primary-glow inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
            >
              {copy.viewFullCase}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {flagshipProject.urlProject && (
              <Link
                href={flagshipProject.urlProject}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border/60 px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/50 hover:bg-muted/50 transition-colors"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {copy.openDemo}
              </Link>
            )}
            {flagshipProject.urlRepository && (
              <Link
                href={flagshipProject.urlRepository}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border/60 px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/50 hover:bg-muted/50 transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                {githubLabel}
              </Link>
            )}
          </div>
        </div>

        {flagshipProject.projectImage?.url && (
          <div className="project-flagship-media lg:order-2 border-t lg:border-t-0 lg:border-l border-border/50">
            <Image
              src={flagshipProject.projectImage.url}
              alt={flagshipProject.projectImage.alt ?? flagshipProject.title}
              fill
              className="transition-opacity duration-500 group-hover:opacity-95"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        )}
      </div>
    </article>
  )
}

export function ProjectsSection({ projects, flagshipProject }: ProjectsSectionProps) {
  const { dictionary } = useLocale()
  const copy = dictionary.projects
  const prefersReducedMotion = usePrefersReducedMotion()
  const useBelt = shouldUseProjectsBelt(prefersReducedMotion, flagshipProject ?? null, projects)

  const hasProjects = projects.length > 0 || Boolean(flagshipProject)

  return (
    <section id="projects" className="section-shell overflow-hidden bg-background transition-colors duration-300">
      {!hasProjects ? (
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-10 sm:mb-12">
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
          </FadeIn>
          <p className="text-center text-muted-foreground py-12">{copy.emptyState}</p>
        </div>
      ) : useBelt ? (
        <>
          <ProjectsScrollBelt
            flagshipProject={flagshipProject ?? null}
            projects={projects}
            copy={copy}
          />
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <FadeIn className="text-center pb-4 pt-2">
              <Link
                href="/projects"
                className="btn-primary-glow group relative inline-flex items-center justify-center px-8 sm:px-12 lg:px-16 py-3.5 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
              >
                {copy.viewAll}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </>
      ) : (
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-10 sm:mb-12">
            <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
          </FadeIn>
          {flagshipProject && (
            <FadeIn className="mb-10 sm:mb-12">
              <FlagshipCard
                flagshipProject={flagshipProject}
                copy={copy}
                githubLabel={dictionary.social.github}
              />
            </FadeIn>
          )}

          {projects.length > 0 && (
            <FadeInStagger className="flex flex-col gap-3 sm:gap-4 mb-8" stagger={0.08}>
              {projects.map((project, index) => (
                <FadeInItem key={project.slug}>
                  <ProjectRow project={project} copy={copy} index={index} />
                </FadeInItem>
              ))}
            </FadeInStagger>
          )}

          <FadeIn className="text-center">
            <Link
              href="/projects"
              className="btn-primary-glow group relative inline-flex items-center justify-center px-8 sm:px-12 lg:px-16 py-3.5 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
            >
              {copy.viewAll}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      )}

      <ScrollDownButton href="#contact" />
    </section>
  )
}
