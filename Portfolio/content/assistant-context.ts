/**
 * Extra context for the portfolio assistant: how to present Zakaria to recruiters and hiring
 * managers. Written in English; the assistant translates on the fly.
 *
 * Rule for editing: every line must be true and defensible in an interview. The assistant is told
 * to rely on this file, so anything written here will be repeated to visitors.
 *
 * Good additions when you have them: interests outside work, preferred team size or domain,
 * notice period, willingness to relocate, languages you'd like to work in.
 */
export const assistantContext = {
  pitch:
    "A full-stack developer who ships real products and brings machine learning to the table. He builds production web apps with Next.js and Node.js today, and he is finishing a State Engineer degree in AI & Data Science, so he can grow into roles where product engineering and data meet.",

  strengths: [
    "Ships to production: he works on the live frontend of Egor Gaming, an Algerian esports platform, and built Tahwisa, an internal platform deployed across several NAFTAL centers.",
    "Works across the whole stack: React and Next.js interfaces, Node.js/Express and Go APIs, PostgreSQL schemas, and machine learning in Python.",
    "Cares about maintainable code: he led the move of a live Next.js codebase to a feature-based architecture and documented the approach for his team.",
    "Owns projects end to end: at NAFTAL he designed the database, built the API with role-based access control, built the frontend and helped ship it.",
    "Communicates and teaches: he helps run hands-on machine learning and backend workshops at the School of AI club, and works in Arabic, French and English.",
    "Strong foundations: final-year State Engineer student in AI & Data Science at ESTIN and a DataCamp-certified Associate Data Scientist.",
  ],

  bestFit: [
    "Full-stack or front-end roles on React / Next.js products",
    "Backend and API work with Node.js or Go and PostgreSQL",
    "Junior ML or data roles where solid engineering matters as much as modelling",
    "Teams that value clean architecture, documentation and shipping",
  ],

  lookingFor:
    "Open to full-time roles, internships and freelance work. Based in Blida, Algeria and comfortable working remotely. He graduates in June 2027 after his final project defense.",

  faq: [
    {
      question: "Salary, rates or exact start date",
      answer: "Not published. The best next step is to email him with the role and timeline.",
    },
    {
      question: "How to evaluate his work",
      answer:
        "Look at the live Egor Gaming platform, the Tahwisa demo and source code, and the Guardly backend on GitHub; the CV has the full history.",
    },
  ],
}
