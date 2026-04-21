import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { MdxContent } from "@/components/mdx";
import { Badge } from "@/components/ui/badge";
import { getAllPostSlugs, getPostBySlug } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function normalizeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).normalize("NFC");
  } catch {
    return slug;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(normalizeSlug(slug));
  if (!post) return { title: "Post não encontrado" };
  return {
    title: `${post.title} | Blog | Matheus Queiroz`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      ...(post.coverImage?.url && {
        images: [
          { url: post.coverImage.url, alt: post.coverImage.alt ?? post.title },
        ],
      }),
    },
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(normalizeSlug(slug));

  if (!post) notFound();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />

      <main className="relative pt-28 pb-24">
        {/* Backdrop editorial sutil. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 0%, var(--background-gradient-start) 0%, transparent 70%)",
          }}
        />

        <article className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao blog
            </Link>

            <header className="space-y-4 mb-10">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                <time dateTime={post.publishedDate}>
                  {new Date(post.publishedDate).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                {post.readingTimeMinutes ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {post.readingTimeMinutes} min de leitura
                  </span>
                ) : null}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-border/70 bg-background/60 text-foreground/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {post.coverImage?.url && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/60 mb-10">
                <Image
                  src={post.coverImage.url}
                  alt={post.coverImage.alt ?? post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            )}

            <div className="mdx-prose max-w-none">
              <MdxContent source={post.content} />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
