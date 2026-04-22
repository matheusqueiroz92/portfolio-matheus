import { z } from 'zod'

/**
 * Schema compartilhado entre o formulário de contato (cliente) e o route
 * handler `/api/contact` (servidor). Mantendo num só lugar, ambos ficam
 * sincronizados — se uma regra mudar aqui, os dois lados são atualizados
 * e o TypeScript avisa em caso de divergência.
 */
export const contactFormSchema = z.object({
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

export type ContactFormData = z.infer<typeof contactFormSchema>
