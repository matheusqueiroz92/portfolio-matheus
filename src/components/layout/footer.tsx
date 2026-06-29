'use client'

import Image from 'next/image'
import Link from 'next/link'
import LogoDark from '../../../public/logo-matheus-dev-azul-claro.png'
import LogoLight from '../../../public/logo-matheus-dev-azul-escuro.png'
import { FOOTER_QUICK_LINKS, FOOTER_SERVICES, SOCIAL_LINKS } from '@/constants/site'
import { useLocale } from '@/providers/locale-provider'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { dictionary } = useLocale()

  return (
    <footer
      className="relative bg-background/80 text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 border-t border-border/60"
      aria-labelledby="rodape-heading"
    >
      <h2 id="rodape-heading" className="sr-only">
        {dictionary.footer.heading}
      </h2>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-secondary/5"
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-8">
          <div className="col-span-2 md:col-span-2">
            <Link
              href="/"
              aria-label={dictionary.footer.homeAriaLabel}
              className="inline-flex items-center mb-4 rounded-md transition-transform duration-300 hover:scale-[1.03]"
            >
              <Image
                src={LogoLight}
                alt={dictionary.footer.logoAlt}
                width={240}
                height={80}
                priority
                className="block dark:hidden h-auto w-full max-w-[180px] sm:max-w-[240px]"
              />
              <Image
                src={LogoDark}
                alt=""
                aria-hidden="true"
                width={240}
                height={80}
                priority
                className="hidden dark:block h-auto w-full max-w-[180px] sm:max-w-[240px]"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">{dictionary.site.footerTagline}</p>
            <ul aria-label={dictionary.footer.socialAria} className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target={social.download ? '_self' : '_blank'}
                    rel={social.download ? undefined : 'noopener noreferrer'}
                    download={
                      social.download ? dictionary.common.resumeDownloadFilename : undefined
                    }
                    aria-label={dictionary.social[social.key]}
                    className="inline-flex text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-foreground rounded-full p-1"
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-links" className="relative">
            <h3 id="footer-links" className="text-lg font-semibold mb-4 text-foreground">
              {dictionary.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="inline-block text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1"
                  >
                    {dictionary.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-servicos" className="relative">
            <h3 id="footer-servicos" className="text-lg font-semibold mb-4 text-foreground">
              {dictionary.footer.services}
            </h3>
            <ul className="space-y-2">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="inline-block text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1"
                  >
                    {dictionary.footer.serviceLinks[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>{dictionary.footer.copyright(currentYear)}</p>
          <p className="text-xs">
            {dictionary.footer.builtWith}{' '}
            <span className="text-foreground/80">Next.js</span>,{' '}
            <span className="text-foreground/80">Tailwind</span> &{' '}
            <span className="text-foreground/80">MDX</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
