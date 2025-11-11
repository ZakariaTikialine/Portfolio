"use client"

export default function ReadingTime({ content }: { content: string }) {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return <span className="text-xs text-muted-foreground font-mono">{readingTime} min read</span>
}
