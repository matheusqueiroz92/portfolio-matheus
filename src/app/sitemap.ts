// Este arquivo é responsável por gerar dinamicamente o sitemap.xml da aplicação Next.js.
// O sitemap é um arquivo que ajuda mecanismos de busca (como o Google) a indexarem melhor as páginas do site,
// fornecendo uma lista de todas as rotas importantes (estáticas e dinâmicas) do projeto, com informações sobre atualização e prioridade.

import type { MetadataRoute } from 'next'

import { getAllPostSlugs, getAllProjectSlugs } from '@/lib/content'
import { SITE_URL } from '@/lib/metadata'

// Função que retorna as rotas a serem incluídas no sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Obtém os slugs de posts e de projetos para gerar rotas dinâmicas
  const [postSlugs, projectSlugs] = await Promise.all([getAllPostSlugs(), getAllProjectSlugs()])

  // Rotas estáticas do site (homepage, blog e projetos)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Rotas dinâmicas para posts do blog
  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Rotas dinâmicas para projetos
  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Junta todas as rotas e retorna para o Next.js criar o sitemap
  return [...staticRoutes, ...postRoutes, ...projectRoutes]
}
