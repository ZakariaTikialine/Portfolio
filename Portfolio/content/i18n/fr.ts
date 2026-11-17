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
    home: "Accueil",
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
    status: "Élève ingénieur en dernière année · Diplôme en juin 2027",
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
  work: {
    eyebrow: "Projets",
    title: "Projets sélectionnés",
    intro:
      "Des produits que je conçois et livre : une plateforme d'esport en production, une application de stage déployée, et des projets backend et de machine learning.",
    featured: "À la une",
    alsoBuilt: "Également réalisé",
    live: { demo: "Démo en ligne", platform: "Plateforme en ligne" },
    repoKinds: {
      frontend: "Code frontend",
      backend: "Code backend",
      source: "Code source",
      notebooks: "Notebooks",
    },
    moreOnGitHub: "Plus sur GitHub",
    layersLabel: "Couches",
  },
  projects: {
    egor: {
      title: "Egor Gaming",
      role: "Développeur Front-End · poste actuel",
      summary:
        "La plateforme d'esport algérienne pour les tournois, les arènes, les équipes et les classements. Je développe et maintiens son frontend Next.js au sein de l'équipe produit.",
      points: [
        "Composants React typés en TypeScript sur toute la plateforme en production",
        "Passage d'un dossier de composants plat à une architecture par fonctionnalité",
        "Migration de la plupart des domaines produit et documentation pour l'équipe",
      ],
      imageAlt: "Page des arènes d'Egor Gaming : communautés et tournois d'esport",
    },
    tahwisa: {
      title: "Tahwisa",
      role: "Full-stack · Stage chez NAFTAL",
      summary:
        "Plateforme de gestion des déplacements des employés, utilisée dans plusieurs centres NAFTAL pour les campagnes saisonnières. Je l'ai développée de bout en bout et j'ai contribué à sa mise en production.",
      points: [
        "API REST avec authentification JWT et contrôle d'accès par rôles",
        "Schéma PostgreSQL conçu pour des données cohérentes et des requêtes rapides",
        "Frontend Next.js et TypeScript avec tableaux de bord d'administration",
        "Sélection automatisée des participants pour chaque campagne",
      ],
      imageAlt: "Page d'accueil de Tahwisa : récompenses de voyage pour les employés de NAFTAL",
    },
    guardly: {
      title: "Guardly",
      role: "Backend",
      summary:
        "Backend Go d'un système de détection d'anomalies par IA. Il reçoit les événements d'un modèle exécuté sur les postes des utilisateurs, les enregistre et alerte les bonnes personnes.",
      points: [
        "Point d'entrée REST qui enregistre les événements d'anomalie dans PostgreSQL",
        "Routes protégées par JWT, filtrage des événements et statistiques",
        "Notifications push avec Firebase et alertes e-mail via SMTP",
        "Conteneurisé avec Docker",
      ],
    },
    "graph-ml": {
      title: "Graph ML sur un réseau d'e-mails",
      role: "Machine learning",
      summary:
        "Machine learning sur graphe appliqué au réseau Email-EU-Core : des embeddings Node2Vec pour classer les chercheurs par département et prédire des liens.",
      points: [
        "Embeddings Node2Vec appris sur le graphe des e-mails",
        "Classification des départements à partir des embeddings",
        "Prédiction de liens par similarité cosinus, AUC 0,74",
      ],
    },
    "maze-solver": {
      title: "Maze Solver",
      role: "Frontend · algorithmes",
      summary: "Visualiseur interactif qui compare pas à pas les algorithmes BFS, DFS et A*.",
      points: ["Métriques en direct : longueur du chemin, nœuds visités et temps d'exécution"],
    },
  },
  experience: {
    eyebrow: "Expérience",
    title: "Mon parcours professionnel",
    present: "Aujourd'hui",
    current: "En poste",
    communityTitle: "Engagement associatif",
  },
  roles: {
    egor: {
      title: "Développeur Front-End",
      context: "Plateforme d'esport algérienne : tournois, équipes et classements",
      location: "À distance",
      points: [
        "Je développe et maintiens le frontend de la plateforme Next.js en production, avec des composants React typés en TypeScript.",
        "J'ai réorganisé le frontend d'un dossier de composants plat vers une structure par fonctionnalité, plus simple à parcourir et à faire évoluer.",
        "J'ai migré la plupart des domaines vers cette structure et documenté l'approche pour l'équipe.",
      ],
    },
    naftal: {
      title: "Stagiaire Développeur Web Full-Stack",
      context: "Direction Centrale des Systèmes d'Information",
      location: "Algérie",
      points: [
        "J'ai développé et déployé Tahwisa, une application de gestion des déplacements utilisée dans plusieurs centres.",
        "J'ai mis en place l'API REST avec authentification et contrôle d'accès par rôles.",
        "J'ai conçu le schéma PostgreSQL et optimisé les requêtes pour la cohérence et la rapidité.",
        "J'ai développé le frontend Next.js et TypeScript et contribué à la mise en production.",
      ],
    },
  },
  community: {
    "school-of-ai": {
      title: "Assistant technique",
      summary:
        "J'aide à animer des ateliers de machine learning, de deep learning et de développement backend, et j'accompagne les participants lors de sessions pratiques en Python.",
    },
    nexus: {
      title: "Responsable logistique",
      summary:
        "J'ai géré la logistique et l'installation technique de compétitions de cybersécurité réunissant plus de 75 participants.",
    },
  },
  skills: {
    eyebrow: "Compétences",
    title: "Toute la stack",
    intro: "Tout ce avec quoi je travaille, regroupé par couche du système.",
    tooling: "Outils",
    spokenLanguages: "Langues",
    languages: [
      { name: "Arabe", level: "Langue maternelle" },
      { name: "Français", level: "B2 · TCF" },
      { name: "Anglais", level: "Professionnel" },
    ],
  },
  education: {
    eyebrow: "Formation",
    title: "Formation et certification",
    degree: "Ingénieur d'État en informatique",
    field: "Intelligence artificielle & Data Science",
    institution: "École Supérieure en Sciences et Technologies de l'Informatique (ESTIN)",
    note: "Dernière année · soutenance du projet de fin d'études en juin 2027",
    certificationLabel: "Certification",
    certification: "Associate Data Scientist",
    certificationNote: "Certification professionnelle en Python, statistiques et machine learning",
    evidence: "Projet d'examen",
  },
  contact: {
    eyebrow: "Contact",
    title: "Travaillons ensemble",
    intro:
      "Je suis ouvert aux postes à temps plein, aux stages et aux missions freelance. L'e-mail est le moyen le plus rapide de me joindre.",
    emailLabel: "E-mail",
    copy: "Copier",
    copied: "Copié",
    elsewhere: "Ailleurs",
    form: {
      title: "Envoyer un message",
      name: "Nom",
      email: "E-mail",
      message: "Message",
      send: "Envoyer le message",
      sending: "Envoi…",
      success: "Merci, votre message a bien été envoyé. Je vous répondrai par e-mail.",
      error: "Le message n'a pas pu être envoyé. Écrivez-moi directement par e-mail.",
    },
  },
  notFound: {
    title: "Cette page n'existe pas",
    body: "Le lien est peut-être obsolète, ou la page a été déplacée.",
    home: "Retour à l'accueil",
  },
  footer: {
    rights: "Tous droits réservés.",
    source: "Code source sur GitHub",
  },
}
