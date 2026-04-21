'use client'

import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { ScrollDownButton } from '../ui/scroll-down-button'
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/motion'
import type { ProjectListItem } from '@/types'

interface ProjectsSectionProps {
  projects: ProjectListItem[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projetos"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border/60 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meus Projetos</h2>
          <div className="w-20 h-1 bg-primary/60 mx-auto rounded-full"></div>
          {/* Subtítulo */}
          <p className="text-xl text-muted-foreground mt-4">
            Alguns dos principais projetos que desenvolvi para clientes e empresas.
          </p>
        </FadeIn>

        {/* Projetos */}
        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Em breve novos projetos por aqui.
          </p>
        ) : (
          <FadeInStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" stagger={0.12}>
            {projects.map((project) => (
              <FadeInItem key={project.slug} className="h-full">
                <Card className="card-hover-lift group relative bg-card/80 backdrop-blur-sm border border-border/60 overflow-hidden py-0 flex flex-col h-full focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-background">
                  {/* Overlay Link — cobre o card inteiro, tornando toda a área
                      clicável e levando ao case study. Os ícones de demo e
                      repositório ficam com z-index maior e `stopPropagation`
                      para não acionarem esta navegação. */}
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`Ver case: ${project.title}`}
                    className="absolute inset-0 z-10 rounded-[inherit] focus:outline-none"
                  >
                    <span className="sr-only">Ver case: {project.title}</span>
                  </Link>

                  {/* Image Container */}
                  {project.projectImage?.url && (
                    <div className="relative h-56 overflow-hidden bg-muted/30">
                      <Image
                        src={project.projectImage.url}
                        alt={project.projectImage.alt ?? project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-card/80 via-card/40 to-transparent"></div>
                    </div>
                  )}

                  {/* Content */}
                  <CardContent className="p-5 flex flex-col h-full">
                    {/* Meta line — ano (derivado de publishedDate) + escala
                        opcional do frontmatter. Formato "2025 · 15 filiais".
                        Se `scale` não existir no MDX, mostra só o ano. */}
                    {(() => {
                      const year = new Date(project.updatedAt).getFullYear()
                      const meta = project.scale ? `${year} · ${project.scale}` : `${year}`
                      return (
                        <p className="eyebrow mb-2" aria-label="Ano e escala do projeto">
                          {meta}
                        </p>
                      )
                    })()}

                    {/* Título do Projeto */}
                    <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
                      {project.title}
                    </h3>

                    {/* Descrição do Projeto */}
                    <p className="text-muted-foreground text-sm text-justify leading-relaxed grow">
                      {project.description}
                    </p>

                    {/* Technologies Badges */}
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

                    {/* Rodapé do card — "Ver case" como affordance editorial
                        (não um botão retangular) + ícones externos opcionais. */}
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
            ))}
          </FadeInStagger>
        )}

        {/* Botão de Ver Todos os Projetos */}
        <FadeIn className="text-center">
          <Link
            href="/projects"
            className="btn-primary-glow group relative inline-flex items-center px-16 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
          >
            Ver Todos os Projetos
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </div>

      <ScrollDownButton href="#contato" />
    </section>
  )
}
