import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

import { LocaleProvider } from '@/providers/locale-provider'

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => <LocaleProvider>{children}</LocaleProvider>,
    ...options,
  })
}
