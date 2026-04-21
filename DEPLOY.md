# Deploy — Portfólio Matheus Queiroz

Este projeto é hospedado na **Vercel** com CI/CD via **GitHub Actions**.
O Docker cobre apenas desenvolvimento local e verificação de build no CI.

---

## 1. Desenvolvimento local (opcional, com Docker)

```bash
# Hot reload — código montado via volume
docker compose up web-dev

# Testar a imagem de produção localmente
docker compose up --build web-prod
```

Ambos sobem em <http://localhost:3000>.

Sem Docker, funciona exatamente como antes:

```bash
pnpm install
pnpm dev
```

---

## 2. Primeiro deploy na Vercel (uma vez só)

1. Acesse <https://vercel.com/signup> e entre com a conta do GitHub.
2. Clique em **Add New → Project** e importe o repositório.
3. Na tela de configuração inicial:
   - Framework: **Next.js** (detectado automaticamente)
   - Install command: `pnpm install --frozen-lockfile`
   - Build command: `pnpm build`
   - Root directory: `./`
4. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SITE_URL` = `https://matheusqueiroz.dev.br`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
5. Clique em **Deploy** — a primeira versão sobe em uma URL `*.vercel.app`.

---

## 3. Configurar o domínio customizado

### 3.1. Na Vercel

1. No projeto → **Settings → Domains**.
2. Adicione `matheusqueiroz.dev.br` e `www.matheusqueiroz.dev.br`.
3. A Vercel vai te dizer os registros DNS necessários.

### 3.2. Na Cloudflare

Remova os dois registros A antigos que apontam para a VPS (`147.79.107.246`)
e crie os novos:

| Tipo  | Nome | Conteúdo                  | Proxy         | TTL  |
| ----- | ---- | ------------------------- | ------------- | ---- |
| A     | @    | `76.76.21.21`             | **Somente DNS** | Auto |
| CNAME | www  | `cname.vercel-dns.com`    | **Somente DNS** | Auto |

> ⚠️ **Mantenha "Somente DNS" (nuvem cinza)**, nunca o proxy laranja.
> A Vercel já tem edge CDN global — duplo proxy quebra HTTPS e headers.

Em alguns minutos a Vercel emite o certificado SSL automaticamente e o
domínio fica ativo.

---

## 4. CI/CD contínuo (push → deploy)

### 4.1. Gerar um token de deploy da Vercel

1. Acesse <https://vercel.com/account/tokens>.
2. Crie um token com escopo no time correto, sem expiração (ou 1 ano).
3. Copie o token — você não conseguirá vê-lo de novo.

### 4.2. Descobrir os IDs do projeto

Rode uma vez localmente:

```bash
npx vercel link                 # cria .vercel/project.json
cat .vercel/project.json        # mostra orgId e projectId
```

### 4.3. Adicionar os secrets no GitHub

Em `Settings → Secrets and variables → Actions → New repository secret`:

| Secret              | Valor                         |
| ------------------- | ----------------------------- |
| `VERCEL_TOKEN`      | Token da seção 4.1            |
| `VERCEL_ORG_ID`     | `orgId` do `.vercel/project.json`     |
| `VERCEL_PROJECT_ID` | `projectId` do `.vercel/project.json` |

### 4.4. Como o pipeline funciona

- **`.github/workflows/ci.yml`** roda em todo push e PR:
  `pnpm lint` → `pnpm typecheck` → `pnpm build` → build da imagem Docker.
- **`.github/workflows/deploy.yml`**:
  - PR aberto → deploy de **preview** (URL única por PR).
  - Push em `main` → espera o CI terminar → deploy em **produção**.

Daí em diante, todo `git push origin main` dispara: CI verde → deploy
automático → site atualizado em <https://matheusqueiroz.dev.br>.

---

## 5. Rollback rápido

Em qualquer deploy anterior listado no dashboard da Vercel, clicar em
**⋯ → Promote to Production** reverte o site para aquela versão em segundos.
