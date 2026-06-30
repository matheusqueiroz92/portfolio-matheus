import type { Dictionary } from '@/i18n/types'

export const ptBR: Dictionary = {
  common: {
    skipToContent: 'Pular para o conteúdo principal',
    backTo: 'Voltar para',
    scrollDown: 'Rolar para a próxima seção',
    scrollTop: 'Voltar ao topo da página',
    featured: 'Principal',
    resumeDownloadFilename: 'curriculo-matheus-queiroz.pdf',
  },
  header: {
    homeAriaLabel: 'Ir para a página inicial',
    mainNav: 'Navegação principal',
    mobileNav: 'Navegação principal (móvel)',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    logoAltLight: 'Logo Matheus Queiroz - Tema Escuro',
    logoAltDark: 'Logo Matheus Queiroz - Tema Claro',
  },
  nav: {
    home: 'Início',
    about: 'Sobre',
    projects: 'Projetos',
    contact: 'Contato',
    blog: 'Blog',
  },
  social: {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    instagram: 'Instagram',
    resume: 'Currículo',
  },
  language: {
    label: 'PT/EN',
    switchToEnglish: 'Mudar para inglês',
    switchToPortuguese: 'Mudar para português',
  },
  theme: {
    label: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    toggle: 'Alternar tema',
  },
  seo: {
    site: {
      title: 'Matheus Queiroz — Desenvolvedor Fullstack',
      description:
        'Portfólio de Matheus Queiroz, desenvolvedor Fullstack especializado em React, Next.js, Node.js e soluções com IA.',
      keywords: [
        'Matheus Queiroz',
        'Desenvolvedor Fullstack',
        'React',
        'Next.js',
        'Node.js',
        'Portfólio',
      ],
      ogImageAlt: 'Matheus Queiroz — Desenvolvedor Fullstack',
      jobTitle: 'Desenvolvedor Fullstack',
    },
    blog: {
      title: 'Blog | Matheus Queiroz',
      description:
        'Artigos sobre desenvolvimento fullstack, IA aplicada, arquitetura de software e os bastidores dos projetos que construo.',
      postTitle: (title) => `${title} | Blog | Matheus Queiroz`,
      postNotFound: 'Post não encontrado',
    },
    projects: {
      title: 'Projetos | Matheus Queiroz',
      description:
        'Uma seleção dos projetos que desenvolvi — plataformas fullstack, produtos com IA e soluções sob medida para clientes e empresas.',
      projectTitle: (title) => `${title} | Projetos | Matheus Queiroz`,
      projectNotFound: 'Projeto não encontrado',
    },
  },
  site: {
    availabilityBadge: 'Aberto a oportunidades e projetos fullstack',
    footerTagline:
      'Desenvolvedor Fullstack com foco em arquitetura, produto e entrega ponta a ponta.',
    heroSubtitle:
      'Desenvolvedor Fullstack unindo 10 anos de experiência, IA e automação para criar plataformas web de alta performance que escalam negócios.',
    heroTitlePrefix: 'Transformando ideias',
    heroTitleMiddle: 'em',
    heroPhrases: [
      'ERP para Varejo',
      'Automação com IA',
      'Aplicações Escaláveis',
      'Ecossistemas Digitais',
    ],
    heroBadges: [
      { title: 'Dev. Fullstack', description: 'Desenvolvedor Fullstack' },
      { title: 'Eng. Software' },
      { title: 'Eng. Computação' },
    ],
    stats: [
      { value: '10', label: 'Anos de Experiência' },
      { value: '+30', label: 'Projetos Desenvolvidos' },
      { value: '+15', label: 'Clientes Atendidos' },
    ],
  },
  hero: {
    contactCta: 'Entre em Contato',
    viewProjectsCta: 'Ver Projetos',
  },
  about: {
    eyebrow: 'Quem sou',
    title: 'Sobre Mim',
    subtitle:
      'Saiba mais sobre minha trajetória profissional, minha formação acadêmica e a paixão que impulsiona meu trabalho.',
    trajectory: 'Trajetória',
    trajectoryText:
      'Com quase uma década de experiência na vanguarda da tecnologia, minha trajetória é marcada pela autonomia e pelo empreendedorismo. Como Sócio-Fundador e Desenvolvedor Lead na AZ Work Center, atuo há anos transformando necessidades de negócio em soluções digitais robustas, escaláveis e de alto valor agregado.',
    education: 'Formação & visão técnica',
    educationText1:
      'Sou graduado em Engenharia da Computação e especialista em Engenharia de Software. Essa base acadêmica, aliada à experiência de gerir minha própria operação técnica, me permitiu desenvolver uma visão 360º de um produto: desde a arquitetura e escolha da stack até a entrega final e o sucesso do cliente.',
    educationText2:
      'Diferente de uma atuação convencional, minha vivência como empreendedor me deu a habilidade de alinhar decisões técnicas a objetivos financeiros e estratégicos. Atualmente, foco em liderar o desenvolvimento de aplicações fullstack que resolvem problemas reais para empresas de diversos nichos.',
    motivation: 'O que me move',
    motivationText:
      'Além da tecnologia, minha maior motivação é minha família e meu filho Noah, que impulsionam minha busca constante por excelência e inovação em cada linha de código que escrevo.',
    downloadResume: 'Baixar Currículo',
  },
  howIWork: {
    eyebrow: 'Metodologia',
    title: 'Como Trabalho',
    subtitle:
      'Uma abordagem estruturada para transformar requisitos de negócio em software confiável, escalável e entregue com previsibilidade.',
    pillars: [
      {
        title: 'Entendimento do negócio',
        description:
          'Alinho problema, usuário e métrica de sucesso antes de codar. Decisões técnicas partem do impacto real no negócio.',
      },
      {
        title: 'Arquitetura antes de código',
        description:
          'Monorepo, TypeScript, validação compartilhada e decisões documentadas. Estruturo para escalar sem retrabalho.',
      },
      {
        title: 'Entrega iterativa',
        description:
          'MVP funcional, feedback contínuo e CI como gate de qualidade. Entregas frequentes com base sólida.',
      },
      {
        title: 'Ownership ponta a ponta',
        description:
          'Do design da API ao deploy e monitoramento. Assumo a responsabilidade completa pelo ciclo de vida do produto.',
      },
    ],
  },
  practiceAreas: {
    eyebrow: 'Serviços',
    title: 'Áreas de Atuação',
    subtitle: 'Da arquitetura ao deploy — soluções completas para escalar seu negócio digital.',
    featuredBadge: 'Principal',
    services: [
      {
        title: 'Desenvolvimento Fullstack',
        description:
          'Arquitetura e desenvolvimento de aplicações web de ponta a ponta. Foco em criar interfaces de alta performance (Frontend) integradas a sistemas robustos, seguros e escaláveis (Backend).',
        featured: true,
      },
      {
        title: 'Consultoria Técnica e Estratégica',
        description:
          'Apoio a empresas na tomada de decisões tecnológicas, definição de stacks, viabilidade de projetos e modernização de infraestruturas legadas para ganho de eficiência.',
      },
      {
        title: 'Engenharia de Produto',
        description:
          'Transformação de ideias e regras de negócio em sistemas personalizados. Foco em UX/UI e automação de processos para otimizar operações e gerar vantagem competitiva.',
      },
      {
        title: 'IA & Automação de Processos',
        description:
          'Implementação de Inteligência Artificial e LLMs para otimização de fluxos de trabalho. Desenvolvimento de agentes inteligentes e automações personalizadas que reduzem custos operacionais e escalam a produtividade do negócio.',
      },
    ],
  },
  technologies: {
    eyebrow: 'Stack',
    title: 'Stack Tecnológico',
    subtitle:
      'Ferramentas e frameworks que utilizo para construir soluções robustas, do design da arquitetura ao deploy escalável.',
  },
  projects: {
    eyebrow: 'Portfólio',
    title: 'Meus Projetos',
    subtitle:
      'Alguns dos principais projetos que desenvolvi para clientes e empresas.\n Role para explorá-los.',
    featuredCase: 'Case em destaque',
    viewCase: 'Ver case',
    viewFullCase: 'Ver case completo',
    openDemo: 'Abrir demo',
    viewAll: 'Ver Todos os Projetos',
    emptyState: 'Em breve novos projetos por aqui.',
    yearScaleAria: 'Ano e escala do projeto',
    viewCaseAria: (title) => `Ver case: ${title}`,
    openDemoAria: (title) => `Abrir demo de ${title}`,
    openRepoAria: (title) => `Abrir repositório de ${title}`,
    flagshipHighlights: [
      'Monorepo Turborepo com API, painel e pacote compartilhado',
      'ERP em produção para rede multi-filial',
      'Controle de estoque, vendas e laboratório ótico unificados',
    ],
    beltAria: 'Esteira de projetos controlada por rolagem',
    beltProgressAria: 'Progresso na esteira de projetos',
  },
  contact: {
    eyebrow: 'Vamos conversar',
    title: 'Contato',
    subtitle:
      'Fique à vontade para me enviar uma mensagem sobre projetos, parcerias ou oportunidades profissionais. Será um prazer conversar com você!',
    panelTitle: 'Entre em contato',
    formTitle: 'Vamos construir algo juntos?',
    formSubtitle: 'Conte-me sobre sua ideia e vamos transformá-la em realidade.',
    nameLabel: 'Nome',
    namePlaceholder: 'Seu nome completo',
    emailLabel: 'Email',
    emailPlaceholder: 'seu@email.com',
    messageLabel: 'Mensagem',
    messagePlaceholder: 'Descreva brevemente seu projeto ou ideia...',
    submit: 'Enviar mensagem',
    submitting: 'Enviando...',
    success: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
    errorTitle: 'Erro ao enviar mensagem',
    genericError: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
    whatsapp: 'WhatsApp',
    validation: {
      nameMin: 'O nome deve ter pelo menos 2 caracteres',
      nameMax: 'O nome deve ter no máximo 100 caracteres',
      emailInvalid: 'Email inválido',
      messageMin: 'A mensagem deve ter pelo menos 10 caracteres',
      messageMax: 'A mensagem deve ter no máximo 1000 caracteres',
    },
  },
  chatbot: {
    open: 'Abrir assistente virtual',
    close: 'Fechar assistente virtual',
    title: 'Assistente Matheus',
    subtitle: 'Pergunte sobre projetos, experiência e tecnologias',
    welcome:
      'Olá! Sou o assistente do Matheus. Posso responder sobre projetos, stack, trajetória e disponibilidade.',
    placeholder: 'Digite sua pergunta…',
    send: 'Enviar',
    searching: 'Buscando nos documentos…',
    generating: 'Gerando resposta…',
    limitReached: 'Você atingiu o limite de mensagens desta sessão. Entre em contato comigo pelo e-mail ou telefone:',
    rateLimited: 'Muitas requisições. Aguarde um momento e tente novamente.',
    genericError: 'Não foi possível obter uma resposta. Tente novamente.',
    suggestions: [
      'Quais tecnologias você domina?',
      'Me conte sobre seus projetos',
      'Você está disponível para freelas?',
    ],
  },
  footer: {
    heading: 'Rodapé',
    homeAriaLabel: 'Ir para a página inicial',
    logoAlt: 'Logo Matheus Queiroz',
    socialAria: 'Redes sociais',
    quickLinks: 'Links Rápidos',
    services: 'Serviços',
    copyright: (year) => `© ${year} Matheus Queiroz. Todos os direitos reservados.`,
    builtWith: 'Construído com',
    serviceLinks: {
      fullstack: 'Desenvolvimento Fullstack',
      ai: 'Soluções com IA',
      consulting: 'Consultoria',
      maintenance: 'Manutenção & Evolução',
    },
  },
  content: {
    clearSearch: 'Limpar busca',
    paginationAria: 'Paginação',
    previous: 'Anterior',
    next: 'Próxima',
    goToPage: (page) => `Ir para página ${page}`,
    noResultsFor: (query) => `Nenhum resultado para “${query}”`,
    resultsFound: (count, items, query) =>
      `${count} ${items} encontrado${count === 1 ? '' : 's'} para “${query}”`,
    totalCount: (count, items) => `${count} ${items}`,
  },
  pages: {
    blog: {
      eyebrow: 'Blog',
      title: 'Notas & bastidores',
      subtitle:
        'Artigos sobre desenvolvimento fullstack, IA aplicada, arquitetura e os aprendizados que colho construindo software de verdade.',
      featured: 'Em destaque',
      readArticle: 'Ler artigo',
      readAria: (title) => `Ler: ${title}`,
      emptyTitle: 'Nenhum post por aqui ainda',
      emptyDescription: 'Logo, logo começam a aparecer as primeiras leituras. Volte em breve.',
      noResultsTitle: 'Nenhum post encontrado',
      noResultsDescription:
        'Tente outro termo de busca ou limpe o filtro para ver todos os artigos.',
      searchPlaceholder: 'Buscar por título, resumo ou tag…',
      item: 'post',
      items: 'posts',
      backToBlog: 'Voltar ao blog',
      readingTime: (minutes) => `${minutes} min de leitura`,
      postNotFound: 'Post não encontrado',
    },
    projects: {
      eyebrow: 'Portfólio',
      title: 'Todos os projetos',
      subtitle:
        'Uma seleção dos produtos e plataformas que construí — do MVP ao deploy em produção, com foco em arquitetura sólida e experiência de uso.',
      emptyTitle: 'Nenhum projeto publicado ainda',
      emptyDescription: 'Em breve os primeiros cases aparecem por aqui. Volte depois.',
      noResultsTitle: 'Nenhum projeto encontrado',
      noResultsDescription:
        'Tente outro termo de busca ou limpe o filtro para ver todos os projetos.',
      searchPlaceholder: 'Buscar por título, tecnologia ou tag…',
      item: 'projeto',
      items: 'projetos',
      backToProjects: 'Voltar aos projetos',
      technologies: 'Tecnologias',
      viewDemo: 'Ver projeto (demo)',
      repository: 'Repositório',
      projectNotFound: 'Projeto não encontrado',
    },
  },
}
