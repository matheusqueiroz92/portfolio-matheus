import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { parsePostDocument, parseProjectDocument } from './content'

const projectFixturesDir = path.join(__dirname, '__fixtures__', 'projects')
const postFixturesDir = path.join(__dirname, '__fixtures__', 'posts')

function readProjectFixture(name: string): string {
  return readFileSync(path.join(projectFixturesDir, name), 'utf-8')
}

function readPostFixture(name: string): string {
  return readFileSync(path.join(postFixturesDir, name), 'utf-8')
}

describe('parseProjectDocument', () => {
  it('parses featured and flagship flags from frontmatter', () => {
    const flagship = parseProjectDocument(readProjectFixture('projeto-flagship.mdx'), 'projeto-flagship.mdx')
    const featured = parseProjectDocument(readProjectFixture('projeto-featured.mdx'), 'projeto-featured.mdx')
    const regular = parseProjectDocument(readProjectFixture('projeto-regular.mdx'), 'projeto-regular.mdx')

    expect(flagship.featured).toBe(true)
    expect(flagship.flagship).toBe(true)
    expect(flagship.listItem.scale).toBe('10 filiais')

    expect(featured.featured).toBe(true)
    expect(featured.flagship).toBe(false)

    expect(regular.featured).toBe(false)
    expect(regular.flagship).toBe(false)
  })

  it('orders projects by order field ascending', () => {
    const parsed = [
      parseProjectDocument(readProjectFixture('projeto-regular.mdx'), 'projeto-regular.mdx'),
      parseProjectDocument(readProjectFixture('projeto-featured.mdx'), 'projeto-featured.mdx'),
      parseProjectDocument(readProjectFixture('projeto-flagship.mdx'), 'projeto-flagship.mdx'),
    ].sort((a, b) => a.order - b.order)

    expect(parsed.map((project) => project.listItem.slug)).toEqual([
      'projeto-flagship',
      'projeto-featured',
      'projeto-regular',
    ])
  })

  it('parses string and object image frontmatter', () => {
    const raw = `---
title: "Com Imagem"
description: "Descrição"
publishedDate: "2025-01-01"
projectImage:
  url: "/img.png"
  alt: "Alt customizado"
  width: 800
  height: 600
---

Conteúdo.
`
    const parsed = parseProjectDocument(raw, 'com-imagem.mdx')

    expect(parsed.listItem.projectImage).toEqual({
      url: '/img.png',
      alt: 'Alt customizado',
      width: 800,
      height: 600,
    })
  })

  it('throws for missing required frontmatter fields', () => {
    const raw = `---
title: ""
description: "Descrição"
publishedDate: "2025-01-01"
---

Conteúdo.
`

    expect(() => parseProjectDocument(raw, 'invalido.mdx')).toThrow(/campo "title"/)
  })
})

describe('parsePostDocument', () => {
  it('parses blog post frontmatter and reading time', () => {
    const parsed = parsePostDocument(readPostFixture('post-valido.mdx'), 'post-valido.mdx')

    expect(parsed.listItem.slug).toBe('post-de-teste')
    expect(parsed.listItem.tags).toEqual(['nextjs', 'testes'])
    expect(parsed.data.coverImage).toEqual({
      url: '/images/cover.png',
      alt: 'Post de Teste',
    })
    expect(parsed.data.readingTimeMinutes).toBeGreaterThanOrEqual(1)
    expect(parsed.data.content).toContain('markdown')
  })

  it('throws for invalid published date', () => {
    const raw = `---
title: "Post"
excerpt: "Resumo"
publishedDate: "data-invalida"
---

Conteúdo.
`

    expect(() => parsePostDocument(raw, 'post-invalido.mdx')).toThrow(/publishedDate/)
  })
})
