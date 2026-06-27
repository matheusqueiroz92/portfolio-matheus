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
import { LocalizedMetadata } from '@/components/seo/localized-metadata'
import { useLocale } from '@/providers/locale-provider'
import type { ProjectListItem } from '@/types'

interface HomeShellProps {
  featuredProjects: ProjectListItem[]
  flagshipProject: ProjectListItem | null
}

export function HomeShell({ featuredProjects, flagshipProject }: HomeShellProps) {
  const { dictionary } = useLocale()

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-clip transition-colors duration-300">
      <LocalizedMetadata
        title={dictionary.seo.site.title}
        description={dictionary.seo.site.description}
      />
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
