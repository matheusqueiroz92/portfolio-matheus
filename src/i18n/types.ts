export const LOCALES = ['pt-BR', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'pt-BR'

export interface Dictionary {
  common: {
    skipToContent: string
    backTo: string
    scrollDown: string
    scrollTop: string
    featured: string
    resumeDownloadFilename: string
  }
  header: {
    homeAriaLabel: string
    mainNav: string
    mobileNav: string
    openMenu: string
    closeMenu: string
    logoAltLight: string
    logoAltDark: string
  }
  nav: {
    home: string
    about: string
    projects: string
    contact: string
    blog: string
  }
  social: {
    linkedin: string
    github: string
    instagram: string
    resume: string
  }
  language: {
    label: string
    switchToEnglish: string
    switchToPortuguese: string
  }
  theme: {
    label: string
    light: string
    dark: string
    toggle: string
  }
  seo: {
    site: {
      title: string
      description: string
      keywords: readonly string[]
      ogImageAlt: string
      jobTitle: string
    }
    blog: {
      title: string
      description: string
      postTitle: (title: string) => string
      postNotFound: string
    }
    projects: {
      title: string
      description: string
      projectTitle: (title: string) => string
      projectNotFound: string
    }
  }
  site: {
    availabilityBadge: string
    footerTagline: string
    heroSubtitle: string
    heroTitlePrefix: string
    heroTitleMiddle: string
    heroPhrases: readonly string[]
    heroBadges: readonly { title: string; description?: string }[]
    stats: readonly { value: string; label: string }[]
  }
  hero: {
    contactCta: string
    viewProjectsCta: string
  }
  about: {
    eyebrow: string
    title: string
    subtitle: string
    trajectory: string
    trajectoryText: string
    education: string
    educationText1: string
    educationText2: string
    motivation: string
    motivationText: string
    downloadResume: string
  }
  howIWork: {
    eyebrow: string
    title: string
    subtitle: string
    pillars: readonly { title: string; description: string }[]
  }
  practiceAreas: {
    eyebrow: string
    title: string
    subtitle: string
    featuredBadge: string
    services: readonly { title: string; description: string; featured?: boolean }[]
  }
  technologies: {
    eyebrow: string
    title: string
    subtitle: string
  }
  projects: {
    eyebrow: string
    title: string
    subtitle: string
    featuredCase: string
    viewCase: string
    viewFullCase: string
    openDemo: string
    viewAll: string
    emptyState: string
    yearScaleAria: string
    viewCaseAria: (title: string) => string
    openDemoAria: (title: string) => string
    openRepoAria: (title: string) => string
    flagshipHighlights: readonly string[]
    beltAria: string
    beltProgressAria: string
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    panelTitle: string
    formTitle: string
    formSubtitle: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submit: string
    submitting: string
    success: string
    errorTitle: string
    genericError: string
    whatsapp: string
    validation: {
      nameMin: string
      nameMax: string
      emailInvalid: string
      messageMin: string
      messageMax: string
    }
  }
  chatbot: {
    open: string
    close: string
    title: string
    subtitle: string
    welcome: string
    placeholder: string
    send: string
    searching: string
    generating: string
    limitReached: string
    rateLimited: string
    genericError: string
    suggestions: readonly string[]
  }
  footer: {
    heading: string
    homeAriaLabel: string
    logoAlt: string
    socialAria: string
    quickLinks: string
    services: string
    copyright: (year: number) => string
    builtWith: string
    serviceLinks: {
      fullstack: string
      ai: string
      consulting: string
      maintenance: string
    }
  }
  content: {
    clearSearch: string
    paginationAria: string
    previous: string
    next: string
    goToPage: (page: number) => string
    noResultsFor: (query: string) => string
    resultsFound: (count: number, items: string, query: string) => string
    totalCount: (count: number, items: string) => string
  }
  pages: {
    blog: {
      eyebrow: string
      title: string
      subtitle: string
      featured: string
      readArticle: string
      readAria: (title: string) => string
      emptyTitle: string
      emptyDescription: string
      noResultsTitle: string
      noResultsDescription: string
      searchPlaceholder: string
      item: string
      items: string
      backToBlog: string
      readingTime: (minutes: number) => string
      postNotFound: string
    }
    projects: {
      eyebrow: string
      title: string
      subtitle: string
      emptyTitle: string
      emptyDescription: string
      noResultsTitle: string
      noResultsDescription: string
      searchPlaceholder: string
      item: string
      items: string
      backToProjects: string
      technologies: string
      viewDemo: string
      repository: string
      projectNotFound: string
    }
  }
}
