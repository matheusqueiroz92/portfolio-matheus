import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FolderOpen } from 'lucide-react'

import { ContentEmptyResults } from '@/components/content/content-empty-results'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  },
}))

describe('ContentEmptyResults', () => {
  it('renders empty state message', () => {
    render(
      <ContentEmptyResults
        icon={FolderOpen}
        title="Nenhum projeto encontrado"
        description="Tente outro termo de busca."
      />,
    )

    expect(screen.getByRole('heading', { name: 'Nenhum projeto encontrado' })).toBeInTheDocument()
    expect(screen.getByText('Tente outro termo de busca.')).toBeInTheDocument()
  })
})
