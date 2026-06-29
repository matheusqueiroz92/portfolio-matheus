import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { SkipLink } from '@/components/layout/skip-link'
import { FloatingChatbot } from '@/components/chatbot'
import { FaviconUpdater } from '@/components/ui/fav-icon-updater'
import { MotionConfigProvider, SmoothScrollProvider } from '@/components/motion'
import { JsonLd } from '@/components/seo/json-ld'
import { createSiteMetadata } from '@/lib/metadata'
import { getServerLocale } from '@/lib/server-locale'
import { LocaleProvider } from '@/providers/locale-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  return createSiteMetadata(locale)
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LocaleProvider>
          <JsonLd />
          <SkipLink />
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
                <FloatingChatbot />
              </MotionConfigProvider>
            </SmoothScrollProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
