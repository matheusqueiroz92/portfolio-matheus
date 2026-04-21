/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Gera um server self-contained em .next/standalone com só as deps realmente
  // usadas em runtime. Essencial para a imagem Docker ficar pequena e para
  // `next start` rodar fora do node_modules completo.
  images: {
    // Adicione aqui domínios remotos caso você passe a usar imagens externas
    // (ex.: CDN do Cloudflare Images). Vazio por padrão — suas imagens hoje
    // ficam em /public.
    remotePatterns: [],
  },
}

export default nextConfig
