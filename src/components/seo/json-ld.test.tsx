import { describe, expect, it } from 'vitest'

import { JsonLd } from '@/components/seo/json-ld'
import { renderWithProviders } from '@/test/render-with-providers'

describe('JsonLd', () => {
  it('injects person structured data script', () => {
    const { container } = renderWithProviders(<JsonLd />)

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeTruthy()

    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data['@context']).toBe('https://schema.org')
    expect(data['@graph']).toHaveLength(2)
  })
})
