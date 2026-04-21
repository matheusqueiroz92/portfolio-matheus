# Portfólio — Matheus Queiroz

Site pessoal e blog técnico. Construído com Next.js 15 (App Router) + React 19 + Tailwind CSS v4 + shadcn/ui.

## Stack

- **Next.js 15** (App Router, Server Components)
- **React 19**
- **Tailwind CSS v4** com shadcn/ui
- **TypeScript** strict
- Conteúdo por **MDX** (em breve — Sprint 2)
- Deploy previsto: **Vercel** · domínio `matheusqueiroz.dev.br`

## Como rodar localmente

```bash
pnpm install
cp .env.example .env   # ajuste se necessário
pnpm dev               # http://localhost:3000
```

Outros comandos:

```bash
pnpm build       # build de produção
pnpm start       # servidor de produção
pnpm lint        # eslint
pnpm typecheck   # tsc --noEmit
pnpm test:e2e    # playwright
```

## Estrutura

```
src/
├── app/(frontend)/    # rotas públicas (home, blog, projetos)
├── components/        # layout, sections, UI (shadcn)
├── constants/         # dados estáticos da home
├── hooks/             # hooks de animação e tema
├── lib/content.ts     # loader de conteúdo (MDX na Sprint 2)
└── types/             # tipos compartilhados
```

## Roadmap

1. ✅ Remoção do Payload CMS.
2. Migração para conteúdo em MDX (`src/content/**`).
3. Redesign de identidade visual.
4. Animações 3D, parallax, scroll-triggered reveals.
5. Deploy em Vercel com domínio final.
