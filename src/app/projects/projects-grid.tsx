'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink, FolderOpen, Github } from 'lucide-react'

import { FadeInStagger, FadeInItem } from '@/components/motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { ProjectListItem } from '@/types'

interface ProjectsGridProps {
  projects: ProjectListItem[]
}

/**
 * Grid client-side dos cards de projeto. Mora num arquivo separado porque o
 * `onClick={(e) => e.stopPropagation()}` nos ícones de demo/repo é um event
 * handler — não pode atravessar a fronteira Server → Client Component. Ao
 * extrair o grid para um `'use client'` dedicado, a page principal continua
 * sendo async/server component e passa os dados já resolvidos.
 */
export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <FadeInStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.1}>
      {projects.map((project) => {
        const year = new Date(project.updatedAt).getFullYear()
        const meta = project.scale ? `${year} · ${project.scale}` : `${year}`

        return (
          <FadeInItem key={project.slug} className="h-full">
            <Card className="card-hover-lift group relative flex h-full flex-col overflow-hidden border border-border/60 bg-card/80 py-0 backdrop-blur-sm focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-background">
              {/* Overlay Link — card inteiro clicável. Ícones externos
                  ficam em z-20 com stopPropagation para não acionarem
                  esta navegação. */}
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Ver case: ${project.title}`}
                className="absolute inset-0 z-10 rounded-[inherit] focus:outline-none"
              >
                <span className="sr-only">Ver case: {project.title}</span>
              </Link>

              {project.projectImage?.url ? (
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
              ) : (
                <div className="flex h-56 items-center justify-center bg-muted/40">
                  <FolderOpen className="h-10 w-10 text-primary/40" aria-hidden="true" />
                </div>
              )}

              <CardContent className="flex grow flex-col p-5">
                <p className="eyebrow mb-2" aria-label="Ano e escala do projeto">
                  {meta}
                </p>

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
                      <Badge
                        variant="outline"
                        className="text-xs border-border/60 bg-background/50"
                      >
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
          </FadeInItem>
        )
      })}
    </FadeInStagger>
  )
}
