import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Header } from '@/components/layout/header'
import { NAV_ITEMS, SOCIAL_LINKS } from '@/constants/site'
import { getDictionary } from '@/i18n'
import { LOCALE_STORAGE_KEY } from '@/lib/locale-storage'
import { renderWithProviders } from '@/test/render-with-providers'

const setThemeMock = vi.fn()

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string }) => <img alt={alt} {...props} />,
}))

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    theme: 'light',
    resolvedTheme: 'light',
    setTheme: setThemeMock,
  }),
}))

describe('Header', () => {
  const dictionary = getDictionary('pt-BR')

  it('renders all main navigation links with correct hrefs', () => {
    renderWithProviders(<Header />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: dictionary.header.mainNav })).toBeInTheDocument()

    for (const item of NAV_ITEMS) {
      const links = screen.getAllByRole('link', { name: dictionary.nav[item.key] })
      expect(links.some((link) => link.getAttribute('href') === item.href)).toBe(true)
    }
  })

  it('renders social links with external urls', () => {
    renderWithProviders(<Header />)

    for (const social of SOCIAL_LINKS) {
      expect(
        screen.getAllByRole('link', { name: dictionary.social[social.key] }).length,
      ).toBeGreaterThan(0)
    }
  })

  it('opens and closes mobile menu with escape key', () => {
    renderWithProviders(<Header />)

    fireEvent.click(screen.getByRole('button', { name: dictionary.header.openMenu }))
    expect(screen.getByRole('button', { name: dictionary.header.closeMenu })).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getByRole('button', { name: dictionary.header.openMenu })).toBeInTheDocument()
  })

  it('switches language labels in the header', () => {
    renderWithProviders(<Header />)

    fireEvent.click(screen.getByRole('button', { name: 'Mudar para inglês' }))

    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en')
    expect(
      screen.getByRole('navigation', { name: getDictionary('en').header.mainNav }),
    ).toBeInTheDocument()
  })

  it('toggles theme from the header control', async () => {
    setThemeMock.mockClear()
    renderWithProviders(<Header />)

    fireEvent.click(screen.getByRole('button', { name: 'Alternar tema' }))

    expect(setThemeMock).toHaveBeenCalledWith('dark')
  })
})
