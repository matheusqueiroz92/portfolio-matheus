import { Linkedin, Github, Instagram, FileDown } from 'lucide-react'

import type { ContactInfo, NavigationItem, SocialLink, Stat } from '@/types'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://matheusqueiroz.dev.br'

export const AVAILABILITY_BADGE = 'Aberto a oportunidades e projetos fullstack'

export const SITE_CONFIG = {
  title: 'Matheus Queiroz — Desenvolvedor Fullstack',
  description:
    'Portfólio de Matheus Queiroz, desenvolvedor Fullstack especializado em React, Next.js, Node.js e soluções com IA.',
  author: 'Matheus Queiroz',
  siteUrl: SITE_URL,
  yearsOfExperience: 10,
  footerTagline:
    'Desenvolvedor Fullstack com foco em arquitetura, produto e entrega ponta a ponta.',
} as const

export const STATS: Stat[] = [
  { value: '10', label: 'Anos de Experiência' },
  { value: '+30', label: 'Projetos Desenvolvidos' },
  { value: '+15', label: 'Clientes Atendidos' },
]

export const CONTACT_INFO: ContactInfo = {
  email: 'contato@matheusqueiroz.dev.br',
  phone: '(77) 98833-4370',
  whatsapp: 'https://web.whatsapp.com/send/?phone=5577988334370&text=Ol%C3%A1+Matheus',
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/matheus-queiroz-dev-web',
    icon: Linkedin,
    color: 'hover:text-blue-600',
    label: 'LinkedIn',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/matheusqueiroz92',
    icon: Github,
    color: 'hover:text-gray-800 dark:hover:text-white',
    label: 'GitHub',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/matheusgiga',
    icon: Instagram,
    color: 'hover:text-pink-600',
    label: 'Instagram',
  },
  {
    name: 'Currículo',
    url: '/curriculo.pdf',
    icon: FileDown,
    color: 'hover:text-gray-800 dark:hover:text-white',
    label: 'Currículo',
    download: true,
  },
]

export const NAV_ITEMS: NavigationItem[] = [
  { label: 'Início', href: '/#home' },
  { label: 'Sobre', href: '/#about' },
  { label: 'Projetos', href: '/#projects' },
  { label: 'Contato', href: '/#contact' },
  { label: 'Blog', href: '/blog' },
]

export const FOOTER_QUICK_LINKS: NavigationItem[] = [
  { label: 'Início', href: '/#home' },
  { label: 'Sobre', href: '/#about' },
  { label: 'Projetos', href: '/#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/#contact' },
]

export const FOOTER_SERVICES: NavigationItem[] = [
  { label: 'Desenvolvimento Fullstack', href: '/#practice-areas' },
  { label: 'Soluções com IA', href: '/#practice-areas' },
  { label: 'Consultoria', href: '/#contact' },
  { label: 'Manutenção & Evolução', href: '/#contact' },
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
