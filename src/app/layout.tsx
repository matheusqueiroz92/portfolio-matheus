import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { FaviconUpdater } from '@/components/ui/fav-icon-updater'
import { MotionConfigProvider, SmoothScrollProvider } from '@/components/motion'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Matheus Queiroz - Desenvolvedor Web',
  description: 'Portfólio de projetos desenvolvidos por Matheus Queiroz',
  keywords: ['Matheus Queiroz', 'Desenvolvedor Web', 'Portfólio', 'Projetos'],
  icons: {
    icon: [
      {
        url: '/icon-matheus-dev.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon-matheus-dev-2.svg',
        media: '(prefers-color-scheme: light)',
      },
    ],
    shortcut: '/icon-matheus-dev.svg',
    apple: [
      {
        url: '/icon-matheus-dev.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon-matheus-dev-2.svg',
        media: '(prefers-color-scheme: light)',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#conteudo-principal" className="skip-link">
          Pular para o conteúdo principal
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <MotionConfigProvider>
              <FaviconUpdater />
              {children}
            </MotionConfigProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
