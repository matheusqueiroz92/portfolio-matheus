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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import emailjs from '@emailjs/browser'
import { IconWhatsapp } from '@/components/ui/icons/icon-whatsapp'
import { FadeIn } from '@/components/motion'

// Schema de validação
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  email: z.string().email('Email inválido'),
  message: z
    .string()
    .min(10, 'A mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'A mensagem deve ter no máximo 1000 caracteres'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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
      // Verificar se as variáveis de ambiente estão configuradas
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          'Configuração do EmailJS não encontrada. Verifique as variáveis de ambiente.',
        )
      }

      // Enviar email usando EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_name: 'Matheus Queiroz',
        },
        publicKey,
      )

      setSubmitStatus('success')
      reset()

      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Erro ao enviar mensagem. Tente novamente mais tarde.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      id="contato"
      className="relative py-32 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-background/50 transition-colors duration-300"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-muted/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-muted/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Título */}
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contato</h2>
          <div className="w-20 h-1 bg-primary/60 mx-auto rounded-full"></div>
          {/* Subtítulo */}
          <p className="text-xl text-muted-foreground mt-4">
            Entre em contato comigo para conversar sobre seus projetos ou oportunidades de emprego.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Contact Info */}
          <FadeIn direction="left">
            <div className="bg-card/80 rounded-2xl p-8 shadow-2xl border border-border/60 transition-colors duration-300">
              <div className="flex items-center mb-6">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4"
                >
                  <User className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Entre em contato</h3>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                Pronto para transformar suas ideias em realidade digital? Entre em contato para
                conversarmos sobre novos projetos e como posso agregar valor ao seu negócio.
              </p>

              {/* Informações de Contato */}
              <div className="space-y-6 mb-8">
                {/* Email */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <Link
                      href="mailto:contato@matheusqueiroz.dev.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/90 underline decoration-primary/30 decoration-1 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors break-all"
                    >
                      contato@matheusqueiroz.dev.br
                    </Link>
                  </div>
                </div>

                {/* Linkedin */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4">
                    <Linkedin className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Linkedin</p>
                    <Link
                      href="https://linkedin.com/in/matheus-queiroz-dev-web"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/90 underline decoration-primary/30 decoration-1 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors break-all"
                    >
                      https://linkedin.com/in/matheus-queiroz-dev-web
                    </Link>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4">
                    <Github className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">GitHub</p>
                    <Link
                      href="https://github.com/matheusqueiroz92"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/90 underline decoration-primary/30 decoration-1 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors break-all"
                    >
                      https://github.com/matheusqueiroz92
                    </Link>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4">
                    <Instagram className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Instagram</p>
                    <Link
                      href="https://instagram.com/matheusgiga"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/90 underline decoration-primary/30 decoration-1 underline-offset-[3px] hover:text-primary hover:decoration-primary transition-colors break-all"
                    >
                      https://instagram.com/matheusgiga
                    </Link>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <Link
                href="https://web.whatsapp.com/send/?phone=5577988334370&text=Ol%C3%A1+Matheus"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center w-full justify-center px-6 py-4 bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <IconWhatsapp size={24} color="currentColor" className="mr-2" />
                WhatsApp
              </Link>
            </div>
          </FadeIn>

          {/* Right Panel - Contact Form */}
          <FadeIn direction="right">
            <div className="bg-card/80 rounded-2xl p-8 shadow-2xl border border-border/60 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 bg-muted/70 rounded-xl flex items-center justify-center mr-4"
                >
                  <FileText className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Vamos construir algo juntos?</h3>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                Tem um projeto em mente? Vamos conversar, posso te ajudar a transformar sua ideia em
                realidade!
              </p>

              {/* Formulário de Contato */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
                aria-describedby="form-status"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nome
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
                    placeholder="Seu nome completo"
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
                    Email
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
                    placeholder="seu@email.com"
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
                    Mensagem
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
                    placeholder="Descreva brevemente seu projeto ou ideia..."
                    disabled={isLoading}
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Mensagem de feedback — anunciada por screen readers */}
                <div id="form-status" aria-live="polite" aria-atomic="true">
                  {submitStatus === 'success' && (
                    <div
                      role="status"
                      className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400"
                    >
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                      <p className="text-sm font-medium">
                        Mensagem enviada com sucesso! Entrarei em contato em breve.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive"
                    >
                      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">Erro ao enviar mensagem</p>
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
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                      Enviar mensagem
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
