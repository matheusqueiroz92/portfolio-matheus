import { LucideIcon } from 'lucide-react'

// ---------------------------------------------------------------------------
// Dados pessoais / site
// ---------------------------------------------------------------------------

export interface SocialLink {
  name: string
  url: string
  icon: LucideIcon
  color: string
  label: string
  download?: boolean
}

export interface Stat {
  value: string
  label: string
  color?: string
}

export interface ContactInfo {
  email: string
  phone: string
  whatsapp: string
}

export interface NavigationItem {
  label: string
  href: string
  icon?: string
}

// ---------------------------------------------------------------------------
// Conteúdo — Blog e Projetos
// ---------------------------------------------------------------------------

/**
 * Imagem usada em posts/projetos. Pode ser um caminho local (`/covers/x.webp`)
 * ou uma URL absoluta. `alt` é opcional — se ausente, o consumidor cai para o
 * título.
 */
export interface ContentImage {
  url: string
  alt?: string
  width?: number
  height?: number
}

// ---- Blog ----

export interface BlogPostListItem {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: ContentImage | null
  publishedDate: string
  tags?: string[] | null
}

export interface BlogPost extends BlogPostListItem {
  /**
   * Conteúdo bruto em MDX/Markdown. A página do post faz o parse com
   * next-mdx-remote.
   */
  content: string
  /**
   * Tempo estimado de leitura em minutos (opcional — calculado na leitura).
   */
  readingTimeMinutes?: number
}

// ---- Projetos ----

export interface ProjectListItem {
  id: string
  title: string
  slug: string
  description: string
  projectImage?: ContentImage | null
  urlProject?: string
  urlRepository?: string
  technologies?: string[] | null
  tags?: string[] | null
  updatedAt: string
  createdAt: string
  /**
   * Campo livre para meta-informação de escala do projeto, exibido na meta
   * line do card da home (ex.: "15k usuários", "equipe de 4 devs",
   * "15 filiais"). Opcional — quando ausente, o card exibe só o ano.
   */
  scale?: string
}

export interface Project extends ProjectListItem {
  /**
   * Conteúdo longo do projeto (estudo de caso) em MDX. Opcional: projetos
   * simples podem ter só a `description`.
   */
  content?: string
}
