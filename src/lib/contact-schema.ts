import { z } from 'zod'

import { getDictionary, type Locale } from '@/i18n'

/**
 * Schema compartilhado entre o formulário de contato (cliente) e o route
 * handler `/api/contact` (servidor). Mantendo num só lugar, ambos ficam
 * sincronizados — se uma regra mudar aqui, os dois lados são atualizados
 * e o TypeScript avisa em caso de divergência.
 */
export function createContactFormSchema(locale: Locale = 'pt-BR') {
  const validation = getDictionary(locale).contact.validation

  return z.object({
    name: z.string().min(2, validation.nameMin).max(100, validation.nameMax),
    email: z.string().email(validation.emailInvalid),
    message: z.string().min(10, validation.messageMin).max(1000, validation.messageMax),
  })
}

export const contactFormSchema = createContactFormSchema()

export type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>
