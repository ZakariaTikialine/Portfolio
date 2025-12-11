import { NextResponse } from "next/server"
import { locales, type Locale } from "@/i18n"

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const GROQ_MODEL = "llama-3.1-8b-instant"

const SYSTEM_PROMPTS: Record<Locale, string> = {
  en: `You are Zakaria Tikialine's AI assistant inside his portfolio. You speak concise, friendly English.
Bio: Full-stack engineer & AI/data practitioner based in Algeria (remote). Expert in React, Next.js, TypeScript, Node.js, Go, Python, data science, and ML. Featured projects: Tahwisa NAFTAL (travel ops platform), CSP timetable scheduler, interactive maze visualizer. Availability: remote-friendly freelance or full-time collaboration.
Guidelines: keep answers under 4 sentences, highlight relevant experience with practical impact, and invite follow-up questions. If the user asks for unrelated topics, gently steer back to Zakaria's skills or projects.`,
  fr: `Tu es l'assistant IA du portfolio de Zakaria Tikialine. Tu réponds en français clair et concis.
Bio : Ingénieur full-stack et spécialiste data/IA basé en Algérie (remote). Compétences : React, Next.js, TypeScript, Node.js, Go, Python, data science, ML. Projets : Tahwisa NAFTAL, planificateur CSP, visualiseur de labyrinthe. Disponibilité : missions remote ou collaboration.
Consignes : maximum 4 phrases, relie les réponses à ses compétences et propose de continuer la discussion. Si la demande sort du cadre professionnel, ramène la conversation vers ses projets ou son expertise.`,
  ar: `أنت المساعد الذكي في موقع زكرياء تيكيالين. أجب بالعربية الفصحى القصيرة والواضحة.
السيرة: مهندس Full-stack ومتخصص بيانات وذكاء اصطناعي من الجزائر (يعمل عن بعد). يتقن React وNext.js وTypeScript وNode.js وGo وPython وعلوم البيانات وML. أبرز المشاريع: Tahwisa NAFTAL، مخطط الجداول المعتمد على CSP، ومصور المتاهة التفاعلي. متاح للتعاون عن بعد.
التوجيهات: اجعل الإجابة لا تتجاوز أربع جمل، واربطها بمهاراته ومشاريعه، وشجع السائل على الاستمرار. إذا خرج السؤال عن السياق المهني فقم بإعادته بلطف إلى خبراته.`,
}

const FALLBACK_LOCALE: Locale = "en"

type ChatHistoryItem = {
  role: "user" | "assistant"
  content: string
}

function resolveLocale(locale?: string): Locale {
  if (!locale) return FALLBACK_LOCALE
  return locales.includes(locale as Locale) ? (locale as Locale) : FALLBACK_LOCALE
}

function sanitizeHistory(history: unknown): ChatHistoryItem[] {
  if (!Array.isArray(history)) return []
  return history
    .filter((item): item is ChatHistoryItem => {
      if (typeof item !== "object" || item === null) return false
      const candidate = item as Partial<ChatHistoryItem>
      const validRole = candidate.role === "user" || candidate.role === "assistant"
      return validRole && typeof candidate.content === "string"
    })
    .slice(-6)
}

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "GROQ_API_KEY_NOT_CONFIGURED" }, { status: 500 })
  }

  let body: { message?: string; locale?: string; history?: ChatHistoryItem[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 })
  }

  if (!body.message || typeof body.message !== "string") {
    return NextResponse.json({ error: "MESSAGE_REQUIRED" }, { status: 400 })
  }

  const locale = resolveLocale(body.locale)
  const history = sanitizeHistory(body.history)

  try {
    const groqResponse = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.5,
        max_tokens: 400,
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[locale] ?? SYSTEM_PROMPTS[FALLBACK_LOCALE] },
          ...history.map((item) => ({ role: item.role, content: item.content })),
          { role: "user", content: body.message.trim() },
        ],
      }),
    })

    if (!groqResponse.ok) {
      const errorBody = await groqResponse.text()
      console.error("Groq API error", groqResponse.status, errorBody)
      return NextResponse.json({ error: "GROQ_COMPLETION_FAILED" }, { status: 502 })
    }

    const completion = (await groqResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }

    const answer = completion.choices?.[0]?.message?.content?.trim()

    if (!answer) {
      return NextResponse.json({ error: "NO_ANSWER" }, { status: 502 })
    }

    return NextResponse.json({ answer })
  } catch (error) {
    console.error("AI chat route error", error)
    return NextResponse.json({ error: "AI_COMPLETION_FAILED" }, { status: 500 })
  }
}
