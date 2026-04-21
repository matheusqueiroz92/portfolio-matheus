import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import LogoDark from '../../../public/logo-matheus-dev-azul-claro.png'
import LogoLight from '../../../public/logo-matheus-dev-azul-escuro.png'
import { SOCIAL_LINKS } from '@/constants/data'

const QUICK_LINKS: { label: string; href: string }[] = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Projetos', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/#contato' },
]

const SERVICES: { label: string; href: string }[] = [
  { label: 'Desenvolvimento Web', href: '/#areas' },
  { label: 'Soluções com IA', href: '/#areas' },
  { label: 'Consultoria', href: '/#contato' },
  { label: 'Manutenção & Evolução', href: '/#contato' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 border-t border-border/60"
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
        <div className="mb-12 grid gap-6 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm md:grid-cols-[1.3fr_1fr] md:items-center md:p-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <span className="relative inline-flex h-2 w-2">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full bg-primary/60"
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Disponível para novos projetos
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
              Vamos construir algo <span className="text-primary">relevante</span>?
            </h3>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">
              Plataformas escaláveis, produtos com IA e soluções fullstack. Me chame para conversar
              sobre seu próximo projeto.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
            <Link
              href="/#contato"
              className="btn-primary-glow group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 sm:flex-1 md:flex-initial"
            >
              Iniciar conversa
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="mailto:gigamatheus@gmail.com"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/40 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-muted/50 sm:flex-1 md:flex-initial"
            >
              <Mail className="h-4 w-4 text-primary/70" aria-hidden="true" />
              gigamatheus@gmail.com
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
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
            <p className="text-muted-foreground mb-6 max-w-md">
              Desenvolvedor Fullstack apaixonado por criar soluções digitais inovadoras que
              transformam ideias em realidade.
            </p>
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
              {QUICK_LINKS.map((item) => (
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
              {SERVICES.map((item) => (
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
