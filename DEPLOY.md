# Deploy — Portfólio Matheus Queiroz

Este projeto é hospedado na **Vercel** com deploy automático via integração
nativa Vercel ↔ GitHub. Um workflow de CI (`.github/workflows/ci.yml`) roda
lint + typecheck + build em cada push/PR como camada extra de verificação.

---

## 1. Desenvolvimento local

```bash
pnpm install
pnpm dev                # http://localhost:3000
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
   - `RESEND_API_KEY` (API key do Resend — mantenha server-side, sem prefixo `NEXT_PUBLIC_`)
   - `RESEND_FROM_EMAIL` = `contato@matheusqueiroz.dev.br`
   - `RESEND_TO_EMAIL` = `gigamatheus@gmail.com`
5. Clique em **Deploy**. A primeira versão sobe em uma URL `*.vercel.app`.

---

## 3. Configurar o domínio customizado

### 3.1. Na Vercel

1. No projeto → **Settings → Domains**.
2. Adicione `matheusqueiroz.dev.br` e `www.matheusqueiroz.dev.br`.
3. A Vercel vai te dizer os registros DNS necessários.

### 3.2. Na Cloudflare

Remova os dois registros A antigos que apontam para a VPS (`147.79.107.246`)
e crie os novos:

| Tipo  | Nome | Conteúdo                  | Proxy           | TTL  |
| ----- | ---- | ------------------------- | --------------- | ---- |
| A     | @    | `76.76.21.21`             | **Somente DNS** | Auto |
| CNAME | www  | `cname.vercel-dns.com`    | **Somente DNS** | Auto |

> ⚠️ **Mantenha "Somente DNS" (nuvem cinza)**, nunca o proxy laranja.
> A Vercel já tem edge CDN global — duplo proxy quebra HTTPS e headers.

Em alguns minutos a Vercel emite o certificado SSL automaticamente e o
domínio fica ativo.

---

## 4. Como o deploy acontece a partir daqui

- **Push em `main`** → GitHub webhook aciona a Vercel → build → produção.
  Em paralelo, o workflow de CI roda como verificação independente.
- **Pull request aberto** → a Vercel cria uma URL de preview automaticamente
  e comenta no PR com o link.
- **Rollback** → no dashboard da Vercel, em qualquer deploy anterior clicar
  em **⋯ → Promote to Production** reverte o site em segundos.

---

## 5. Variáveis de ambiente

Defina no painel da Vercel em **Settings → Environment Variables**. Use
**Production**, **Preview** e **Development** conforme o escopo.

| Variável                | Obrigatória | Descrição                                            |
| ----------------------- | ----------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Sim         | URL pública (metadata, OG, sitemap)                  |
| `RESEND_API_KEY`        | Sim         | API key do Resend (server-side, sem `NEXT_PUBLIC_`)  |
| `RESEND_FROM_EMAIL`     | Sim         | Remetente no domínio verificado no Resend            |
| `RESEND_TO_EMAIL`       | Sim         | Caixa que recebe mensagens do formulário             |

---

## 6. Verificar o domínio no Resend

O Resend exige que o domínio usado no `from` esteja verificado antes de
liberar envio em produção.

1. Acesse <https://resend.com/domains> e clique em **Add Domain**.
2. Digite `matheusqueiroz.dev.br` e selecione a região (preferencialmente
   `sa-east-1`, São Paulo).
3. O Resend gera 3-4 registros DNS (um `TXT` de SPF, dois `CNAME` de DKIM e
   opcionalmente um `TXT` de DMARC).
4. Na Cloudflare, crie cada registro exatamente como o Resend mostrou,
   sempre em modo **Somente DNS** (nuvem cinza) — o proxy laranja impede a
   validação das chaves DKIM.
5. Volte no Resend e clique em **Verify**. A propagação costuma levar
   alguns minutos.
6. Com o domínio verificado, gere a API key em
   <https://resend.com/api-keys> e registre em `RESEND_API_KEY` na Vercel.

> Enquanto o domínio não estiver verificado, você pode testar com
> `RESEND_FROM_EMAIL=onboarding@resend.dev`, mas o Resend só entregará
> para o e-mail cadastrado na sua conta.
