import { describe, expect, it } from 'vitest'

import { getHeroSubtitle, HERO_PHRASES, SITE_CONFIG, SITE_URL } from './site'

describe('site constants', () => {
  it('exposes stable site url and author', () => {
    expect(SITE_URL).toMatch(/^https?:\/\//)
    expect(SITE_CONFIG.author).toBe('Matheus Queiroz')
  })

  it('builds hero subtitle with years of experience', () => {
    const subtitle = getHeroSubtitle()

    expect(subtitle).toContain(String(SITE_CONFIG.yearsOfExperience))
    expect(subtitle).toContain('Fullstack')
  })

  it('keeps hero phrases for rotation', () => {
    expect(HERO_PHRASES.length).toBeGreaterThan(0)
    expect(HERO_PHRASES).toContain('Automação com IA')
  })
})
