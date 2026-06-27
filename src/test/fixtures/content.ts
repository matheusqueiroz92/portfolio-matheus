import type { BlogPostListItem, ProjectListItem } from '@/types'

export const sampleProjectAlpha: ProjectListItem = {
  id: 'projeto-alpha',
  title: 'Projeto Teste Alpha',
  slug: 'projeto-teste-alpha',
  description: 'Plataforma fullstack de demonstração para testes automatizados.',
  projectImage: { url: '/projeto-alpha.png', alt: 'Projeto Alpha' },
  urlProject: 'https://demo-alpha.example.com',
  urlRepository: 'https://github.com/example/alpha',
  technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
  tags: ['fullstack'],
  updatedAt: '2025-06-01T00:00:00.000Z',
  createdAt: '2025-06-01T00:00:00.000Z',
  scale: 'MVP',
}

export const sampleProjectBeta: ProjectListItem = {
  id: 'projeto-beta',
  title: 'Projeto Teste Beta',
  slug: 'projeto-teste-beta',
  description: 'Segundo projeto de demonstração com foco em mobile.',
  projectImage: null,
  urlProject: undefined,
  urlRepository: 'https://github.com/example/beta',
  technologies: ['React Native', 'Node.js'],
  tags: ['mobile'],
  updatedAt: '2025-05-01T00:00:00.000Z',
  createdAt: '2025-05-01T00:00:00.000Z',
}

export const sampleProjects = [sampleProjectAlpha, sampleProjectBeta]

export const samplePostFeatured: BlogPostListItem = {
  id: 'post-featured',
  title: 'Post em Destaque',
  slug: 'post-em-destaque',
  excerpt: 'Resumo do artigo em destaque para testes de listagem.',
  coverImage: { url: '/post-featured.png', alt: 'Capa' },
  publishedDate: '2025-08-01T00:00:00.000Z',
  tags: ['nextjs', 'arquitetura'],
}

export const samplePostRegular: BlogPostListItem = {
  id: 'post-regular',
  title: 'Post Regular',
  slug: 'post-regular',
  excerpt: 'Outro artigo listado na grade do blog.',
  coverImage: null,
  publishedDate: '2025-07-01T00:00:00.000Z',
  tags: ['typescript'],
}

export const samplePosts = [samplePostFeatured, samplePostRegular]
