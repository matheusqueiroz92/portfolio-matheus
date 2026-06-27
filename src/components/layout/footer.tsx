import Image from 'next/image'
import Link from 'next/link'
import LogoDark from '../../../public/logo-matheus-dev-azul-claro.png'
import LogoLight from '../../../public/logo-matheus-dev-azul-escuro.png'
import { FOOTER_QUICK_LINKS, FOOTER_SERVICES, SITE_CONFIG, SOCIAL_LINKS } from '@/constants/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative bg-background/80 text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 border-t border-border/60"
      aria-labelledby="rodape-heading"
    >
      <h2 id="rodape-heading" className="sr-only">
        Rodapé
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
              aria-label="Ir para a página inicial"
              className="inline-flex items-center mb-4 rounded-md transition-transform duration-300 hover:scale-[1.03]"
            >
              <Image
                src={LogoLight}
                alt="Logo Matheus Queiroz"
                width={240}
                height={80}
                priority
                className="block dark:hidden h-auto w-[240px]"
              />
              <Image
                src={LogoDark}
                alt=""
                aria-hidden="true"
                width={240}
                height={80}
                priority
                className="hidden dark:block h-auto w-[240px]"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">{SITE_CONFIG.footerTagline}</p>
            <ul aria-label="Redes sociais" className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target={social.download ? '_self' : '_blank'}
                    rel={social.download ? undefined : 'noopener noreferrer'}
                    download={social.download ? 'curriculo-matheus-queiroz.pdf' : undefined}
                    aria-label={social.label}
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
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-servicos" className="relative">
            <h3 id="footer-servicos" className="text-lg font-semibold mb-4 text-foreground">
              Serviços
            </h3>
            <ul className="space-y-2">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {currentYear} Matheus Queiroz. Todos os direitos reservados.</p>
          <p className="text-xs">
            Construído com <span className="text-foreground/80">Next.js</span>,{' '}
            <span className="text-foreground/80">Tailwind</span> &{' '}
            <span className="text-foreground/80">MDX</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
