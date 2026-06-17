// Cas clients détaillés (deep-dives) — source unique des pages /projets/[slug].
// DISTINCT de projets.ts (le parcours filtrable) : granularité et usage différents.
//
// ⚠ Copy VERROUILLÉE (spec_pages_projets_03062026 §5, chiffres validés 2026-06-03).
//   Toute modification de chiffre repasse par la spec. Les `note` sont conservées telles quelles
//   (honnêteté anti-survente). Règle de rendu : un `ChiffreCle.valeur` vide ⇒ ligne non rendue.

import type { Period } from './projets'; // 'xpair' | 'creastory'

export interface ChiffreCle {
  label: string;
  valeur: string;
  note?: string; // précision honnête (ex. "estimation", "sans intervention humaine")
}

export interface CasClient {
  slug: string; // URL: /projets/<slug>
  client: string; // nom affiché
  secteur: 'E-santé' | 'Formation' | 'Événementiel';
  periode: Period;
  role: string; // une ligne
  stack: string[];

  heroPromesse: string; // 1 phrase, sous le titre
  heroChiffre: ChiffreCle; // le chiffre mis en avant en haut

  defi: string; // 3-5 phrases (paragraphes \n\n autorisés)
  livraison: string[]; // étapes / briques d'archi (liste ordonnée)
  livraisonNote?: string; // note contextuelle rendue sous la liste (italique atténué)
  pointFort?: { titre: string; corps: string }; // bloc encadré différenciant (optionnel)

  chiffres: ChiffreCle[]; // tableau "Les chiffres"
  transposeIntro: string;
  transposeCibles: string[]; // liste à puces
  demontre: string[]; // "ce que ce projet démontre"

  schemaSvg?: string; // chemin public/, optionnel (v1.1 si absent)
  schemaTitre?: string; // titre HTML du schéma (jamais dans le SVG — cf. svg-titles-as-html)
  schemaLegende?: string; // légende HTML sous le schéma
  sousLeCapot?: { titre: string; etapes: { titre: string; corps: string }[] }; // détail "builder" sous le schéma
  parcoursNote?: string; // libellé du lien retour vers la ligne parcours
}

