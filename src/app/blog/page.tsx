import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Rss } from 'lucide-react'

import { Header, Footer } from '@/components/layout'
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollTopButton } from '@/components/ui/scroll-top-button'
import { getAllPosts } from '@/lib/content'
import { BackButton } from '@/components/layout/back-button'

export const metadata: Metadata = {
  title: 'Blog | Matheus Queiroz',
  description:
    'Artigos sobre desenvolvimento fullstack, IA aplicada, arquitetura de software e os bastidores dos projetos que construo.',
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()
  const [featured, ...rest] = posts

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      <main id="conteudo-principal" className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Backdrop editorial — mesmo padrão das detail pages. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 0%, var(--background-gradient-start) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <BackButton href="/" label="início" />

          {/* Cabeçalho da página */}
          <FadeIn className="text-center mb-14">
            <div className="flex flex-col items-center justify-center">
              <span className="eyebrow mb-4 bg-primary/10 px-4 py-1 rounded-full border border-primary/20">
                Blog
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Notas &amp; bastidores
              </h1>
              <div className="w-20 h-1 bg-primary/60 mx-auto rounded-full" />
              <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
                Artigos sobre desenvolvimento fullstack, IA aplicada, arquitetura e os aprendizados
                que colho construindo software de verdade.
              </p>
            </div>
          </FadeIn>

          {posts.length === 0 ? (
            <FadeIn className="text-center">
              <div className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card/60 p-10 backdrop-blur-sm">
                <Rss className="mx-auto mb-4 h-8 w-8 text-primary/70" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Nenhum post por aqui ainda
                </h2>
                <p className="text-sm text-muted-foreground">
                  Logo, logo começam a aparecer as primeiras leituras. Volte em breve.
                </p>
              </div>
            </FadeIn>
          ) : (
            <>
              {/* Post em destaque — primeiro da lista, formato largo */}
              {featured && (
                <FadeIn className="mb-12">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="card-hover-lift group relative grid overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm md:grid-cols-[1.1fr_1fr] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={`Ler: ${featured.title}`}
                  >
                    {featured.coverImage?.url ? (
                      <div className="relative aspect-16/10 md:aspect-auto md:min-h-[320px] bg-muted/30">
                        <Image
                          src={featured.coverImage.url}
                          alt={featured.coverImage.alt ?? featured.title}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 640px"
                          priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-card/80 via-card/20 to-transparent" />
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center bg-muted/40 md:min-h-[320px]">
                        <Rss className="h-10 w-10 text-primary/40" aria-hidden="true" />
                      </div>
                    )}

                    <div className="flex flex-col justify-center p-6 md:p-10">
                      <p className="eyebrow mb-3">Em destaque</p>
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                        {featured.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5">
                        <time dateTime={featured.publishedDate}>
                          {formatDate(featured.publishedDate)}
                        </time>
                      </div>
                      {featured.tags && featured.tags.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                          {featured.tags.slice(0, 4).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs border-border/60 bg-background/50"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                        Ler artigo
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              )}

              {/* Grid com o restante */}
              {rest.length > 0 && (
                <FadeInStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.1}>
                  {rest.map((post) => (
                    <FadeInItem key={post.slug} className="h-full">
                      <Card className="card-hover-lift group relative flex h-full flex-col overflow-hidden border border-border/60 bg-card/80 py-0 backdrop-blur-sm focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-background">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="absolute inset-0 z-10 rounded-[inherit] focus:outline-none"
                          aria-label={`Ler: ${post.title}`}
                        >
                          <span className="sr-only">Ler: {post.title}</span>
                        </Link>

                        {post.coverImage?.url ? (
                          <div className="relative h-48 overflow-hidden bg-muted/30">
                            <Image
                              src={post.coverImage.url}
                              alt={post.coverImage.alt ?? post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-card/80 via-card/30 to-transparent" />
                          </div>
                        ) : (
                          <div className="flex h-48 items-center justify-center bg-muted/40">
                            <Rss className="h-8 w-8 text-primary/40" aria-hidden="true" />
                          </div>
                        )}

                        <CardContent className="flex grow flex-col p-5">
                          <p className="eyebrow mb-2">{formatDate(post.publishedDate)}</p>
                          <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed grow line-clamp-3">
                            {post.excerpt}
                          </p>

                          {post.tags && post.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs border-border/60 bg-background/50"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="mt-5 text-xs">
                            <span className="inline-flex items-center gap-1.5 font-medium text-primary transition-transform duration-300 group-hover:translate-x-0.5">
                              Ler artigo
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </FadeInItem>
                  ))}
                </FadeInStagger>
              )}
            </>
          )}
        </div>
      </main>

      <ScrollTopButton />
      <Footer />
    </div>
  )
}
