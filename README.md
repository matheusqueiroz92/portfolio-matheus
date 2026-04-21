# Portfólio — Matheus Queiroz

Aplicação de portfólio pessoal com blog técnico e vitrine de projetos, construída com Next.js 15 e React 19.

## Visão geral

O projeto entrega:

- Página inicial com seções institucionais (hero, sobre, áreas de atuação, tecnologias, projetos e contato)
- Listagem e páginas individuais de posts em `/blog` e `/blog/[slug]`
- Listagem e páginas individuais de projetos em `/projects` e `/projects/[slug]`
- Conteúdo em MDX carregado de `src/content/posts` e `src/content/projects`
- Formulário de contato com envio via EmailJS

## Stack principal

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui + Radix UI
- framer-motion
- next-mdx-remote + gray-matter (conteúdo MDX)
- Vercel (deploy)

## Requisitos

- Node.js 20+
- pnpm

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores:

```bash
cp .env.example .env.local
```

Variáveis utilizadas:

- `NEXT_PUBLIC_SITE_URL` (URL pública do site)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Como rodar localmente

```bash
pnpm install
pnpm dev
```

App em desenvolvimento: [http://localhost:3000](http://localhost:3000)

## Scripts disponíveis

```bash
pnpm dev         # ambiente de desenvolvimento
pnpm build       # build de produção
pnpm start       # inicia app em produção
pnpm lint        # lint com Next.js
pnpm typecheck   # checagem de tipos (tsc --noEmit)
pnpm devsafe     # limpa .next e sobe o dev server
```

## Estrutura resumida

```text
src/
├── app/                    # rotas da aplicação (home, blog, projetos)
├── components/             # layout, seções e componentes de UI
├── content/
│   ├── posts/              # posts em MDX
│   └── projects/           # projetos em MDX
├── constants/              # conteúdo estático da home
├── lib/content.ts          # loader/normalizador de conteúdo MDX
└── types/                  # tipos compartilhados da aplicação
```

## Deploy

O deploy é preparado para Vercel com:

- `framework: nextjs`
- build com `pnpm build`
- região padrão `gru1`
- headers de segurança e cache configurados em `vercel.json`
