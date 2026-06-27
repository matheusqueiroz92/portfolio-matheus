import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LanguageToggle } from '@/components/ui/language-toggle'
import { LOCALE_STORAGE_KEY } from '@/lib/locale-storage'
import { LocaleProvider } from '@/providers/locale-provider'

function renderLanguageToggle() {
  return render(
    <LocaleProvider>
      <LanguageToggle />
    </LocaleProvider>,
  )
}

describe('LanguageToggle', () => {
  it('renders with portuguese aria label by default', () => {
    renderLanguageToggle()

    expect(screen.getByRole('button', { name: 'Mudar para inglês' })).toBeTruthy()
  })

  it('persists locale changes in localStorage', () => {
    renderLanguageToggle()

    fireEvent.click(screen.getByRole('button', { name: 'Mudar para inglês' }))

    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en')
    expect(screen.getByRole('button', { name: 'Switch to Portuguese' })).toBeTruthy()
  })
})
