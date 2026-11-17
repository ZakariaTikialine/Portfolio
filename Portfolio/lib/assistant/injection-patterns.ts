/**
 * Fast, deterministic screen for the most common prompt-injection phrasings in the site's three
 * languages. It runs on the latest visitor message only, before any model call, and works even
 * when the AI provider is unreachable. The Prompt Guard classifier remains the broader check.
 *
 * Patterns are deliberately specific (an instruction to ignore rules, reveal the prompt, or take
 * on a new persona) so that ordinary questions about the assistant or about Zakaria pass.
 */
const PATTERNS: readonly RegExp[] = [
  // English
  /\b(ignore|disregard|forget|override)\b.{0,40}\b(previous|prior|above|earlier|all|your|the)\b.{0,20}\b(instructions?|rules?|prompts?|guidelines?)/i,
  /\b(reveal|show|print|repeat|output|display|leak|tell me)\b.{0,30}\b(system|hidden|initial|original|secret)\b.{0,15}\b(prompt|instructions?|rules?|message)/i,
  /\byou are now (an? )?(unrestricted|uncensored|jailbroken|different|new) (ai|assistant|model|persona)\b|\bact as (an? )?(unrestricted|uncensored|jailbroken)\b|\bdeveloper mode\b|\bjailbreak/i,
  // "DAN" persona, case-sensitive so the name "Dan" still passes.
  /\b([Yy]ou are|[Aa]ct as|[Bb]ecome|[Ee]nable) DAN\b|\bDAN mode\b/,
  // French
  /\b(ignore|oublie|oubliez|ne tiens pas compte)\b.{0,40}\b(instructions?|règles|consignes|prompt)\b/i,
  /\b(révèle|affiche|montre|répète|donne)\b.{0,30}\b(prompt|instructions?|consignes)\b.{0,15}(système|cachées?|initiales?|secrètes?)/i,
  // Arabic
  /(تجاهل|انس|انسَ|تخطَّ|تخط).{0,40}(التعليمات|القواعد|الأوامر|التوجيهات)/,
  /(اكشف|أظهر|اعرض|اطبع|كرر).{0,30}(التعليمات|الأوامر|التوجيهات|موجه النظام|البرومبت)/,
]

export function looksLikeInjection(message: string): boolean {
  return PATTERNS.some((pattern) => pattern.test(message))
}
