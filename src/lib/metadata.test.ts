import { describe, expect, it } from 'vitest'

import {
  absoluteUrl,
  createPageMetadata,
  createSiteMetadata,
  getPersonJsonLd,
  SITE_URL,
} from './metadata'

describe('absoluteUrl', () => {
  it('builds absolute urls from paths', () => {
    expect(absoluteUrl('/blog')).toBe(`${SITE_URL}/blog`)
    expect(absoluteUrl('projects')).toBe(`${SITE_URL}/projects`)
  })
})

describe('createSiteMetadata', () => {
  it('builds default portuguese metadata', () => {
    const metadata = createSiteMetadata('pt-BR')

    expect(metadata.metadataBase?.toString()).toBe(`${SITE_URL}/`)
    expect(metadata.openGraph?.locale).toBe('pt_BR')
    expect((metadata.twitter as { card?: string })?.card).toBe('summary_large_image')
  })

  it('applies overrides and english locale', () => {
    const metadata = createSiteMetadata('en', {
      title: 'Custom Title',
      description: 'Custom description',
      openGraph: { type: 'article' },
    })

    expect(metadata.title).toBe('Custom Title')
    expect(metadata.openGraph?.locale).toBe('en_US')
    expect((metadata.openGraph as { type?: string })?.type).toBe('article')
  })
})

describe('createPageMetadata', () => {
  it('builds portuguese blog index metadata', () => {
    const metadata = createPageMetadata('pt-BR', {
      title: 'Blog | Matheus Queiroz',
      description: 'Artigos sobre desenvolvimento fullstack.',
    })

    expect(metadata.title).toBe('Blog | Matheus Queiroz')
    expect(metadata.openGraph?.title).toBe('Blog | Matheus Queiroz')
  })

  it('builds english project detail metadata', () => {
    const metadata = createPageMetadata('en', {
      title: 'Retail ERP | Projects | Matheus Queiroz',
      description: 'A production ERP for retail.',
    })

    expect(metadata.openGraph?.locale).toBe('en_US')
    expect(metadata.twitter?.description).toBe('A production ERP for retail.')
  })
})

describe('getPersonJsonLd', () => {
  it('returns structured data graph for both locales', () => {
    const pt = getPersonJsonLd('pt-BR')
    const en = getPersonJsonLd('en')

    expect(pt['@context']).toBe('https://schema.org')
    expect(pt['@graph']).toHaveLength(2)
    expect(en['@graph'][1]).toMatchObject({
      '@type': 'WebSite',
      inLanguage: 'en',
    })
  })
})
