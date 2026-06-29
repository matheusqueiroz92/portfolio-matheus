import { z } from 'zod'

import { CHATBOT_LIMITS } from '@/lib/chatbot/config'

export const chatStreamRequestSchema = z.object({
  input: z
    .string()
    .trim()
    .min(1, 'Input is required')
    .max(CHATBOT_LIMITS.maxInputLength),
})

export type ChatStreamRequest = z.infer<typeof chatStreamRequestSchema>
