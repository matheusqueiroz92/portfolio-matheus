'use client'

import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { ScrollDownButton } from '../ui/scroll-down-button'
import { SectionHeader } from '../ui/section-header'
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/motion'
import type { ProjectListItem } from '@/types'

interface ProjectsSectionProps {
  projects: ProjectListItem[]
  flagshipProject?: ProjectListItem | null
}

const FLAGSHIP_HIGHLIGHTS = [
  'Monorepo Turborepo com API, painel e pacote compartilhado',
  'ERP em produção para rede multi-filial',
  'Controle de estoque, vendas e laboratório ótico unificados',
] as const

function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <Card className="card-hover-lift group relative bg-card/80 backdrop-blur-sm border border-border/60 overflow-hidden py-0 flex flex-col h-full focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-background">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Ver case: ${project.title}`}
        className="absolute inset-0 z-10 rounded-[inherit] focus:outline-none"
      >
        <span className="sr-only">Ver case: {project.title}</span>
      </Link>

      {project.projectImage?.url && (
        <div className="relative h-56 overflow-hidden bg-muted/30">
          <Image
            src={project.projectImage.url}
            alt={project.projectImage.alt ?? project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card/80 via-card/40 to-transparent" />
        </div>
      )}

      <CardContent className="p-5 flex flex-col h-full">
        {(() => {
          const year = new Date(project.updatedAt).getFullYear()
          const meta = project.scale ? `${year} · ${project.scale}` : `${year}`
          return (
            <p className="eyebrow mb-2" aria-label="Ano e escala do projeto">
              {meta}
            </p>
          )
        })()}

        <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm text-justify leading-relaxed grow">
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 mt-3">
            {project.technologies.slice(0, 4).map((technology) => (
              <Badge
                key={technology}
                variant="outline"
                className="text-xs border-border/60 bg-background/50"
              >
                {technology}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs border-border/60 bg-background/50">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto">
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-transform duration-300 group-hover:translate-x-0.5"
          >
            Ver case
            <ArrowRight className="w-3.5 h-3.5" />
          </span>

          <div className="flex items-center gap-1.5">
            {project.urlProject && (
              <Link
                href={project.urlProject}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative z-20 inline-flex items-center justify-center p-2 border border-border/60 text-muted-foreground rounded-lg hover:bg-muted/50 hover:text-foreground hover:border-primary/50 transition-all duration-300"
                aria-label={`Abrir demo de ${project.title}`}
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
                className="relative z-20 inline-flex items-center justify-center p-2 border border-border/60 text-muted-foreground rounded-lg hover:bg-muted/50 hover:text-foreground hover:border-primary/50 transition-all duration-300"
                aria-label={`Abrir repositório de ${project.title}`}
              >
                <Github className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProjectsSection({ projects, flagshipProject }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="section-shell transition-colors bg-background/80 duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-10 sm:mb-12">
          <SectionHeader
            eyebrow="Portfólio"
            title="Meus Projetos"
            subtitle="Alguns dos principais projetos que desenvolvi para clientes e empresas."
          />
        </FadeIn>

        {flagshipProject && (
          <FadeIn className="mb-8">
            <article className="group relative overflow-hidden rounded-2xl border border-primary/40 bg-[color-mix(in_srgb,var(--primary)_6%,var(--card))] shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_20%,transparent)]">
              <div className="grid lg:grid-cols-[1.15fr_1fr]">
                {flagshipProject.projectImage?.url && (
                  <div className="relative min-h-[240px] lg:min-h-[360px] overflow-hidden bg-muted/30">
                    <Image
                      src={flagshipProject.projectImage.url}
                      alt={flagshipProject.projectImage.alt ?? flagshipProject.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card/70 via-transparent to-transparent lg:bg-linear-to-r" />
                  </div>
                )}

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="eyebrow mb-3">Case em destaque</span>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">
                    {flagshipProject.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {flagshipProject.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {FLAGSHIP_HIGHLIGHTS.map((highlight) => (
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

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/projects/${flagshipProject.slug}`}
                      className="btn-primary-glow inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
                    >
                      Ver case completo
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
                        Abrir demo
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
                        GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>
        )}

        {projects.length === 0 && !flagshipProject ? (
          <p className="text-center text-muted-foreground py-12">
            Em breve novos projetos por aqui.
          </p>
        ) : projects.length > 0 ? (
          <FadeInStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" stagger={0.12}>
            {projects.map((project) => (
              <FadeInItem key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </FadeInItem>
            ))}
          </FadeInStagger>
        ) : null}

        {/* Botão de Ver Todos os Projetos */}
        <FadeIn className="text-center">
          <Link
            href="/projects"
            className="btn-primary-glow group relative inline-flex items-center justify-center px-8 sm:px-12 lg:px-16 py-3.5 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
          >
            Ver Todos os Projetos
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </div>

      <ScrollDownButton href="#contact" />
    </section>
  )
}
