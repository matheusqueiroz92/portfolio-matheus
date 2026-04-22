'use client'

import { ExternalLink, ArrowRight, CodeXml, LaptopMinimal, Cpu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollDownButton } from '../ui/scroll-down-button'

/**
 * Retrato com efeito "lâmpada": o cursor escreve sua posição em `--mx` / `--my`
 * (porcentagens do quadro), que o radial-gradient da `.hero-spotlight` lê em
 * tempo real. Em repouso a posição fica fora do frame → overlay escurece tudo.
 *
 * - Sem re-render em pointermove (mutação direta do style via ref).
 * - Desabilitado em telas sem hover (`@media (hover: none)` no CSS).
 * - Decorativo: todas as camadas de luz/backdrop são `aria-hidden`.
 */
function HeroPortrait() {
  const portraitRef = useRef<HTMLDivElement>(null)

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = portraitRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    node.style.setProperty('--mx', `${x}%`)
    node.style.setProperty('--my', `${y}%`)
  }

  function handlePointerLeave() {
    const node = portraitRef.current
    if (!node) return
    // Joga o buraco do spotlight para fora do quadro — retorna ao estado
    // uniformemente escurecido sem flicker.
    node.style.setProperty('--mx', '150%')
    node.style.setProperty('--my', '150%')
  }

  return (
    <>
      {/* SVG clipPath reutilizado via `clip-path: url(#hero-hex-rounded)` no
          CSS. Define um hexágono pointy-top (mesma orientação do logo do
          Node.js e da logomarca Matheus) com cantos levemente arredondados.
          Coordenadas em `objectBoundingBox` (0–1) — escalam com o elemento. */}
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <defs>
          <clipPath id="hero-hex-rounded" clipPathUnits="objectBoundingBox">
            <path
              d="M 0.530 0.0175
                 L 0.903 0.2325
                 A 0.06 0.06 0 0 1 0.933 0.285
                 L 0.933 0.715
                 A 0.06 0.06 0 0 1 0.903 0.7675
                 L 0.530 0.9825
                 A 0.06 0.06 0 0 1 0.470 0.9825
                 L 0.097 0.7675
                 A 0.06 0.06 0 0 1 0.067 0.715
                 L 0.067 0.285
                 A 0.06 0.06 0 0 1 0.097 0.2325
                 L 0.470 0.0175
                 A 0.06 0.06 0 0 1 0.530 0.0175
                 Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={portraitRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="hero-portrait relative mx-auto aspect-square max-w-[380px] sm:max-w-[480px] lg:max-w-[560px]"
      >
        <div aria-hidden="true" className="hero-dots absolute inset-0" />
        <div className="hero-shape absolute inset-[5%]">
          <Image
            src="/foto-matheus-portfolio.png"
            alt="Matheus Queiroz"
            fill
            priority
            sizes="(min-width: 1024px) 520px, 80vw"
            className="hero-photo object-cover"
          />
        </div>
        <div aria-hidden="true" className="hero-spotlight absolute inset-[5%]" />
      </div>
    </>
  )
}

const HERO_PHRASES = [
  'Aplicações Escaláveis',
  'Experiências Web',
  'Soluções com IA',
  'Ecossistemas Digitais',
]

const BADGES = [
  {
    title: 'Dev. Fullstack',
    icon: CodeXml,
    description: 'Desenvolvedor Fullstack',
  },
  {
    title: 'Eng. Software',
    icon: LaptopMinimal,
  },
  {
    title: 'Eng. Computação',
    icon: Cpu,
  },
]

// Parent orchestrator: staggers the children on mount.
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

// A soft, paper-like landing for the copy.
const copyVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

// Subtle "pop" for the badges (replaces the old back.out easing).
const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 18,
    },
  },
}

const badgesRowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const ctaRowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const ctaItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
}

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = HERO_PHRASES[phraseIndex]

    if (!isDeleting && displayText === currentPhrase) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayText === '') {
      const timeout = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length)
      }, 400)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(
      () => {
        const nextLength = displayText.length + (isDeleting ? -1 : 1)
        setDisplayText(currentPhrase.substring(0, nextLength))
      },
      isDeleting ? 40 : 90,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex])

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center border-b border-border/60 px-4 py-24 transition-colors duration-300 sm:px-6 sm:py-32 lg:px-8 lg:py-36"
    >
      <motion.div
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side */}
        <div className="w-full space-y-6 text-left sm:space-y-8 lg:w-1/2">
          {/* Badges */}
          <motion.div
            className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground sm:gap-3"
            variants={badgesRowVariants}
          >
            {BADGES.map((badge) => (
              <motion.div
                key={badge.title}
                variants={badgeVariants}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2"
              >
                <badge.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {badge.title}
              </motion.div>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl min-h-[3.6rem] sm:min-h-[4.2rem]"
            variants={copyVariants}
          >
            Transformando ideias em{' '}
            <span className="typewriter-wrapper text-primary">
              {displayText}
              <span className="typewriter-cursor" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            variants={copyVariants}
          >
            Desenvolvedor Fullstack unindo 10 anos de experiência, IA e automação para criar
            plataformas web de alta performance que escalam negócios.
          </motion.p>

          {/* Buttons CTAs */}
          <motion.div className="flex flex-col gap-3 sm:flex-row sm:gap-4" variants={ctaRowVariants}>
            <motion.div variants={ctaItemVariants}>
              <Link
                href="#contato"
                className="btn-primary-glow group relative inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 sm:w-auto sm:px-10 sm:py-3.5"
              >
                <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                <span className="relative z-10 tracking-wide">Entre em Contato</span>
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div variants={ctaItemVariants}>
              <Link
                href="#projetos"
                className="group inline-flex w-full items-center justify-center rounded-full border border-border px-7 py-3 font-semibold text-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-muted/70 sm:w-auto sm:px-8 sm:py-3.5"
              >
                <ExternalLink className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Ver Projetos
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div className="relative w-full max-w-xl lg:w-1/2" variants={photoVariants}>
          <HeroPortrait />
        </motion.div>
      </motion.div>

      <ScrollDownButton href="#sobre" />

      {/* Estilos globais para o retrato: precisam ser `global` porque o
          `HeroPortrait` é um subcomponente — styled-jsx escopado não
          alcança elementos fora da árvore JSX deste componente. */}
      <style jsx global>{`
        .hero-portrait {
          --mx: 150%;
          --my: 150%;
        }

        /* Hexágono arredondado via SVG clipPath — substitui o polygon anterior.
           Usa url(#hero-hex-rounded) injetado no JSX do HeroPortrait.
           Mesma orientação do logo do Node.js e da logomarca Matheus. */
        .hero-shape {
          clip-path: url(#hero-hex-rounded);
          transition:
            filter 400ms ease-out,
            background 400ms ease-out;
        }

        /* ===== LIGHT MODE (padrão) =====
           O PNG é um recorte (cutout) da pessoa — 63% dos pixels são
           totalmente transparentes. Por isso o background do hex PRECISA ser
           100% opaco: qualquer alpha aqui + filter: drop-shadow sangram a
           cor dos shadows azuis para dentro do hex (era isso que causava o
           shift azul → verde → cinza ao passar o mouse).
           As sombras ambiente tinted com primary também foram removidas do
           estado :hover no light mode — só a profundidade muda agora, nunca
           a temperatura de cor. */
        .hero-shape {
          background: var(--muted);
          filter: drop-shadow(0 0 1.5px color-mix(in srgb, var(--primary) 90%, transparent))
            drop-shadow(0 0 1.5px color-mix(in srgb, var(--primary) 90%, transparent))
            drop-shadow(0 22px 40px color-mix(in srgb, var(--foreground) 26%, transparent))
            drop-shadow(0 8px 16px color-mix(in srgb, var(--foreground) 16%, transparent));
        }

        .hero-portrait:hover .hero-shape {
          filter: drop-shadow(0 0 1.5px var(--primary)) drop-shadow(0 0 1.5px var(--primary))
            drop-shadow(0 28px 50px color-mix(in srgb, var(--foreground) 30%, transparent))
            drop-shadow(0 10px 20px color-mix(in srgb, var(--foreground) 20%, transparent));
        }

        .hero-photo {
          /* Light: foto natural, sem escurecimento */
          transition: filter 300ms ease-out;
        }

        /* ===== DARK MODE =====
           Neon forte seguindo o contorno hexagonal. Painel interno bem sutil
           para dar profundidade sem brigar com a foto. */
        :root.dark .hero-shape {
          /* Painel interno uniforme — só um tom a mais que o fundo, sem
             gradient de highlight (que virava uma "mancha" visível). */
          background: color-mix(in srgb, var(--foreground) 6%, transparent);
          filter: drop-shadow(0 0 0.5px var(--primary)) drop-shadow(0 0 0.5px var(--primary))
            drop-shadow(0 0 22px color-mix(in srgb, var(--primary) 60%, transparent))
            drop-shadow(0 0 55px color-mix(in srgb, var(--primary) 40%, transparent))
            drop-shadow(0 0 110px color-mix(in srgb, var(--primary) 22%, transparent));
        }

        :root.dark .hero-portrait:hover .hero-shape {
          filter: drop-shadow(0 0 0.5px var(--primary)) drop-shadow(0 0 0.5px var(--primary))
            drop-shadow(0 0 30px color-mix(in srgb, var(--primary) 80%, transparent))
            drop-shadow(0 0 75px color-mix(in srgb, var(--primary) 50%, transparent))
            drop-shadow(0 0 150px color-mix(in srgb, var(--primary) 28%, transparent));
        }

        :root.dark .hero-photo {
          filter: brightness(0.72) contrast(0.96) saturate(0.95);
        }

        :root.dark .hero-portrait:hover .hero-photo {
          filter: brightness(0.88) contrast(1) saturate(1);
        }

        /* ===== Camadas atmosféricas (dots + spotlight) =====
           Halo circular foi removido — ele criava uma sombra circular atrás
           do hexágono, conflitando com o formato. A aura agora é 100% feita
           pela pilha de drop-shadows do .hero-shape, que segue o contorno. */
        .hero-dots {
          background-image: radial-gradient(
            circle,
            color-mix(in srgb, var(--foreground) 22%, transparent) 1px,
            transparent 1.5px
          );
          background-size: 22px 22px;
          background-position: 0 0;
          -webkit-mask-image: radial-gradient(
            circle at 50% 50%,
            black 0%,
            black 40%,
            transparent 74%
          );
          mask-image: radial-gradient(circle at 50% 50%, black 0%, black 40%, transparent 74%);
          /* Light: pontos quase imperceptíveis — textura, não protagonismo */
          opacity: 0.2;
        }
        :root.dark .hero-dots {
          opacity: 0.5;
        }

        .hero-spotlight {
          pointer-events: none;
          background: radial-gradient(
            circle 240px at var(--mx) var(--my),
            transparent 0%,
            color-mix(in srgb, var(--background) 6%, transparent) 22%,
            color-mix(in srgb, var(--background) 32%, transparent) 55%,
            color-mix(in srgb, var(--background) 58%, transparent) 100%
          );
          /* Recorta o spotlight exatamente pelo mesmo hex do portrait — sem
             isso, o anel escurecido do radial-gradient aparece como um
             "halo" circular fora do hexágono (especialmente no dark). */
          -webkit-clip-path: url(#hero-hex-rounded);
          clip-path: url(#hero-hex-rounded);
          /* Light: spotlight totalmente desligado — no fundo cream ele criava
             um halo que deslocava a temperatura da foto (azul → verde → cinza)
             quando o cursor passava sobre tons de pele/roupa. */
          opacity: 0;
        }
        :root.dark .hero-spotlight {
          opacity: 1;
        }

        @media (hover: none) {
          .hero-spotlight {
            display: none;
          }
          :root.dark .hero-photo {
            filter: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-shape,
          .hero-photo {
            transition: none;
          }
        }
      `}</style>

      <style jsx>{`
        .typewriter-cursor {
          display: inline-block;
          margin-left: 0.12rem;
          width: 2px;
          height: 1.1em;
          background: currentColor;
          animation: cursorBlink 1s steps(2, start) infinite;
          vertical-align: baseline;
        }

        .typewriter-wrapper {
          position: relative;
          display: inline-block;
          min-width: clamp(14rem, 26ch, 28rem);
          max-width: min(100%, 28rem);
          white-space: nowrap;
          min-height: 1em;
          vertical-align: baseline;
        }

        @keyframes cursorBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        :global(.hero-status-pulse) {
          animation: heroStatusPulse 2.2s ease-out infinite;
        }

        @keyframes heroStatusPulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          80%,
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.hero-status-pulse) {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
