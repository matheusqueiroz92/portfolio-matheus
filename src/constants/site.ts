import { Linkedin, Github, Instagram, FileDown } from 'lucide-react'

import type { ContactInfo, NavigationItem, SocialLink, Stat } from '@/types'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://matheusqueiroz.dev.br'

export const SITE_CONFIG = {
  title: 'Matheus Queiroz — Desenvolvedor Fullstack',
  description:
    'Portfólio de Matheus Queiroz, desenvolvedor Fullstack especializado em React, Next.js, Node.js e soluções com IA.',
  author: 'Matheus Queiroz',
  siteUrl: SITE_URL,
  yearsOfExperience: 5,
} as const

export const STATS: Stat[] = [
  { value: '5', label: 'Anos de Experiência' },
  { value: '+30', label: 'Projetos Desenvolvidos' },
  { value: '+15', label: 'Clientes Atendidos' },
]

export const CONTACT_INFO: ContactInfo = {
  email: 'contato@matheusqueiroz.dev.br',
  phone: '(77) 98833-4370',
  whatsapp: 'https://web.whatsapp.com/send/?phone=5577988334370&text=Ol%C3%A1+Matheus',
}

export type SocialLinkKey = 'linkedin' | 'github' | 'instagram' | 'resume'

export const SOCIAL_LINKS: (SocialLink & { key: SocialLinkKey })[] = [
  {
    key: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/matheus-queiroz-dev-web',
    icon: Linkedin,
    color: 'hover:text-blue-600',
    label: 'LinkedIn',
  },
  {
    key: 'github',
    name: 'GitHub',
    url: 'https://github.com/matheusqueiroz92',
    icon: Github,
    color: 'hover:text-gray-800 dark:hover:text-white',
    label: 'GitHub',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/matheusgiga',
    icon: Instagram,
    color: 'hover:text-pink-600',
    label: 'Instagram',
  },
  {
    key: 'resume',
    name: 'Currículo',
    url: '/curriculo.pdf',
    icon: FileDown,
    color: 'hover:text-gray-800 dark:hover:text-white',
    label: 'Currículo',
    download: true,
  },
]

export type NavItemKey = 'home' | 'about' | 'projects' | 'contact' | 'blog'

export const NAV_ITEMS: (NavigationItem & { key: NavItemKey })[] = [
  { key: 'home', label: 'Início', href: '/#home' },
  { key: 'about', label: 'Sobre', href: '/#about' },
  { key: 'projects', label: 'Projetos', href: '/#projects' },
  { key: 'contact', label: 'Contato', href: '/#contact' },
  { key: 'blog', label: 'Blog', href: '/blog' },
]

export const FOOTER_QUICK_LINKS: (NavigationItem & { key: NavItemKey })[] = [
  { key: 'home', label: 'Início', href: '/#home' },
  { key: 'about', label: 'Sobre', href: '/#about' },
  { key: 'projects', label: 'Projetos', href: '/#projects' },
  { key: 'blog', label: 'Blog', href: '/blog' },
  { key: 'contact', label: 'Contato', href: '/#contact' },
]

export type FooterServiceKey = 'fullstack' | 'ai' | 'consulting' | 'maintenance'

export const FOOTER_SERVICES: (NavigationItem & { key: FooterServiceKey })[] = [
  { key: 'fullstack', label: 'Desenvolvimento Fullstack', href: '/#areas-atuacao' },
  { key: 'ai', label: 'Soluções com IA', href: '/#areas-atuacao' },
  { key: 'consulting', label: 'Consultoria', href: '/#contact' },
  { key: 'maintenance', label: 'Manutenção & Evolução', href: '/#contact' },
]

export const HERO_PHRASES = [
  'ERP para Varejo',
  'Automação com IA',
  'Aplicações Escaláveis',
  'Ecossistemas Digitais',
] as const

export function getHeroSubtitle(): string {
  return `Desenvolvedor Fullstack unindo ${SITE_CONFIG.yearsOfExperience} anos de experiência, IA e automação para criar plataformas web de alta performance que escalam negócios.`
}
