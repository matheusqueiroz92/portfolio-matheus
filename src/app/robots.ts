/**
 * Este arquivo define as regras para o arquivo robots.txt da aplicação Next.js.
 * O robots.txt é utilizado por rastreadores (robots) de mecanismos de busca para saberem
 * quais páginas do site eles podem acessar ou não.
 *
 * Nesta configuração, todos os user-agents (rastreador de busca) têm permissão para acessar todo o site ('/').
 * Também informa ao rastreador o endereço do sitemap, que auxilia os buscadores a encontrarem todas as páginas do site.
 */

import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
