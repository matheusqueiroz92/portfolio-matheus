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
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
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

| Variável                           | Obrigatória | Descrição                              |
| ---------------------------------- | ----------- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`             | Sim         | URL pública (metadata, OG, sitemap)    |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`   | Sim         | Serviço EmailJS para o formulário      |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`  | Sim         | Template EmailJS                       |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`   | Sim         | Public key EmailJS                     |
