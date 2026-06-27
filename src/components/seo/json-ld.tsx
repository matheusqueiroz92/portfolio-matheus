// Este arquivo serve para gerar e inserir uma tag <script> contendo dados estruturados (JSON-LD)
// sobre uma pessoa, facilitando o entendimento do conteúdo por mecanismos de busca.
// A função 'JsonLd' utiliza 'getPersonJsonLd' para obter os dados da pessoa e insere esse JSON
// na página usando a tag <script type="application/ld+json">, o que melhora SEO.

import { getPersonJsonLd } from '@/lib/metadata'

export function JsonLd() {
  const data = getPersonJsonLd()

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
