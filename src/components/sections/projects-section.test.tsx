import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ProjectsSection } from '@/components/sections/projects-section'
import { sampleProjectAlpha, sampleProjectBeta } from '@/test/fixtures/content'
import { renderWithProviders } from '@/test/render-with-providers'

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string }) => <img alt={alt} {...props} />,
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
}))

vi.mock('@/hooks/use-prefers-reduced-motion', () => ({
  usePrefersReducedMotion: () => true,
}))

vi.mock('@/hooks/use-media-query', () => ({
  useCompactViewport: () => true,
}))

describe('ProjectsSection', () => {
  it('lists featured and regular projects with links to detail pages', () => {
    renderWithProviders(
      <ProjectsSection projects={[sampleProjectBeta]} flagshipProject={sampleProjectAlpha} />,
    )

    expect(screen.getByRole('heading', { name: 'Meus Projetos' })).toBeInTheDocument()
    expect(screen.getByText(sampleProjectAlpha.title)).toBeInTheDocument()
    expect(screen.getByText(sampleProjectBeta.title)).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Ver case completo' })).toHaveAttribute(
      'href',
      `/projects/${sampleProjectAlpha.slug}`,
    )
    expect(
      screen.getByRole('link', { name: `Ver case: ${sampleProjectBeta.title}` }),
    ).toHaveAttribute('href', `/projects/${sampleProjectBeta.slug}`)

    expect(screen.getByRole('link', { name: 'Ver Todos os Projetos' })).toHaveAttribute(
      'href',
      '/projects',
    )
  })

  it('shows empty state when there are no projects', () => {
    renderWithProviders(<ProjectsSection projects={[]} flagshipProject={null} />)

    expect(screen.getByText('Em breve novos projetos por aqui.')).toBeInTheDocument()
  })
})
