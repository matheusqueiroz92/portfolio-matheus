'use client'

import Marquee from 'react-fast-marquee'
import { Code } from 'lucide-react'
import {
  IconTypescript,
  IconTailwind,
  IconReact,
  IconNext,
  IconHtml,
  IconCss,
  IconJavascript,
  IconNode,
  IconFastify,
  IconExpress,
  IconNest,
  IconPython,
  IconOpenAI,
  IconAnthropic,
  IconGemini,
  IconDocker,
  IconAws,
  IconVercel,
  IconPostgresql,
  IconMysql,
  IconMongodb,
  IconRedis,
  IconFramerMotion,
  IconRedux,
} from '@/components/ui/icons'
import { ScrollDownButton } from '@/components/ui/scroll-down-button'
import { IconGit } from '../ui/icons/icon-git'
import { FadeIn } from '@/components/motion'

interface TechItem {
  name: string
  icon?: React.ComponentType<{ className?: string; size?: number }>
}

// Componente que agrupa HTML, CSS e JavaScript em formato triangular
function CoreWebIcon({ className }: { className?: string }) {
  const iconClass = 'text-primary'
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className || ''}`}>
      <div className="relative w-6 h-6 overflow-visible">
        {/* Ícone JavaScript no topo centralizado */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${iconClass}`}>
          <IconJavascript size={11} className={iconClass} />
        </div>
        {/* Ícone HTML embaixo à esquerda */}
        <div className={`absolute bottom-0 left-0 -translate-x-1 ${iconClass}`}>
          <IconHtml size={11} className={iconClass} />
        </div>
        {/* Ícone CSS embaixo à direita */}
        <div className={`absolute bottom-0 right-0 translate-x-1 ${iconClass}`}>
          <IconCss size={11} className={iconClass} />
        </div>
      </div>
    </div>
  )
}

const frontendTechs: TechItem[] = [
  { name: 'React', icon: (props) => <IconReact size={24} {...props} /> },
  { name: 'Next.js', icon: (props) => <IconNext size={24} {...props} /> },
  { name: 'TypeScript', icon: (props) => <IconTypescript size={24} {...props} /> },
  { name: 'Tailwind CSS', icon: (props) => <IconTailwind size={24} {...props} /> },
  { name: 'Framer Motion', icon: (props) => <IconFramerMotion size={24} {...props} /> },
  { name: 'Redux', icon: (props) => <IconRedux size={24} {...props} /> },
  { name: 'Core Web', icon: CoreWebIcon },
]

const backendTechs: TechItem[] = [
  { name: 'Node.js', icon: (props) => <IconNode size={24} {...props} /> },
  { name: 'NestJS', icon: (props) => <IconNest size={24} {...props} /> },
  { name: 'Express', icon: (props) => <IconExpress size={24} {...props} /> },
  { name: 'Fastify', icon: (props) => <IconFastify size={24} {...props} /> },
  { name: 'Python', icon: (props) => <IconPython size={24} {...props} /> },
  { name: 'OpenAI', icon: (props) => <IconOpenAI size={24} {...props} /> },
  { name: 'Claude', icon: (props) => <IconAnthropic size={24} {...props} /> },
  { name: 'Gemini', icon: (props) => <IconGemini size={24} {...props} /> },
]

const infraTechs: TechItem[] = [
  { name: 'Docker', icon: (props) => <IconDocker size={24} {...props} /> },
  { name: 'AWS', icon: (props) => <IconAws size={24} {...props} /> },
  { name: 'Vercel', icon: (props) => <IconVercel size={24} {...props} /> },
  { name: 'PostgreSQL', icon: (props) => <IconPostgresql size={24} {...props} /> },
  { name: 'MySQL', icon: (props) => <IconMysql size={24} {...props} /> },
  { name: 'MongoDB', icon: (props) => <IconMongodb size={24} {...props} /> },
  { name: 'Redis', icon: (props) => <IconRedis size={24} {...props} /> },
  { name: 'Git/GitHub', icon: (props) => <IconGit size={24} {...props} /> },
]

function TechBadge({ tech }: { tech: TechItem }) {
  const Icon = tech.icon || Code
  return (
    <div className="flex items-center gap-3 mx-4 px-6 py-4 bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl hover:border-primary/50 transition-all duration-300 whitespace-nowrap">
      <Icon className="w-5 h-5 text-primary shrink-0" />
      <span className="text-foreground font-medium">{tech.name}</span>
    </div>
  )
}

export function TechnologiesSection() {
  return (
    <section
      id="tecnologias"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-border/60 bg-background/50 transition-colors duration-300"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-muted/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Stack Tecnológico</h2>
          <div className="w-20 h-1 bg-primary/60 mx-auto rounded-full"></div>
          {/* Subtítulo */}
          <p className="text-xl text-muted-foreground mt-4">
            Ferramentas e frameworks que utilizo para construir soluções robustas, do design da
            arquitetura ao deploy escalável.
          </p>
        </FadeIn>

        {/* Marquee Lines */}
        <div className="space-y-8">
          {/* Linha 1: Frontend (Direção: Esquerda) */}
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <Marquee direction="left" speed={50} pauseOnHover={true} className="overflow-visible">
              {[...frontendTechs, ...frontendTechs].map((tech, index) => (
                <TechBadge key={`frontend-${index}`} tech={tech} />
              ))}
            </Marquee>
          </div>

          {/* Linha 2: Backend & IA (Direção: Direita) */}
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <Marquee direction="right" speed={50} pauseOnHover={true} className="overflow-visible">
              {[...backendTechs, ...backendTechs].map((tech, index) => (
                <TechBadge key={`backend-${index}`} tech={tech} />
              ))}
            </Marquee>
          </div>

          {/* Linha 3: Infra, Bancos & Ferramentas (Direção: Esquerda) */}
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <Marquee direction="left" speed={50} pauseOnHover={true} className="overflow-visible">
              {[...infraTechs, ...infraTechs].map((tech, index) => (
                <TechBadge key={`infra-${index}`} tech={tech} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      <ScrollDownButton href="#projetos" />
    </section>
  )
}
