/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Adicione aqui domínios remotos caso você passe a usar imagens externas
    // (ex.: CDN do Cloudflare Images). Vazio por padrão — suas imagens hoje
    // ficam em /public.
    remotePatterns: [],
  },
}

export default nextConfig
