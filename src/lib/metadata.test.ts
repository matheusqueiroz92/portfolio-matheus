import { describe, expect, it } from 'vitest'

import { getDictionary } from '@/i18n'
import { createPageMetadata } from '@/lib/metadata'

describe('localized metadata', () => {
  it('builds portuguese blog index metadata', () => {
    const seo = getDictionary('pt-BR').seo.blog
    const metadata = createPageMetadata('pt-BR', {
      title: seo.title,
      description: seo.description,
    })

    expect(metadata.title).toBe('Blog | Matheus Queiroz')
    expect(metadata.description).toContain('desenvolvimento fullstack')
    expect(metadata.openGraph?.locale).toBe('pt_BR')
  })

  it('builds english project detail metadata', () => {
    const seo = getDictionary('en').seo.projects
    const metadata = createPageMetadata('en', {
      title: seo.projectTitle('Retail ERP'),
      description: 'A production ERP for retail.',
    })

    expect(metadata.title).toBe('Retail ERP | Projects | Matheus Queiroz')
    expect(metadata.openGraph?.locale).toBe('en_US')
  })
})
