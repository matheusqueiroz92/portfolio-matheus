import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Footer } from '@/components/layout/footer'
import {
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICES,
  SOCIAL_LINKS,
} from '@/constants/site'
import { getDictionary } from '@/i18n'
import { renderWithProviders } from '@/test/render-with-providers'

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string }) => <img alt={alt} {...props} />,
}))

describe('Footer', () => {
  const dictionary = getDictionary('pt-BR')

  it('renders quick links with correct hrefs', () => {
    renderWithProviders(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    for (const item of FOOTER_QUICK_LINKS) {
      expect(screen.getByRole('link', { name: dictionary.nav[item.key] })).toHaveAttribute(
        'href',
        item.href,
      )
    }
  })

  it('renders service links', () => {
    renderWithProviders(<Footer />)

    for (const item of FOOTER_SERVICES) {
      expect(
        screen.getByRole('link', { name: dictionary.footer.serviceLinks[item.key] }),
      ).toHaveAttribute('href', item.href)
    }
  })

  it('renders social links including resume download', () => {
    renderWithProviders(<Footer />)

    for (const social of SOCIAL_LINKS) {
      const link = screen.getByRole('link', { name: dictionary.social[social.key] })
      expect(link).toHaveAttribute('href', social.url)
    }
  })

  it('shows copyright notice', () => {
    renderWithProviders(<Footer />)

    expect(screen.getByText(/Todos os direitos reservados/)).toBeInTheDocument()
  })
})
