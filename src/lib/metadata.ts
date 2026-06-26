import type { Metadata } from 'next'

import { CONTACT_INFO, SITE_CONFIG, SITE_URL, SOCIAL_LINKS } from '@/constants/site'

export { SITE_URL }

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, SITE_URL).toString()
}

const defaultOgImage = absoluteUrl('/foto-matheus-portfolio.png')

export function createSiteMetadata(overrides: Metadata = {}): Metadata {
  const title = overrides.title ?? SITE_CONFIG.title
  const description = overrides.description ?? SITE_CONFIG.description
  const resolvedTitle = typeof title === 'string' ? title : SITE_CONFIG.title
  const resolvedDescription =
    typeof description === 'string' ? description : SITE_CONFIG.description

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: [
      'Matheus Queiroz',
      'Desenvolvedor Fullstack',
      'React',
      'Next.js',
      'Node.js',
      'Portfólio',
    ],
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    icons: {
      icon: [
        {
          url: '/icon-matheus-dev.svg',
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: '/icon-matheus-dev-2.svg',
          media: '(prefers-color-scheme: light)',
        },
      ],
      shortcut: '/icon-matheus-dev.svg',
      apple: [
        {
          url: '/icon-matheus-dev.svg',
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: '/icon-matheus-dev-2.svg',
          media: '(prefers-color-scheme: light)',
        },
      ],
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: SITE_URL,
      siteName: SITE_CONFIG.author,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.author} — Desenvolvedor Fullstack`,
        },
      ],
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [defaultOgImage],
      ...overrides.twitter,
    },
    ...overrides,
  }
}

export function getPersonJsonLd() {
  const sameAs = SOCIAL_LINKS.filter((link) => !link.download).map((link) => link.url)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        jobTitle: 'Desenvolvedor Fullstack',
        url: SITE_URL,
        sameAs,
        email: `mailto:${CONTACT_INFO.email}`,
      },
      {
        '@type': 'WebSite',
        name: SITE_CONFIG.title,
        url: SITE_URL,
        description: SITE_CONFIG.description,
        inLanguage: 'pt-BR',
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.author,
        },
      },
    ],
  }
}
