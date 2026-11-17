import { z } from "zod"

/**
 * The only shape the chat endpoint accepts. Strict: any other field (model, temperature,
 * max_tokens, messages, role, system...) makes the request invalid, so nothing a client sends can
 * reach the model configuration. Model and parameters are fixed server-side.
 */
export const MAX_QUESTION_CHARS = 600

export const chatRequestSchema = z.strictObject({
  locale: z.enum(["en", "fr", "ar"]),
  message: z.string().min(1).max(MAX_QUESTION_CHARS),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>
