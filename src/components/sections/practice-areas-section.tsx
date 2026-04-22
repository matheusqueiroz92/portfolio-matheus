"use client";

import { Code, Zap, Globe, Brain, Sparkles } from "lucide-react";
import { ScrollDownButton } from "../ui/scroll-down-button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion";

interface Service {
  icon: typeof Code;
  title: string;
  description: string;
  /** Carro-chefe. Recebe borda de acento e badge "Principal". */
  featured?: boolean;
}

export function PracticeAreasSection() {
  const services: Service[] = [
    {
      icon: Code,
      title: "Desenvolvimento Fullstack",
      description:
        "Arquitetura e desenvolvimento de aplicações web de ponta a ponta. Foco em criar interfaces de alta performance (Frontend) integradas a sistemas robustos, seguros e escaláveis (Backend).",
      featured: true,
    },
    {
      icon: Zap,
      title: "Consultoria Técnica e Estratégica",
      description:
        "Apoio a empresas na tomada de decisões tecnológicas, definição de stacks, viabilidade de projetos e modernização de infraestruturas legadas para ganho de eficiência.",
    },
    {
      icon: Globe,
      title: "Engenharia de Produto",
      description:
        "Transformação de ideias e regras de negócio em sistemas personalizados. Foco em UX/UI e automação de processos para otimizar operações e gerar vantagem competitiva.",
    },
    {
      icon: Brain,
      title: "IA & Automação de Processos",
      description: "Implementação de Inteligência Artificial e LLMs para otimização de fluxos de trabalho. Desenvolvimento de agentes inteligentes e automações personalizadas que reduzem custos operacionais e escalam a produtividade do negócio."
    }
  ];

  return (
    <section
      id="areas-atuacao"
      className="relative py-20 px-4 sm:px-6 sm:py-28 lg:px-8 lg:py-32 border-b border-border/60 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <FadeIn className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Áreas de Atuação
          </h2>
          <div className="w-20 h-1 bg-primary/60 mx-auto rounded-full"></div>
        </FadeIn>

        {/* Áreas de Atuação — o primeiro card recebe tratamento "carro-chefe":
            borda de acento, tintura azul no fundo, badge "Principal" e ícone
            colorido. Deixa claro qual é a oferta central sem quebrar o grid. */}
        <FadeInStagger className="grid md:grid-cols-2 gap-4 sm:gap-6" stagger={0.15}>
          {services.map((service) => {
            const isFeatured = service.featured === true;
            return (
              <FadeInItem
                key={service.title}
                className={`group relative p-5 sm:p-6 backdrop-blur-sm rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15),0_0_15px_rgba(59,130,246,0.1)] ${
                  isFeatured
                    ? "border-primary/60 bg-[color-mix(in_srgb,var(--primary)_5%,var(--card))] shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_25%,transparent)]"
                    : "border-border/60 bg-card/80"
                }`}
              >
                {isFeatured && (
                  <span className="absolute right-4 top-4 sm:right-5 sm:top-5 inline-flex items-center gap-1 rounded-full border border-primary/40 bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-wider text-primary">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Principal
                  </span>
                )}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${
                      isFeatured
                        ? "bg-primary/15 text-primary"
                        : "bg-muted/70 text-foreground"
                    }`}
                  >
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-xl sm:text-2xl font-semibold text-foreground mb-2 ${
                        isFeatured ? "pr-20 sm:pr-24 md:pr-28" : ""
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>

      <ScrollDownButton href="#tecnologias" />
    </section>
  );
}
