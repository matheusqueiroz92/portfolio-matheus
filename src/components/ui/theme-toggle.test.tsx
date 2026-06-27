import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { describe, expect, it, vi } from 'vitest'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LocaleProvider } from '@/providers/locale-provider'

const setTheme = vi.fn()

vi.mock('next-themes', async () => {
  const React = await import('react')

  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useTheme: () => ({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme,
    }),
  }
})

function renderThemeToggle() {
  return render(
    <LocaleProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    </LocaleProvider>,
  )
}

describe('ThemeToggle', () => {
  it('shows the theme toggle button in portuguese', async () => {
    renderThemeToggle()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Alternar tema' })).toBeTruthy()
    })
  })

  it('calls setTheme when clicked', async () => {
    setTheme.mockClear()
    renderThemeToggle()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Alternar tema' })).toBeTruthy()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Alternar tema' }))

    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