export const casClients: CasClient[] = [
  // ── 5.1 — myMicroNutrition (MMN) ─────────────────────────────────────────
  {
    slug: 'mymicronutrition',
    client: 'myMicroNutrition (MMN)',
    secteur: 'E-santé',
    periode: 'creastory',
    role: "Architecte automatisation & infrastructure — conception et build du pipeline de production V1.",
    stack: [
      'n8n',
      'Google Cloud (Cloud Run, Cloud SQL, Cloud Storage)',
      'Gotenberg',
      'Brevo',
      'WordPress / Stripe',
    ],
    heroPromesse:
      "Transformer un questionnaire santé payé en bilan PDF personnalisé, livré en minutes — sans aucune intervention humaine, sous contrainte HDS/RGPD.",
    heroChiffre: {
      label: "Temps d'analyse par bilan",
      valeur: '45 min → 2 min',
      note: 'sans intervention humaine · 0 erreur',
    },
    defi:
      "MMN vend un bilan micronutrition premium, personnalisé, validé médicalement par le fondateur. Le problème n'était pas le contenu : c'était la production. Transformer un questionnaire client payé en un PDF personnalisé, fiable, livré en quelques minutes — sans opérateur, et sous contrainte de conformité puisqu'il s'agit de données de santé.",
    livraison: [
      'Paiement (Stripe) + questionnaire (Fluent Forms / WordPress) → webhook.',
      'Sauvegarde de la donnée brute → Google Cloud Storage.',
      'Moteur de profilage déterministe (logique experte, IP client — boîte noire).',
      'Assemblage depuis des bases de connaissances versionnées (IP client).',
      'Génération HTML → conversion PDF (Gotenberg / Chromium headless).',
      'URL signée GCS V4 (RSA-SHA256), à durée de vie limitée.',
      'Envoi du bilan par email (Brevo).',
    ],
    livraisonNote:
      "Le webhook répond en HTTP 200 immédiatement ; tout le traitement tourne en asynchrone. Aucun opérateur ne touche le dossier entre le paiement et la réception.",
    schemaSvg: '/pipeline_mmn_bilan_n8n_17062026.svg',
    schemaTitre: 'Le workflow, étape par étape',
    schemaLegende:
      "Pipeline n8n réel : du paiement et du questionnaire à la livraison du bilan PDF, en asynchrone et sous contrainte HDS/RGPD.",
    sousLeCapot: {
      titre: 'Sous le capot, en quatre temps',
      etapes: [
        {
          titre: 'Réception & sauvegarde brut',
          corps:
            "le paiement (Stripe) et le questionnaire déclenchent le webhook ; la donnée brute est sauvegardée dans un stockage HDS.",
        },
        {
          titre: 'Traitement algorithmique',
          corps:
            "un moteur déterministe croise les réponses du questionnaire avec des bases de connaissances expertes versionnées.",
        },
        {
          titre: 'Génération du bilan',
          corps:
            "assemblage d'un document personnalisé (template) puis conversion en PDF (Gotenberg / Chromium headless).",
        },
        {
          titre: 'Livraison',
          corps:
            "le PDF est déposé dans un bucket sécurisé, exposé par une URL signée à durée de vie limitée (7 jours), et envoyé par email (Brevo).",
        },
      ],
    },
    pointFort: {
      titre: 'La décision qui signe le travail : conformité avant fonctionnalité',
      corps:
        "La V1 embarquait une brique d'IA générative (second avis en validation croisée de l'algorithme). À l'audit, j'ai identifié un problème de fond : des données de santé nominatives transmises en clair à un service hébergé hors UE — incompatible HDS/RGPD. J'ai coupé la brique IA plutôt que de livrer un produit non conforme. La réintégration propre est spécifiée : pseudonymisation (identifiant + mapping chiffré) avant tout appel externe. L'IA reviendra comme garde-fou supervisé de l'algorithme — jamais comme décideur.",
    },
    chiffres: [
      { label: 'Analyse experte par bilan', valeur: '45 min → 2 min', note: 'temps praticien supprimé' },
      { label: 'Parcours client complet', valeur: '~10 min', note: 'remplissage → bilan reçu' },
      { label: 'Erreur de transcription', valeur: '0', note: 'aucune ressaisie humaine' },
      { label: 'Bilans produits', valeur: '100+', note: 'sans incident' },
      { label: 'Infrastructure', valeur: '< 200 €/mois', note: 'hébergement HDS inclus' },
      { label: 'Fiabilité', valeur: 'heartbeat /20 min · retry-on-fail · alerting temps réel' },
    ],
    transposeIntro:
      "Le cœur du projet n'est pas la nutrition. C'est un tunnel donnée → livrable premium personnalisé, industrialisé et fiable. Le même schéma s'applique à :",
    transposeCibles: [
      "la génération automatisée de mémoires techniques et réponses d'appel d'offres (bureaux d'études) ;",
      'la production de chiffrages et notes de calcul documentés ;',
      "l'assemblage de doc technique et comptes rendus à partir de données structurées.",
    ],
    demontre: [
      'Architecture serverless événementielle, de bout en bout.',
      'Automatisation déterministe : traçable, reproductible, auditable.',
      'Ingénierie de fiabilité : monitoring, alerting, retry, heartbeat.',
      "Discernement conformité : savoir quand ne pas mettre d'IA.",
    ],
    parcoursNote: 'Voir la ligne dans le parcours complet',
  },

  // ── 5.2 — XPair (assistant documentaire formation CVC) ────────────────────
  {
    slug: 'xpair-assistant-formation',
    client: 'XPair (groupe Batiactu)',
    secteur: 'Formation',
    periode: 'xpair',
    role: "Conception et build du pipeline d'ingestion documentaire et de l'assistant interne (RAG).",
    stack: [
      'Qdrant (base vectorielle)',
      'Mistral OCR',
      'Mistral LLM',
    ],
    heroPromesse:
      "Rendre 3 600+ pages de cours techniques CVC interrogeables en langage naturel par les équipes SAV et commerciales — sur une stack 100 % européenne.",
    heroChiffre: {
      label: 'Escalades vers le responsable métier',
      valeur: '≈ 0',
      note: 'contre ~4-5/jour avant · réponses en secondes',
    },
    defi:
      "Les équipes SAV et commerciales doivent répondre vite, et juste, à des questions clients précises : combien de cours sur tel sujet, telle réglementation est-elle traitée, quel module couvre tel besoin. Sans outil dédié, ces réponses dépendaient de la mémoire des équipes, allongeaient l'onboarding et remontaient sans cesse vers le responsable métier — un goulot d'étranglement.",
    livraison: [
      'Ingestion de la documentation — cours, supports, infos de service — via Mistral OCR pour les documents non structurés.',
      'Indexation dans une base vectorielle Qdrant (RAG).',
      'Chatbot interne propulsé par Mistral LLM : interrogation en langage naturel.',
      'Configuration, prompts et paramétrage = propriétaire, boîte noire.',
    ],
    pointFort: {
      titre: 'Une stack souveraine',
      corps:
        "L'ensemble repose sur des briques européennes (Mistral, Qdrant). Sur un usage interne touchant des données de service et de formation, c'est un choix de souveraineté et de maîtrise — pas de dépendance à un LLM hébergé hors UE. L'illustration concrète de la posture « RAG souverain / LLMs européens ».",
    },
    chiffres: [
      {
        label: 'Base ingérée',
        valeur: '255 cours / 3 600+ pages',
        note: 'cours techniques CVC + doc service + annexes (CPF, certifications)',
      },
      {
        label: 'Escalades vers le responsable métier',
        valeur: '~4-5/jour → ~0',
        note: 'quasi-totalité du niveau 1 sans escalade',
      },
      { label: 'Latence de réponse', valeur: 'quelques minutes → quelques secondes' },
      { label: 'Temps récupéré (responsable métier)', valeur: '~3 h/semaine', note: 'estimation' },
      { label: 'Équipe outillée', valeur: '4 personnes', note: '2 SAV + 2 commerciaux' },
    ],
    transposeIntro:
      "Le cœur n'est pas la formation. C'est rendre une base documentaire métier interrogeable en langage naturel, sur une stack souveraine. Applicable à :",
    transposeCibles: [
      "l'assistant doc technique / réglementaire pour un bureau d'études ;",
      "la base de connaissance support d'un service client ou SAV ;",
      "l'onboarding sur un référentiel métier dense (normes, procédures, catalogue).",
    ],
    demontre: [
      "Pipeline d'ingestion documentaire complet, OCR inclus.",
      'RAG opérationnel sur base vectorielle (Qdrant).',
      'Assistant métier sur LLM souverain (Mistral).',
      'Impact organisationnel mesurable : moins d’escalades, onboarding plus rapide.',
    ],
  },

  // ── 5.3 — EnerJ-meeting (moteur de recommandation) ────────────────────────
  {
    slug: 'enerj-meeting-recommandation',
    client: 'EnerJ-meeting',
    secteur: 'Événementiel',
    periode: 'xpair',
    role: "Conception et build du moteur de recommandation de conférences, intégré au parcours d'inscription (au sein de la plateforme événementielle conçue en 2016).",
    stack: [
      'enrichissement de données publiques',
      'moteur de scoring propriétaire',
      'intégration back-office',
    ],
    heroPromesse:
      "Recommander les 5 bonnes conférences à chaque visiteur dès l'inscription — et les pousser dans son espace, sans ressaisie.",
    heroChiffre: {
      label: 'Conférences ciblées par visiteur',
      valeur: '5 / 120+',
      note: "poussées dans l'espace visiteur, sans ressaisie",
    },
    defi:
      "L'événement propose plus de 120 conférences. À l'inscription, un visiteur n'a ni le temps ni les moyens de trier ce qui le concerne. Résultat : un parcours générique, un engagement faible, une valeur limitée pour les exposants et l'organisateur, qui veulent des visiteurs présents sur les bonnes sessions.",
    livraison: [
      'Le visiteur renseigne son profil professionnel.',
      'Enrichissement du profil à partir de données professionnelles publiques.',
      'Moteur de matching (scoring propriétaire — boîte noire) : 5 conférences pertinentes parmi 120+.',
      "Les conférences retenues sont ajoutées directement à l'espace personnel (back-office) du visiteur, sans ressaisie.",
    ],
    livraisonNote:
      "La recommandation arrive au bon moment — la fin de l'inscription — et se matérialise par une action concrète.",
    schemaSvg: '/pipeline_enerj_reco_n8n_17062026.svg',
    schemaTitre: 'Le workflow, étape par étape',
    schemaLegende:
      "Workflow n8n réel : de la soumission du formulaire d'inscription à la restitution des conférences recommandées dans l'espace du visiteur.",
    sousLeCapot: {
      titre: 'Sous le capot, en trois temps',
      etapes: [
        {
          titre: 'Enrichir',
          corps:
            "à partir du profil saisi, une recherche web (SerpAPI) retrouve la page LinkedIn publique, dont les informations métier sont extraites. Repli propre si le profil reste introuvable.",
        },
        {
          titre: 'Corréler',
          corps:
            "un agent IA (cerveau DeepSeek) croise le profil enrichi avec le catalogue des conférences (base Notion) pour sélectionner les sessions pertinentes.",
        },
        {
          titre: 'Restituer',
          corps:
            "le résultat est mis en forme et renvoyé directement dans le parcours d'inscription du visiteur, sans ressaisie.",
        },
      ],
    },
    chiffres: [
      { label: 'Conférences ciblées / catalogue', valeur: '5 / 120+', note: "par visiteur, dès l'inscription" },
      { label: 'Édition 2026', valeur: '4 100 visiteurs présents', note: 'le jour J' },
      {
        label: 'Mises en relation post-événement',
        valeur: '27 300',
        note: "via la plateforme de matchmaking que j'ai conçue (2016)",
      },
    ],
    transposeIntro:
      "Le cœur n'est pas l'événementiel. C'est enrichir un profil et recommander la bonne action au bon moment, dans un parcours existant. Applicable à :",
    transposeCibles: [
      "la qualification et l'orientation de leads en B2B ;",
      "les parcours d'inscription / onboarding personnalisés ;",
      "toute recommandation contextuelle injectée dans un outil métier déjà en place.",
    ],
    demontre: [
      'Enrichissement de données à partir de sources professionnelles publiques.',
      'Moteur de recommandation / scoring intégré à un produit existant.',
      'Capacité à transformer une suggestion en action concrète dans le back-office, sans friction.',
    ],
    parcoursNote: 'Voir la ligne dans le parcours complet',
  },
];

/** Cas indexé par slug — pour getStaticPaths et lookups. */
export const casClientsBySlug: Record<string, CasClient> = Object.fromEntries(
  casClients.map((c) => [c.slug, c]),
);
