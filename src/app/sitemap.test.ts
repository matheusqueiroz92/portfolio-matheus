import { describe, expect, it, vi } from 'vitest'

import sitemap from './sitemap'

vi.mock('@/lib/content', () => ({
  getAllPostSlugs: vi.fn().mockResolvedValue(['post-a', 'post-b']),
  getAllProjectSlugs: vi.fn().mockResolvedValue(['projeto-a']),
}))

describe('sitemap', () => {
  it('includes static and dynamic routes', async () => {
    const routes = await sitemap()
    const urls = routes.map((route) => route.url)

    expect(urls.some((url) => url.endsWith('/blog/post-a'))).toBe(true)
    expect(urls.some((url) => url.endsWith('/projects/projeto-a'))).toBe(true)
    expect(urls.some((url) => url.endsWith('/blog'))).toBe(true)
    expect(urls.some((url) => url.endsWith('/projects'))).toBe(true)
  })
})
