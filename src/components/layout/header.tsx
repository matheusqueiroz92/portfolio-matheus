'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { SOCIAL_LINKS } from '@/constants/data'
import Link from 'next/link'

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Contato', href: '/#contato' },
  { label: 'Blog', href: '/blog' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen((open) => !open)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/60 transition-all duration-300 shadow-sm"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            aria-label="Ir para a página inicial"
            className="transition-transform duration-300 hover:scale-110 flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <Image
              src="/logo-matheus-dev-azul-escuro.png"
              alt="Logo Matheus Queiroz"
              width={150}
              height={100}
              priority
              className="block dark:hidden h-auto w-[150px]"
            />
            <Image
              src="/logo-matheus-dev-azul-claro.png"
              alt=""
              aria-hidden="true"
              width={150}
              height={100}
              priority
              className="hidden dark:block h-auto w-[150px]"
            />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 group rounded-sm"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/80 group-hover:w-full transition-all duration-300"
                />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {SOCIAL_LINKS.map((social) => (
              <Tooltip key={social.url}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    target={social.download ? '_self' : '_blank'}
                    rel={social.download ? undefined : 'noopener noreferrer'}
                    download={social.download ? 'curriculo-matheus-queiroz.pdf' : undefined}
                    aria-label={social.label}
                    className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-foreground rounded-full p-1"
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">{social.label}</TooltipContent>
              </Tooltip>
            ))}
            <ThemeToggle />
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="menu-mobile"
            className="md:hidden py-6 border-t border-border/60 bg-background/95 animate-in slide-in-from-top-2 transition-colors duration-300"
          >
            <nav aria-label="Navegação principal (móvel)" className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-center rounded-sm"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-center space-x-6 pt-6">
                {SOCIAL_LINKS.map((social) => (
                  <Tooltip key={social.url}>
                    <TooltipTrigger asChild>
                      <a
                        href={social.url}
                        target={social.download ? '_self' : '_blank'}
                        rel={social.download ? undefined : 'noopener noreferrer'}
                        download={social.download ? 'curriculo-matheus-queiroz.pdf' : undefined}
                        aria-label={social.label}
                        className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-foreground rounded-full p-1"
                      >
                        <social.icon className="w-6 h-6" aria-hidden="true" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">{social.label}</TooltipContent>
                  </Tooltip>
                ))}
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
