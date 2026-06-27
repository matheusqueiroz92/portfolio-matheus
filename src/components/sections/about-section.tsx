'use client'

import Link from 'next/link'
import { Download } from 'lucide-react'
import { STATS } from '@/constants/site'
import { ScrollDownButton } from '../ui/scroll-down-button'
import { SectionHeader } from '../ui/section-header'
import { FadeInStagger, FadeInItem } from '@/components/motion'

export function AboutSection() {
  return (
    <section id="sobre" className="section-shell bg-background/80 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <FadeInStagger className="space-y-8" stagger={0.12}>
          <FadeInItem>
            <SectionHeader
              eyebrow="Quem sou"
              title="Sobre Mim"
              subtitle="Saiba mais sobre minha trajetória profissional, minha formação acadêmica e a paixão que impulsiona meu trabalho."
            />
          </FadeInItem>

          {/* Conteúdo — quebrado em três blocos temáticos com sub-heading
              editorial ("Trajetória", "Formação & visão técnica", "O que me
              move") para dar pontos de entrada a quem skimma. A tipografia
              dos sub-headings segue o padrão eyebrow (uppercase + tracking
              largo) para manter o tom sóbrio e não competir com o H2. */}
          <FadeInItem className="space-y-8 text-muted-foreground leading-relaxed">
            <div className="space-y-3">
              <p className="eyebrow text-left">Trajetória</p>
              <p className="text-justify">
                Com quase uma década de experiência na vanguarda da tecnologia, minha trajetória é
                marcada pela autonomia e pelo empreendedorismo. Como Sócio-Fundador e Desenvolvedor
                Lead na{' '}
                <a
                  href="https://www.azworkcenter.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  AZ Work Center
                </a>
                , atuo há anos transformando necessidades de negócio em soluções digitais robustas,
                escaláveis e de alto valor agregado.
              </p>
            </div>

            <div className="space-y-3">
              <p className="eyebrow text-left">Formação &amp; visão técnica</p>
              <p className="text-justify">
                Sou graduado em Engenharia da Computação e especialista em Engenharia de Software.
                Essa base acadêmica, aliada à experiência de gerir minha própria operação técnica,
                me permitiu desenvolver uma visão 360º de um produto: desde a arquitetura e escolha
                da stack até a entrega final e o sucesso do cliente.
              </p>
              <p className="text-justify">
                Diferente de uma atuação convencional, minha vivência como empreendedor me deu a
                habilidade de alinhar decisões técnicas a objetivos financeiros e estratégicos.
                Atualmente, foco em liderar o desenvolvimento de aplicações fullstack que resolvem
                problemas reais para empresas de diversos nichos.
              </p>
            </div>

            <div className="space-y-3">
              <p className="eyebrow text-left">O que me move</p>
              <p className="text-justify">
                Além da tecnologia, minha maior motivação é minha família e meu filho Noah, que
                impulsionam minha busca constante por excelência e inovação em cada linha de código
                que escrevo.
              </p>
            </div>
          </FadeInItem>

          {/* Estatísticas */}
          <FadeInItem className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="text-3xl font-bold text-foreground tabular-nums">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </FadeInItem>

          {/* Botão de Download do Currículo */}
          <FadeInItem className="flex justify-center pt-4">
            <Link
              href="/curriculo.pdf"
              download
              className="btn-primary-glow group relative inline-flex items-center justify-center rounded-full bg-primary px-14 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/30"
            >
              <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              <Download className="mr-3 h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:scale-110" />
              <span className="relative z-10 tracking-wide">Baixar Currículo</span>
            </Link>
          </FadeInItem>
        </FadeInStagger>
      </div>

      <ScrollDownButton href="#como-trabalho" />
    </section>
  )
}
