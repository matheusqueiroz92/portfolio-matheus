import { describe, expect, it } from 'vitest'

import robots from './robots'
import { absoluteUrl } from '@/lib/metadata'

describe('robots', () => {
  it('allows all crawlers and points to sitemap', () => {
    const config = robots()

    expect(config.rules).toEqual({
      userAgent: '*',
      allow: '/',
    })
    expect(config.sitemap).toBe(absoluteUrl('/sitemap.xml'))
  })
})
