import type { Metadata } from 'next'

import { getDictionary, type Locale } from '@/i18n'
import { CONTACT_INFO, SITE_CONFIG, SITE_URL, SOCIAL_LINKS } from '@/constants/site'

export { SITE_URL }

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, SITE_URL).toString()
}

const defaultOgImage = absoluteUrl('/foto-matheus-portfolio.png')

function getOpenGraphLocale(locale: Locale): string {
  return locale === 'pt-BR' ? 'pt_BR' : 'en_US'
}

export function createSiteMetadata(locale: Locale = 'pt-BR', overrides: Metadata = {}): Metadata {
  const seo = getDictionary(locale).seo.site
  const title = overrides.title ?? seo.title
  const description = overrides.description ?? seo.description
  const resolvedTitle = typeof title === 'string' ? title : seo.title
  const resolvedDescription =
    typeof description === 'string' ? description : seo.description
  const { openGraph: openGraphOverrides, twitter: twitterOverrides, ...restOverrides } = overrides

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: [...seo.keywords],
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
      locale: getOpenGraphLocale(locale),
      url: SITE_URL,
      siteName: SITE_CONFIG.author,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: seo.ogImageAlt,
        },
      ],
      ...openGraphOverrides,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [defaultOgImage],
      ...twitterOverrides,
    },
    ...restOverrides,
  }
}

export function createPageMetadata(
  locale: Locale,
  config: {
    title: string
    description: string
    openGraph?: Metadata['openGraph']
    twitter?: Metadata['twitter']
  },
): Metadata {
  return createSiteMetadata(locale, {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      ...config.openGraph,
    },
    twitter: {
      title: config.title,
      description: config.description,
      ...config.twitter,
    },
  })
}

export function getPersonJsonLd(locale: Locale = 'pt-BR') {
  const seo = getDictionary(locale).seo.site
  const sameAs = SOCIAL_LINKS.filter((link) => !link.download).map((link) => link.url)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        jobTitle: seo.jobTitle,
        url: SITE_URL,
        sameAs,
        email: `mailto:${CONTACT_INFO.email}`,
      },
      {
        '@type': 'WebSite',
        name: seo.title,
        url: SITE_URL,
        description: seo.description,
        inLanguage: locale === 'pt-BR' ? 'pt-BR' : 'en',
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.author,
        },
      },
    ],
  }
}
