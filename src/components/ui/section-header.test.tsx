import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SectionHeader } from '@/components/ui/section-header'

describe('SectionHeader', () => {
  it('renders title and optional content centered by default', () => {
    render(
      <SectionHeader
        eyebrow="Projetos"
        title="Cases recentes"
        subtitle="Seleção de trabalhos em produção."
      />,
    )

    expect(screen.getByText('Projetos')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Cases recentes' })).toBeInTheDocument()
    expect(screen.getByText('Seleção de trabalhos em produção.')).toBeInTheDocument()
    expect(screen.getByRole('banner').className).toContain('text-center')
  })

  it('supports left alignment and custom className', () => {
    render(<SectionHeader title="Sobre" align="left" className="mt-8" />)

    const header = screen.getByRole('banner')
    expect(header.className).toContain('text-left')
    expect(header.className).toContain('mt-8')
  })
})
