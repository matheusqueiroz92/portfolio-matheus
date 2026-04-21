import { Metadata } from 'next'
import { FolderOpen } from 'lucide-react'

import { Header, Footer } from '@/components/layout'
import { FadeIn } from '@/components/motion'
import { ScrollTopButton } from '@/components/ui/scroll-top-button'
import { getAllProjects } from '@/lib/content'

import { ProjectsGrid } from './projects-grid'

export const metadata: Metadata = {
  title: 'Projetos | Matheus Queiroz',
  description:
    'Uma seleção dos projetos que desenvolvi — plataformas fullstack, produtos com IA e soluções sob medida para clientes e empresas.',
}

export default async function ProjectsIndexPage() {
  const projects = await getAllProjects()

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      <main id="conteudo-principal" className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 0%, var(--background-gradient-start) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Cabeçalho da página */}
          <FadeIn className="text-center mb-14">
            <p className="eyebrow mb-3">Portfólio</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Todos os projetos
            </h1>
            <div className="w-20 h-1 bg-primary/60 mx-auto rounded-full" />
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
              Uma seleção dos produtos e plataformas que construí — do MVP ao deploy em produção,
              com foco em arquitetura sólida e experiência de uso.
            </p>
          </FadeIn>

          {projects.length === 0 ? (
            <FadeIn className="text-center">
              <div className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card/60 p-10 backdrop-blur-sm">
                <FolderOpen className="mx-auto mb-4 h-8 w-8 text-primary/70" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Nenhum projeto publicado ainda
                </h2>
                <p className="text-sm text-muted-foreground">
                  Em breve os primeiros cases aparecem por aqui. Volte depois.
                </p>
              </div>
            </FadeIn>
          ) : (
            <ProjectsGrid projects={projects} />
          )}
        </div>
      </main>

      <ScrollTopButton />
      <Footer />
    </div>
  )
}
