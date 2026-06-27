'use client'

import {
  Send,
  Mail,
  User,
  FileText,
  Linkedin,
  Github,
  Instagram,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconWhatsapp } from '@/components/ui/icons/icon-whatsapp'
import { FadeIn } from '@/components/motion'
import { SectionHeader } from '@/components/ui/section-header'
import { createContactFormSchema, type ContactFormData } from '@/lib/contact-schema'
import { CONTACT_INFO, SOCIAL_LINKS } from '@/constants/site'
import { useLocale } from '@/providers/locale-provider'

export function ContactSection() {
  const { locale, dictionary } = useLocale()
  const copy = dictionary.contact
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const contactFormSchema = useMemo(() => createContactFormSchema(locale), [locale])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error ?? copy.genericError)
      }

      setSubmitStatus('success')
      reset()

      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : copy.genericError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="section-shell transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-muted/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-muted/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <FadeIn className="mb-12">
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          <FadeIn direction="left">
            <div className="bg-card/80 rounded-2xl p-8 shadow-2xl border border-border/60 transition-colors duration-300">
              <div className="flex items-center mb-6">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4"
                >
                  <User className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{copy.panelTitle}</h3>
              </div>

              <span className="availability-badge mb-8">
                <span className="relative inline-flex h-2 w-2">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-ping rounded-full bg-primary/60"
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {dictionary.site.availabilityBadge}
              </span>

              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{copy.emailLabel}</p>
                    <Link
                      href={`mailto:${CONTACT_INFO.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/90 underline decoration-primary/30 decoration-1 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors break-all"
                    >
                      {CONTACT_INFO.email}
                    </Link>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4">
                    <Linkedin className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{dictionary.social.linkedin}</p>
                    <Link
                      href={SOCIAL_LINKS[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/90 underline decoration-primary/30 decoration-1 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors break-all"
                    >
                      {SOCIAL_LINKS[0].url}
                    </Link>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4">
                    <Github className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{dictionary.social.github}</p>
                    <Link
                      href={SOCIAL_LINKS[1].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/90 underline decoration-primary/30 decoration-1 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors break-all"
                    >
                      {SOCIAL_LINKS[1].url}
                    </Link>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4">
                    <Instagram className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{dictionary.social.instagram}</p>
                    <Link
                      href={SOCIAL_LINKS[2].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/90 underline decoration-primary/30 decoration-1 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors break-all"
                    >
                      {SOCIAL_LINKS[2].url}
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center w-full justify-center px-6 py-4 bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <IconWhatsapp size={24} color="currentColor" className="mr-2" />
                {copy.whatsapp}
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="bg-card/80 rounded-2xl p-8 shadow-2xl border border-border/60 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4"
                >
                  <FileText className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{copy.formTitle}</h3>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">{copy.formSubtitle}</p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
                aria-describedby="form-status"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {copy.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    autoComplete="name"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    {...register('name')}
                    className={`w-full px-4 py-2 border rounded-xl bg-background/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                      errors.name ? 'border-destructive focus:ring-destructive' : 'border-border'
                    }`}
                    placeholder={copy.namePlaceholder}
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {copy.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email')}
                    className={`w-full px-4 py-2 border rounded-xl bg-background/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                      errors.email ? 'border-destructive focus:ring-destructive' : 'border-border'
                    }`}
                    placeholder={copy.emailPlaceholder}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {copy.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    {...register('message')}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-xl bg-background/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300 ${
                      errors.message ? 'border-destructive focus:ring-destructive' : 'border-border'
                    }`}
                    placeholder={copy.messagePlaceholder}
                    disabled={isLoading}
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div id="form-status" aria-live="polite" aria-atomic="true">
                  {submitStatus === 'success' && (
                    <div
                      role="status"
                      className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400"
                    >
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                      <p className="text-sm font-medium">{copy.success}</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive"
                    >
                      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">{copy.errorTitle}</p>
                        <p className="text-xs">{errorMessage}</p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  aria-busy={isLoading}
                  className="w-full group inline-flex items-center justify-center px-6 py-4 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                      {copy.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                      {copy.submit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
