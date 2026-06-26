import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { parseProjectDocument } from './content'

const fixturesDir = path.join(__dirname, '__fixtures__', 'projects')

function readFixture(name: string): string {
  return readFileSync(path.join(fixturesDir, name), 'utf-8')
}

describe('parseProjectDocument', () => {
  it('parses featured and flagship flags from frontmatter', () => {
    const flagship = parseProjectDocument(readFixture('projeto-flagship.mdx'), 'projeto-flagship.mdx')
    const featured = parseProjectDocument(readFixture('projeto-featured.mdx'), 'projeto-featured.mdx')
    const regular = parseProjectDocument(readFixture('projeto-regular.mdx'), 'projeto-regular.mdx')

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
      parseProjectDocument(readFixture('projeto-regular.mdx'), 'projeto-regular.mdx'),
      parseProjectDocument(readFixture('projeto-featured.mdx'), 'projeto-featured.mdx'),
      parseProjectDocument(readFixture('projeto-flagship.mdx'), 'projeto-flagship.mdx'),
    ].sort((a, b) => a.order - b.order)

    expect(parsed.map((project) => project.listItem.slug)).toEqual([
      'projeto-flagship',
      'projeto-featured',
      'projeto-regular',
    ])
  })
})
