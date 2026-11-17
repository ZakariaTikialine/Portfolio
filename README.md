# Zakaria Tikialine

**Full-Stack Developer · AI & Data Science**

Final-year State Engineering student in AI & Data Science at ESTIN, and Front-End Developer at
[Egor Gaming](https://egorgaming.com). I build production web apps with Next.js and Node.js, and
machine-learning pipelines in Python.

🌐 [zakaria-tikialine.tech](https://www.zakaria-tikialine.tech) ·
[LinkedIn](https://www.linkedin.com/in/zakaria-tikialine) ·
[CV](Portfolio/public/ZakariaTikialineCV.pdf)

## About this site

The portfolio draws my skills as a cross-section of a real system: **Interface**, **API**,
**Model** and **Data**. Each project shows which layers it touches.

- English, French and Arabic, with full right-to-left support
- Light and dark themes that follow the system setting
- Every page pre-rendered as static HTML
- WCAG 2.2 AA checked automatically in all three languages and both themes

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · next-intl ·
Playwright with axe-core · GitHub Actions · Vercel

## Project structure

```
Portfolio/
├─ app/[locale]/     Pages, layout and metadata per language
├─ content/          Single source of truth
│  ├─ profile.ts     Facts that don't change with language: dates, links, tools, layers
│  └─ i18n/          All visitor-facing text in en, fr and ar (type-checked for parity)
├─ features/         Page sections (hero, stack, …)
├─ components/       Layout (header, footer, theme, language) and UI primitives
├─ i18n/             Routing and locale configuration
└─ tests/            Playwright smoke and accessibility tests
```

## Development

Requires Node.js 22.12+ and pnpm 10.

```bash
cd Portfolio
pnpm install
pnpm dev          # http://localhost:3000
pnpm verify       # typecheck, lint, format check, build, end-to-end tests
```
