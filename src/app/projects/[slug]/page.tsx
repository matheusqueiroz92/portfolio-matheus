import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { MdxContent } from "@/components/mdx";
import { Badge } from "@/components/ui/badge";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";

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
  const project = await getProjectBySlug(normalizeSlug(slug));
  if (!project) return { title: "Projeto não encontrado" };
  return {
    title: `${project.title} | Projetos | Matheus Queiroz`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      ...(project.projectImage?.url && {
        images: [
          {
            url: project.projectImage.url,
            alt: project.projectImage.alt ?? project.title,
          },
        ],
      }),
    },
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(normalizeSlug(slug));

  if (!project) notFound();

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
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar aos projetos
            </Link>

            <header className="space-y-4 mb-10">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-border/70 bg-background/60 text-foreground/80"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {project.projectImage?.url && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/60 mb-10">
                <Image
                  src={project.projectImage.url}
                  alt={project.projectImage.alt ?? project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            )}

            <div className="mdx-prose max-w-none">
              {project.content ? (
                <MdxContent source={project.content} />
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-10">
                <h2 className="text-sm font-semibold text-foreground mb-3">
                  Tecnologias
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              {project.urlProject && (
                <a
                  href={project.urlProject}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/80 px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver projeto (demo)
                </a>
              )}
              {project.urlRepository && (
                <a
                  href={project.urlRepository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/80 px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Repositório
                </a>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
