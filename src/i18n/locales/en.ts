import type { Dictionary } from '@/i18n/types'

export const en: Dictionary = {
  common: {
    skipToContent: 'Skip to main content',
    backTo: 'Back to',
    scrollDown: 'Scroll to next section',
    scrollTop: 'Back to top',
    featured: 'Featured',
    resumeDownloadFilename: 'resume-matheus-queiroz.pdf',
  },
  header: {
    homeAriaLabel: 'Go to homepage',
    mainNav: 'Main navigation',
    mobileNav: 'Main navigation (mobile)',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    logoAltLight: 'Matheus Queiroz logo - Dark theme',
    logoAltDark: 'Matheus Queiroz logo - Light theme',
  },
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    blog: 'Blog',
  },
  social: {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    instagram: 'Instagram',
    resume: 'Resume',
  },
  language: {
    label: 'PT/EN',
    switchToEnglish: 'Switch to English',
    switchToPortuguese: 'Switch to Portuguese',
  },
  theme: {
    label: 'Theme',
    light: 'Light',
    dark: 'Dark',
    toggle: 'Toggle theme',
  },
  seo: {
    site: {
      title: 'Matheus Queiroz — Fullstack Developer',
      description:
        'Portfolio of Matheus Queiroz, a Fullstack developer specialized in React, Next.js, Node.js, and AI-powered solutions.',
      keywords: [
        'Matheus Queiroz',
        'Fullstack Developer',
        'React',
        'Next.js',
        'Node.js',
        'Portfolio',
      ],
      ogImageAlt: 'Matheus Queiroz — Fullstack Developer',
      jobTitle: 'Fullstack Developer',
    },
    blog: {
      title: 'Blog | Matheus Queiroz',
      description:
        'Articles on fullstack development, applied AI, software architecture, and behind-the-scenes of the projects I build.',
      postTitle: (title) => `${title} | Blog | Matheus Queiroz`,
      postNotFound: 'Post not found',
    },
    projects: {
      title: 'Projects | Matheus Queiroz',
      description:
        'A selection of projects I have built — fullstack platforms, AI products, and custom solutions for clients and companies.',
      projectTitle: (title) => `${title} | Projects | Matheus Queiroz`,
      projectNotFound: 'Project not found',
    },
  },
  site: {
    availabilityBadge: 'Open to opportunities and fullstack projects',
    footerTagline:
      'Fullstack developer focused on architecture, product, and end-to-end delivery.',
    heroSubtitle:
      'Fullstack developer combining 10 years of experience, AI, and automation to build high-performance web platforms that scale businesses.',
    heroTitlePrefix: 'Turning ideas',
    heroTitleMiddle: 'into',
    heroPhrases: [
      'Retail ERP',
      'AI Automation',
      'Scalable Applications',
      'Digital Ecosystems',
    ],
    heroBadges: [
      { title: 'Fullstack Dev.', description: 'Fullstack Developer' },
      { title: 'Software Eng.' },
      { title: 'Comp. Eng.' },
    ],
    stats: [
      { value: '10', label: 'Years of Experience' },
      { value: '+30', label: 'Projects Delivered' },
      { value: '+15', label: 'Clients Served' },
    ],
  },
  hero: {
    contactCta: 'Get in Touch',
    viewProjectsCta: 'View Projects',
  },
  about: {
    eyebrow: 'Who I am',
    title: 'About Me',
    subtitle:
      'Learn more about my professional journey, academic background, and the passion that drives my work.',
    trajectory: 'Journey',
    trajectoryText:
      'With nearly a decade of experience at the forefront of technology, my path is marked by autonomy and entrepreneurship. As Co-Founder and Lead Developer at AZ Work Center, I have spent years turning business needs into robust, scalable, high-value digital solutions.',
    education: 'Education & technical vision',
    educationText1:
      'I hold a degree in Computer Engineering and a specialization in Software Engineering. This academic foundation, combined with running my own technical operation, gave me a 360° view of a product—from architecture and stack choices to final delivery and client success.',
    educationText2:
      'Unlike a conventional role, my entrepreneurial experience taught me to align technical decisions with financial and strategic goals. Today, I focus on leading fullstack application development that solves real problems for companies across different industries.',
    motivation: 'What drives me',
    motivationText:
      'Beyond technology, my greatest motivation is my family and my son Noah, who push me to pursue excellence and innovation in every line of code I write.',
    downloadResume: 'Download Resume',
  },
  howIWork: {
    eyebrow: 'Methodology',
    title: 'How I Work',
    subtitle:
      'A structured approach to turning business requirements into reliable, scalable software delivered with predictability.',
    pillars: [
      {
        title: 'Business understanding',
        description:
          'I align problem, user, and success metrics before writing code. Technical decisions start from real business impact.',
      },
      {
        title: 'Architecture before code',
        description:
          'Monorepo, TypeScript, shared validation, and documented decisions. I structure for scale without rework.',
      },
      {
        title: 'Iterative delivery',
        description:
          'Functional MVP, continuous feedback, and CI as a quality gate. Frequent releases on a solid foundation.',
      },
      {
        title: 'End-to-end ownership',
        description:
          'From API design to deployment and monitoring. I take full responsibility for the product lifecycle.',
      },
    ],
  },
  practiceAreas: {
    eyebrow: 'Services',
    title: 'Practice Areas',
    subtitle: 'From architecture to deployment—complete solutions to scale your digital business.',
    featuredBadge: 'Featured',
    services: [
      {
        title: 'Fullstack Development',
        description:
          'Architecture and end-to-end web application development. Focus on high-performance interfaces (Frontend) integrated with robust, secure, and scalable systems (Backend).',
        featured: true,
      },
      {
        title: 'Technical & Strategic Consulting',
        description:
          'Supporting companies in technology decisions, stack definition, project feasibility, and legacy infrastructure modernization for efficiency gains.',
      },
      {
        title: 'Product Engineering',
        description:
          'Turning ideas and business rules into custom systems. Focus on UX/UI and process automation to optimize operations and create competitive advantage.',
      },
      {
        title: 'AI & Process Automation',
        description:
          'Implementing Artificial Intelligence and LLMs to optimize workflows. Building intelligent agents and custom automations that reduce operational costs and scale business productivity.',
      },
    ],
  },
  technologies: {
    eyebrow: 'Stack',
    title: 'Tech Stack',
    subtitle:
      'Tools and frameworks I use to build robust solutions, from architecture design to scalable deployment.',
  },
  projects: {
    eyebrow: 'Portfolio',
    title: 'My Projects',
    subtitle:
      'Some of the main projects I have built for clients and companies. Scroll to explore them.',
    featuredCase: 'Featured case study',
    viewCase: 'View case',
    viewFullCase: 'View full case study',
    openDemo: 'Open demo',
    viewAll: 'View All Projects',
    emptyState: 'New projects coming soon.',
    yearScaleAria: 'Project year and scale',
    viewCaseAria: (title) => `View case study: ${title}`,
    openDemoAria: (title) => `Open demo for ${title}`,
    openRepoAria: (title) => `Open repository for ${title}`,
    flagshipHighlights: [
      'Turborepo monorepo with API, dashboard, and shared package',
      'Production ERP for a multi-branch retail network',
      'Unified inventory, sales, and optical lab control',
    ],
    beltAria: 'Scroll-driven project showcase',
    beltProgressAria: 'Project showcase progress',
  },
  contact: {
    eyebrow: "Let's talk",
    title: 'Contact',
    subtitle:
      'Feel free to send me a message about projects, partnerships, or professional opportunities. I would love to hear from you!',
    panelTitle: 'Get in touch',
    formTitle: "Let's build something together?",
    formSubtitle: 'Tell me about your idea and let us turn it into reality.',
    nameLabel: 'Name',
    namePlaceholder: 'Your full name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@email.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Briefly describe your project or idea...',
    submit: 'Send message',
    submitting: 'Sending...',
    success: 'Message sent successfully! I will get back to you soon.',
    errorTitle: 'Failed to send message',
    genericError: 'Failed to send message. Please try again later.',
    whatsapp: 'WhatsApp',
    validation: {
      nameMin: 'Name must be at least 2 characters',
      nameMax: 'Name must be at most 100 characters',
      emailInvalid: 'Invalid email',
      messageMin: 'Message must be at least 10 characters',
      messageMax: 'Message must be at most 1000 characters',
    },
  },
  chatbot: {
    open: 'Open virtual assistant',
    close: 'Close virtual assistant',
    title: 'Matheus Assistant',
    subtitle: 'Ask about projects, experience, and technologies',
    welcome:
      'Hi! I am Matheus assistant. I can answer questions about projects, stack, background, and availability.',
    placeholder: 'Type your question…',
    send: 'Send',
    searching: 'Searching documents…',
    generating: 'Generating response…',
    limitReached: 'You reached the message limit for this session. Contact me by email or phone:',
    rateLimited: 'Too many requests. Please wait a moment and try again.',
    genericError: 'Could not get a response. Please try again.',
    suggestions: [
      'What technologies do you work with?',
      'Tell me about your projects',
      'Are you available for freelance work?',
    ],
  },
  footer: {
    heading: 'Footer',
    homeAriaLabel: 'Go to homepage',
    logoAlt: 'Matheus Queiroz logo',
    socialAria: 'Social media',
    quickLinks: 'Quick Links',
    services: 'Services',
    copyright: (year) => `© ${year} Matheus Queiroz. All rights reserved.`,
    builtWith: 'Built with',
    serviceLinks: {
      fullstack: 'Fullstack Development',
      ai: 'AI Solutions',
      consulting: 'Consulting',
      maintenance: 'Maintenance & Evolution',
    },
  },
  content: {
    clearSearch: 'Clear search',
    paginationAria: 'Pagination',
    previous: 'Previous',
    next: 'Next',
    goToPage: (page) => `Go to page ${page}`,
    noResultsFor: (query) => `No results for “${query}”`,
    resultsFound: (count, items, query) => `${count} ${items} found for “${query}”`,
    totalCount: (count, items) => `${count} ${items}`,
  },
  pages: {
    blog: {
      eyebrow: 'Blog',
      title: 'Notes & behind the scenes',
      subtitle:
        'Articles on fullstack development, applied AI, architecture, and lessons learned building real software.',
      featured: 'Featured',
      readArticle: 'Read article',
      readAria: (title) => `Read: ${title}`,
      emptyTitle: 'No posts here yet',
      emptyDescription: 'The first reads will show up soon. Check back shortly.',
      noResultsTitle: 'No posts found',
      noResultsDescription: 'Try another search term or clear the filter to see all articles.',
      searchPlaceholder: 'Search by title, excerpt, or tag…',
      item: 'post',
      items: 'posts',
      backToBlog: 'Back to blog',
      readingTime: (minutes) => `${minutes} min read`,
      postNotFound: 'Post not found',
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'All projects',
      subtitle:
        'A selection of products and platforms I have built—from MVP to production deployment, with a focus on solid architecture and user experience.',
      emptyTitle: 'No projects published yet',
      emptyDescription: 'The first case studies will appear here soon. Check back later.',
      noResultsTitle: 'No projects found',
      noResultsDescription: 'Try another search term or clear the filter to see all projects.',
      searchPlaceholder: 'Search by title, technology, or tag…',
      item: 'project',
      items: 'projects',
      backToProjects: 'Back to projects',
      technologies: 'Technologies',
      viewDemo: 'View project (demo)',
      repository: 'Repository',
      projectNotFound: 'Project not found',
    },
  },
}
