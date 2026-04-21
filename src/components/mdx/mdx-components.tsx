/**
 * Componentes customizados usados na renderização de MDX.
 *
 * Cada elemento do MDX (h1, h2, a, img, code, pre, blockquote etc.) pode ser
 * substituído por um componente React próprio. Aqui definimos os estilos e o
 * comportamento que queremos para o conteúdo do blog e dos estudos de caso de
 * projeto.
 *
 * Observação: esses componentes rodam no server quando usados via
 * `next-mdx-remote/rsc` — portanto NÃO usar hooks (useState, useEffect) aqui.
 */

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------

function isExternalUrl(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}

// ---------------------------------------------------------------------------
// Link customizado — usa next/link para URLs internas
// ---------------------------------------------------------------------------

function MdxLink({
  href,
  children,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  if (!href) {
    return <a {...rest}>{children}</a>;
  }
  if (isExternalUrl(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
    >
      {children}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Imagem customizada — usa next/image se dimensões forem informadas
// ---------------------------------------------------------------------------

function MdxImage({
  src,
  alt,
  width,
  height,
}: ComponentPropsWithoutRef<"img">) {
  if (!src || typeof src !== "string") return null;

  const hasDimensions = typeof width === "number" && typeof height === "number";

  if (hasDimensions) {
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={width}
        height={height}
        className="my-8 rounded-xl border border-border/60"
      />
    );
  }

  // Fallback responsivo quando dimensões não vierem no MDX.
  return (
    <span className="relative my-8 block aspect-video w-full overflow-hidden rounded-xl border border-border/60">
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 768px"
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Callout — bloco de destaque reutilizável em MDX
//   <Callout tone="info">...</Callout>
// ---------------------------------------------------------------------------

type CalloutTone = "info" | "warning" | "success" | "note";

const CALLOUT_STYLES: Record<CalloutTone, string> = {
  info: "border-sky-500/30 bg-sky-500/5 text-sky-900 dark:text-sky-100",
  warning:
    "border-amber-500/30 bg-amber-500/5 text-amber-900 dark:text-amber-100",
  success:
    "border-emerald-500/30 bg-emerald-500/5 text-emerald-900 dark:text-emerald-100",
  note: "border-border/60 bg-muted/40 text-foreground",
};

const CALLOUT_LABEL: Record<CalloutTone, string> = {
  info: "Nota",
  warning: "Atenção",
  success: "Destaque",
  note: "Observação",
};

function Callout({
  tone = "note",
  title,
  children,
}: {
  tone?: CalloutTone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={`my-6 rounded-xl border p-4 text-sm leading-relaxed ${CALLOUT_STYLES[tone]}`}
      role="note"
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-80">
        {title ?? CALLOUT_LABEL[tone]}
      </p>
      <div className="[&>p:last-child]:mb-0">{children}</div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Mapa exportado para o MDXRemote
// ---------------------------------------------------------------------------

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
  // Componentes custom disponíveis dentro do MDX:
  Callout,
};
