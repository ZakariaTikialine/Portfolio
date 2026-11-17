import type { Dictionary } from "../types"

export const fr: Dictionary = {
  meta: {
    title: "Zakaria Tikialine · Développeur Full-Stack, IA & Data Science",
    description:
      "Développeur full-stack et élève ingénieur en dernière année d'IA & Data Science. Next.js, Node.js, Go, PostgreSQL et machine learning en Python. Basé en Algérie, ouvert au travail à distance.",
  },
  a11y: {
    skipToContent: "Aller au contenu",
    primaryNav: "Navigation principale",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    toggleTheme: "Basculer entre thème clair et sombre",
    language: "Langue",
    backToTop: "Retour en haut",
    opensInNewTab: "s'ouvre dans un nouvel onglet",
  },
  nav: {
    work: "Projets",
    experience: "Expérience",
    skills: "Compétences",
    education: "Formation",
    contact: "Contact",
  },
  hero: {
    role: "Développeur Full-Stack · IA & Data Science",
    summary:
      "Je développe des applications web en production avec Next.js et Node.js, et des pipelines de machine learning en Python. Actuellement développeur front-end chez Egor Gaming.",
    status: "Élève ingénieur en dernière année · Diplôme en juin\u00A02027",
    availability: "Ouvert aux opportunités",
    location: "Blida, Algérie · À distance",
    ctaCv: "Télécharger le CV",
    ctaContact: "Me contacter",
  },
  layers: {
    interface: "Interface",
    api: "API",
    model: "Modèle",
    data: "Données",
  },
  stack: {
    title: "Les couches sur lesquelles je travaille",
    hint: "Survolez ou touchez une couche pour voir où je l'ai utilisée.",
    projectCount: { one: "# projet", other: "# projets" },
  },
  projects: {
    tahwisa: {
      title: "Tahwisa",
      summary:
        "Plateforme de gestion des déplacements des employés, utilisée dans plusieurs centres NAFTAL. API REST avec contrôle d'accès par rôles, schéma PostgreSQL et frontend Next.js.",
    },
    guardly: {
      title: "Guardly",
      summary:
        "Backend Go d'un système de détection d'anomalies par IA. Il reçoit les événements du modèle, les stocke dans PostgreSQL et alerte les utilisateurs par notification push et par e-mail.",
    },
    "graph-ml": {
      title: "Graph ML sur un réseau d'e-mails",
      summary:
        "Embeddings Node2Vec sur le réseau Email-EU-Core pour la classification des départements et la prédiction de liens (AUC 0,74).",
    },
    "maze-solver": {
      title: "Maze Solver",
      summary: "Visualiseur interactif qui compare pas à pas les algorithmes BFS, DFS et A*.",
    },
  },
  footer: {
    rights: "Tous droits réservés.",
    source: "Code source sur GitHub",
  },
}
