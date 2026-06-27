import { Metadata } from 'next'
import { FolderOpen } from 'lucide-react'

import { ContentEmptyResults } from '@/components/content/content-empty-results'
import { ContentListToolbar } from '@/components/content/content-list-toolbar'
import { ContentPagination } from '@/components/content/content-pagination'
import { Header, Footer } from '@/components/layout'
import { BackButton } from '@/components/layout/back-button'
import { FadeIn } from '@/components/motion'
import { ScrollTopButton } from '@/components/ui/scroll-top-button'
import { getAllProjects } from '@/lib/content'
import {
  filterProjects,
  paginateItems,
  parsePageParam,
  parseQueryParam,
  PROJECTS_PAGE_SIZE,
} from '@/lib/list-utils'

import { ProjectsGrid } from './projects-grid'

export const metadata: Metadata = {
  title: 'Projetos | Matheus Queiroz',
  description:
    'Uma seleção dos projetos que desenvolvi — plataformas fullstack, produtos com IA e soluções sob medida para clientes e empresas.',
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
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />

      <main
        id="conteudo-principal"
        className="relative px-4 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 0%, var(--background-gradient-start) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <BackButton href="/" label="início" />
          <FadeIn className="mb-10 text-center sm:mb-14">
            <div className="flex flex-col items-center justify-center">
              <span className="eyebrow mb-4 rounded-full border border-primary/20 bg-primary/10 px-4 py-1">
                Portfólio
              </span>
              <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                Todos os projetos
              </h1>
              <div className="mx-auto h-1 w-20 rounded-full bg-primary/60" />
              <p className="mx-auto mt-4 max-w-2xl px-2 text-base text-muted-foreground sm:text-xl">
                Uma seleção dos produtos e plataformas que construí — do MVP ao deploy em produção,
                com foco em arquitetura sólida e experiência de uso.
              </p>
            </div>
          </FadeIn>

          {allProjects.length === 0 ? (
            <ContentEmptyResults
              icon={FolderOpen}
              title="Nenhum projeto publicado ainda"
              description="Em breve os primeiros cases aparecem por aqui. Volte depois."
            />
          ) : (
            <>
              <ContentListToolbar
                totalItems={paginatedProjects.totalItems}
                itemLabel="projetos"
                searchPlaceholder="Buscar por título, tecnologia ou tag…"
                query={query}
              />

              {paginatedProjects.items.length === 0 ? (
                <ContentEmptyResults
                  icon={FolderOpen}
                  title="Nenhum projeto encontrado"
                  description="Tente outro termo de busca ou limpe o filtro para ver todos os projetos."
                />
              ) : (
                <ProjectsGrid projects={paginatedProjects.items} />
              )}

              <ContentPagination
                basePath="/projects"
                currentPage={paginatedProjects.page}
                totalPages={paginatedProjects.totalPages}
                query={query}
                className="mt-10"
              />
            </>
          )}
        </div>
      </main>

      <ScrollTopButton />
      <Footer />
    </div>
  )
}
