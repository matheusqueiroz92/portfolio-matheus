import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders badge content', () => {
    render(<Badge>Next.js</Badge>)

    expect(screen.getByText('Next.js')).toHaveAttribute('data-slot', 'badge')
  })

  it('supports variant and asChild', () => {
    render(
      <Badge variant="outline" asChild>
        <a href="/blog">Blog</a>
      </Badge>,
    )

    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('data-variant', 'outline')
  })
})
