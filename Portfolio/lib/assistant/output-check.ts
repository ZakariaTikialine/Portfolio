/**
 * Last line of defense before an answer leaves the server: if the model has repeated part of its
 * instructions (the canary token, or a heading only the system prompt contains), the answer is
 * replaced. Answers are buffered server-side so nothing leaks before this check runs.
 */
export function leaksSystemPrompt(answer: string, canary: string, fragments: readonly string[]) {
  const text = answer.toLowerCase()
  if (canary && text.includes(canary.toLowerCase())) return true
  return fragments.some((fragment) => text.includes(fragment.toLowerCase()))
}

/** Removes Markdown images entirely ("![alt](url)"), including the alt text. */
export function stripImageMarkdown(answer: string): string {
  return answer.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/!\[[^\]]*\]/g, "")
}
