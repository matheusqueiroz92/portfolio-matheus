'use client'

import { Header, Footer } from '@/components/layout'
import {
  HeroSection,
  AboutSection,
  PracticeAreasSection,
  ProjectsSection,
  TechnologiesSection,
  ContactSection,
} from '@/components/sections'
import { AnimatedParticles } from '@/components/ui/animated-particles'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { ScrollTopButton } from '@/components/ui/scroll-top-button'
import type { ProjectListItem } from '@/types'

interface HomeShellProps {
  featuredProjects: ProjectListItem[]
}

export function HomeShell({ featuredProjects }: HomeShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden transition-colors duration-300">
      <AnimatedParticles />
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main id="conteudo-principal">
          <HeroSection />
          <AboutSection />
          <PracticeAreasSection />
          <TechnologiesSection />
          <ProjectsSection projects={featuredProjects} />
          <ContactSection />
        </main>
        <ScrollTopButton />
        <Footer />
      </div>
    </div>
  )
}
