'use client'

import Link from 'next/link'
import { Download } from 'lucide-react'
import { ScrollDownButton } from '../ui/scroll-down-button'
import { SectionHeader } from '../ui/section-header'
import { FadeInStagger, FadeInItem } from '@/components/motion'
import { useLocale } from '@/providers/locale-provider'

export function AboutSection() {
  const { dictionary } = useLocale()

  return (
    <section id="about" className="section-shell bg-background/80 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <FadeInStagger className="space-y-8" stagger={0.12}>
          <FadeInItem>
            <SectionHeader
              eyebrow={dictionary.about.eyebrow}
              title={dictionary.about.title}
              subtitle={dictionary.about.subtitle}
            />
          </FadeInItem>

          <FadeInItem className="space-y-8 text-muted-foreground leading-relaxed">
            <div className="space-y-3">
              <p className="eyebrow text-left">{dictionary.about.trajectory}</p>
              <p className="text-justify">
                {dictionary.about.trajectoryText.split('AZ Work Center')[0]}
                <a
                  href="https://www.azworkcenter.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  AZ Work Center
                </a>
                {dictionary.about.trajectoryText.split('AZ Work Center')[1]}
              </p>
            </div>

            <div className="space-y-3">
              <p className="eyebrow text-left">{dictionary.about.education}</p>
              <p className="text-justify">{dictionary.about.educationText1}</p>
              <p className="text-justify">{dictionary.about.educationText2}</p>
            </div>

            <div className="space-y-3">
              <p className="eyebrow text-left">{dictionary.about.motivation}</p>
              <p className="text-justify">{dictionary.about.motivationText}</p>
            </div>
          </FadeInItem>

          <FadeInItem className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {dictionary.site.stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="text-3xl font-bold text-foreground tabular-nums">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </FadeInItem>

          <FadeInItem className="flex justify-center pt-4">
            <Link
              href="/curriculo.pdf"
              download={dictionary.common.resumeDownloadFilename}
              className="btn-primary-glow group relative inline-flex items-center justify-center rounded-full bg-primary px-14 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/30"
            >
              <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              <Download className="mr-3 h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:scale-110" />
              <span className="relative z-10 tracking-wide">{dictionary.about.downloadResume}</span>
            </Link>
          </FadeInItem>
        </FadeInStagger>
      </div>

      <ScrollDownButton href="#como-trabalho" />
    </section>
  )
}
