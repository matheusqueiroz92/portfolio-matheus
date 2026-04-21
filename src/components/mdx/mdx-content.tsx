/**
 * MDX Content Renderer
 *
 * Server Component. Recebe uma string MDX (o `content` que vem do
 * `src/lib/content.ts`) e renderiza HTML já com:
 *
 *   - Syntax highlighting via `rehype-pretty-code` + Shiki (tema duplo
 *     light/dark, títulos/linhas realçadas via sintaxe `[!code highlight]`).
 *   - Headings com id automático (`rehype-slug`) e link âncora
 *     (`rehype-autolink-headings`).
 *   - GitHub Flavored Markdown (tabelas, checklists, strikethrough) via
 *     `remark-gfm`.
 *
 * Uso:
 *   <MdxContent source={post.content} />
 */

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "./mdx-components";

const prettyCodeOptions: PrettyCodeOptions = {
  // Tema duplo: Shiki aplica dois conjuntos de variáveis CSS e usamos o
  // `globals.css` pra alternar conforme o `class="dark"` no <html>.
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed",
  },
  keepBackground: false,
  defaultLang: "plaintext",
  // Mantém linhas vazias visíveis dentro do bloco (evita colapso).
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = [
      ...(node.properties.className ?? []),
      "line--highlighted",
    ];
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["chars--highlighted"];
  },
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "append",
                properties: {
                  className: ["heading-anchor"],
                  ariaLabel: "Link para este tópico",
                },
              },
            ],
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
}
