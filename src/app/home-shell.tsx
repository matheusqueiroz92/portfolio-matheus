'use client'

import { Header, Footer } from '@/components/layout'
import {
  HeroSection,
  AboutSection,
  HowIWorkSection,
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
  flagshipProject: ProjectListItem | null
}

export function HomeShell({ featuredProjects, flagshipProject }: HomeShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden transition-colors duration-300">
      <AnimatedParticles />
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main id="conteudo-principal">
          <HeroSection />
          <AboutSection />
          <HowIWorkSection />
          <TechnologiesSection />
          <PracticeAreasSection />
          <ProjectsSection projects={featuredProjects} flagshipProject={flagshipProject} />
          <ContactSection />
        </main>
        <ScrollTopButton />
        <Footer />
      </div>
    </div>
  )
}
