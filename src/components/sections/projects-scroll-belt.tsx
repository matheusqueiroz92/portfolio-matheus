'use client'

import { useMemo, useRef } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Badge } from '../ui/badge'
import { SectionHeader } from '../ui/section-header'
import {
  PROJECT_BELT_HEADER_OFFSET,
  useScrollTrackProgress,
} from '@/hooks/use-scroll-track-progress'
import type { Dictionary } from '@/i18n/types'
import type { ProjectListItem } from '@/types'

interface BeltProject {
  project: ProjectListItem
  isFlagship: boolean
  displayIndex: number
}

interface ProjectsScrollBeltProps {
  flagshipProject: ProjectListItem | null
  projects: ProjectListItem[]
  copy: Dictionary['projects']
}

function getSlideMotion(
  slideIndex: number,
  scaledProgress: number,
): { xPercent: number; opacity: number; pointerEvents: boolean } {
  const clamped = Math.max(0, scaledProgress)
  const activeIndex = Math.floor(clamped)
  const local = clamped - activeIndex

  if (slideIndex < activeIndex) {
    return { xPercent: -108, opacity: 0, pointerEvents: false }
  }

  if (slideIndex === activeIndex) {
    return {
      xPercent: -local * 105,
      opacity: 1 - local * 0.55,
      pointerEvents: local < 0.65,
    }
  }

  if (slideIndex === activeIndex + 1) {
    return {
      xPercent: (1 - local) * 105,
      opacity: 0.45 + local * 0.55,
      pointerEvents: local >= 0.35,
    }
  }

  return { xPercent: 108, opacity: 0, pointerEvents: false }
}

function ProjectBeltSlide({
  item,
  copy,
  motionState,
}: {
  item: BeltProject
  copy: Dictionary['projects']
  motionState: { xPercent: number; opacity: number; pointerEvents: boolean }
}) {
  const { project, isFlagship, displayIndex } = item
  const year = new Date(project.updatedAt).getFullYear()
  const meta = project.scale ? `${year} · ${project.scale}` : `${year}`

  return (
    <motion.article
      className="project-belt-slide absolute inset-0 flex items-stretch justify-center px-1"
      style={{
        x: `${motionState.xPercent}%`,
        opacity: motionState.opacity,
        pointerEvents: motionState.pointerEvents ? 'auto' : 'none',
      }}
      aria-hidden={motionState.opacity < 0.2}
    >
      <div
        className={
          isFlagship
            ? 'project-belt-card project-belt-card--flagship group h-full w-full max-w-4xl'
            : 'project-belt-card group h-full w-full max-w-4xl'
        }
      >
        <Link
          href={`/projects/${project.slug}`}
          aria-label={copy.viewCaseAria(project.title)}
          className="absolute inset-0 z-10 rounded-[inherit] focus:outline-none"
        >
          <span className="sr-only">{copy.viewCaseAria(project.title)}</span>
        </Link>

        <div className="project-belt-card-body">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="project-row-index" aria-hidden="true">
              {String(displayIndex + 1).padStart(2, '0')}
            </span>
            {isFlagship && <span className="eyebrow text-primary">{copy.featuredCase}</span>}
            <p className="eyebrow" aria-label={copy.yearScaleAria}>
              {meta}
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight transition-colors duration-300 group-hover:text-primary group-focus-within:text-primary">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm sm:text-[0.9375rem] leading-relaxed line-clamp-3 sm:line-clamp-4">
            {project.description}
          </p>

          {isFlagship && (
            <ul className="space-y-1.5">
              {copy.flagshipHighlights.slice(0, 2).map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, isFlagship ? 4 : 3).map((technology) => (
                <Badge
                  key={technology}
                  variant="outline"
                  className="text-[0.6875rem] border-border/60 bg-background/40 font-normal"
                >
                  {technology}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 pt-1">
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary"
            >
              {isFlagship ? copy.viewFullCase : copy.viewCase}
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
          <div className="project-belt-card-media">
            <Image
              src={project.projectImage.url}
              alt={project.projectImage.alt ?? project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 40vw"
              priority={displayIndex === 0}
            />
            <div aria-hidden="true" className="project-belt-card-overlay" />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="project-belt-card-media flex items-center justify-center bg-muted/30"
          >
            <span className="project-row-index text-base">
              {String(displayIndex + 1).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  )
}

export function shouldUseProjectsBelt(
  prefersReducedMotion: boolean,
  isCompactViewport: boolean,
  flagshipProject: ProjectListItem | null,
  projects: ProjectListItem[],
): boolean {
  const count =
    (flagshipProject ? 1 : 0) +
    projects.filter((p) => p.slug !== flagshipProject?.slug).length
  return !prefersReducedMotion && !isCompactViewport && count >= 2
}

export function ProjectsScrollBelt({
  flagshipProject,
  projects,
  copy,
}: ProjectsScrollBeltProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const beltProjects = useMemo<BeltProject[]>(() => {
    const items: BeltProject[] = []
    if (flagshipProject) {
      items.push({ project: flagshipProject, isFlagship: true, displayIndex: 0 })
    }
    projects.forEach((project, index) => {
      items.push({
        project,
        isFlagship: false,
        displayIndex: flagshipProject ? index + 1 : index,
      })
    })
    return items
  }, [flagshipProject, projects])

  const projectCount = beltProjects.length
  const transitionCount = Math.max(projectCount - 1, 1)
  const { progress, phase } = useScrollTrackProgress(trackRef)

  const scaledProgress = progress * (projectCount - 1)
  const activeDot = Math.min(Math.round(scaledProgress), projectCount - 1)

  const pinPanelStyle =
    phase === 'pinned'
      ? {
          position: 'fixed' as const,
          top: PROJECT_BELT_HEADER_OFFSET,
          left: 0,
          right: 0,
          zIndex: 25,
        }
      : phase === 'after'
        ? {
            position: 'absolute' as const,
            bottom: 0,
            left: 0,
            right: 0,
          }
        : {
            position: 'relative' as const,
          }

  return (
    <div
      ref={trackRef}
      className="project-belt-track"
      style={{ '--belt-transitions': transitionCount } as React.CSSProperties}
      aria-label={copy.beltAria}
    >
      <div className="project-belt-pin" style={pinPanelStyle}>
        <div className="project-belt-layout mx-auto h-full w-full max-w-7xl px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-5 lg:px-8">
          <SectionHeader
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
            className="mb-4 shrink-0 sm:mb-5"
          />

          <div className="project-belt-viewport relative mx-auto w-full min-h-0">
            {beltProjects.map((item, index) => {
              const motionState = getSlideMotion(index, scaledProgress)
              return (
                <ProjectBeltSlide
                  key={item.project.slug}
                  item={item}
                  copy={copy}
                  motionState={motionState}
                />
              )
            })}
          </div>

          <div className="project-belt-footer">
            <div
              className="flex items-center justify-center gap-2"
              role="tablist"
              aria-label={copy.beltProgressAria}
            >
              {beltProjects.map((item, index) => (
                <span
                  key={item.project.slug}
                  role="tab"
                  aria-selected={index === activeDot}
                  aria-label={item.project.title}
                  className={
                    index === activeDot
                      ? 'h-1.5 w-7 rounded-full bg-primary transition-all duration-300'
                      : 'h-1.5 w-1.5 rounded-full bg-border transition-all duration-300'
                  }
                />
              ))}
            </div>

            <Link
              href="/projects"
              className="btn-primary-glow group relative inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:px-12 sm:py-3.5 sm:text-base lg:px-16"
            >
              {copy.viewAll}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
