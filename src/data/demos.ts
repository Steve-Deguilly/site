// Catalogue des démos & POC affichés sur le hub /demos (et le teaser home).
//
// Pour publier une démo :
//   1. ajouter une entrée dans `demos[]` ci-dessous (avec sa `category`) ;
//   2. créer la page src/pages/demos/<slug>.astro.
// Pour ajouter une rubrique métier : ajouter une entrée dans `categories[]`.
//
// Le hub regroupe les cartes par catégorie, dans l'ordre de `categories[]`.
// L'ordre de `demos[]` = ordre d'affichage à l'intérieur de chaque catégorie.

/** Rubriques métier du hub. Ajouter une catégorie = une entrée ici. */
export type CategoryId = 'outils-en-ligne' | 'relation-client' | 'automatisation-metier' | 'assistant-interne';

export interface Category {
  id: CategoryId;
  /** Intitulé affiché en tête de bloc. */
  label: string;
  /** Une phrase qui dit à qui/à quoi ça sert. */
  blurb: string;
}

export const categories: Category[] = [
  {
    id: 'outils-en-ligne',
    label: 'Outils en ligne',
    blurb: "Des outils métier que je développe et publie sur Bâtiment IA, l'observatoire que j'édite. Deux s'essaient en ligne sans inscription, le troisième sort d'un chantier réel.",
  },
  {
    id: 'assistant-interne',
    label: 'Assistant interne',
    blurb: "Des agents experts qui répondent à partir de vos documents et de vos process.",
  },
  {
    id: 'relation-client',
    label: 'Relation client',
    blurb: "Automatiser et personnaliser la communication et le suivi de vos clients.",
  },
  {
    id: 'automatisation-metier',
    label: 'Automatisation métier',
    blurb: "Automatiser un process métier de bout en bout : analyse, décision, génération de livrables, sans saisie ni erreur.",
  },
];

/** Nature : preuve de concept (POC) ou service réellement déployé et exploité (MVP), pour un client ou en propre. Le côté "testable en direct" est porté par `live` (cf. pill « Testez-moi »), pas par le type. */
export type DemoType = 'POC' | 'MVP';

export interface DemoEntry {
  /** Identifiant ; route sous /demos/<slug> si pas de `href`. Doit correspondre au fichier page si pas de href. */
  slug: string;
  /** Rubrique métier (cf. categories[]). */
  category: CategoryId;
  type: DemoType;
  /** Domaine / techno, affiché en surtitre de carte. */
  tag: string;
  title: string;
  /** Une à deux phrases de pitch. */
  pitch: string;
  /** Libellé du bouton de la carte. */
  cta: string;
  /** Si présent, la carte pointe vers cette URL au lieu de /demos/<slug> (ex. cas réel sur /projets). */
  href?: string;
  /** Carte réellement testable en direct → affiche le pill « Testez-moi » (terracotta). */
  live?: boolean;
  /** La page de la démo contient une vidéo → badge « Vidéo » sur la carte. */
  video?: boolean;
}

export const demos: DemoEntry[] = [
  {
    slug: 'bai-comparateur-indices',
    category: 'outils-en-ligne',
    type: 'MVP',
    live: true,
    tag: 'Lecture de plans · déterministe',
    title: "Comparateur d'indices de plans",
    pitch:
      "Vous déposez deux indices d'un même jeu de plans, vous obtenez ce qui a bougé : quantités, repères, planches sans équivalent, cartouche mis à jour. Lecture déterministe du PDF, sans modèle de langage et sans OCR. Les plans sont effacés après le relevé.",
    cta: 'Essayer sur Bâtiment IA',
    href: 'https://batiment-ia.fr/outils/comparaison-indices-plans/',
  },
  {
    slug: 'bai-pre-controle-re2020',
    category: 'outils-en-ligne',
    type: 'MVP',
    live: true,
    tag: 'RAG réglementaire · Mistral + Qdrant',
    title: 'Pré-contrôle RE2020',
    pitch:
      "La mise en ligne du POC détaillé dans la rubrique Assistant interne. Vous posez une question sur l'Ic construction, vous obtenez la valeur applicable à votre date de permis et sa source exacte, ou un « non couvert » assumé. Corpus : 18 fiches du guide Cerema.",
    cta: 'Essayer sur Bâtiment IA',
    href: 'https://batiment-ia.fr/outils/pre-controle-re2020/',
  },
  {
    slug: 'bai-rapprochement-dpgf',
    category: 'outils-en-ligne',
    type: 'POC',
    tag: 'Chantier réel · contractant général',
    title: 'Rapprochement devis et DPGF',
    pitch:
      "Construit avec une conductrice de travaux chez un contractant général, sur une affaire d'aménagement tertiaire : reporter chaque ligne de devis sur la bonne ligne de la trame, signaler les métrés modifiés et les postes hors trame. Mesuré sur 9 devis et 46 lignes, aucune ligne posée au mauvais endroit. Accès sur demande.",
    cta: 'Voir le chantier',
    href: 'https://batiment-ia.fr/outils/consolidation-dpgf/',
  },
  {
    slug: 'enerj-recommandation',
    category: 'relation-client',
    type: 'MVP',
    tag: 'Événementiel · n8n + IA',
    title: 'Moteur de recommandation de conférences',
    pitch:
      "Conçu et déployé pour EnerJ-meeting : à l'inscription, chaque visiteur reçoit les conférences faites pour lui : profil enrichi automatiquement, agent IA, sans ressaisie.",
    cta: 'Voir le cas',
    href: '/projets/enerj-meeting-recommandation',
  },
  {
    slug: 'emails-segmentes',
    category: 'relation-client',
    type: 'POC',
    video: true,
    tag: 'Automatisation · n8n',
    title: 'Notes de version → emails clients segmentés',
    pitch:
      "Un workflow transforme une note de version technique en emails clients segmentés par module, reformulés en bénéfices. Modèle européen, validation humaine avant envoi.",
    cta: 'Voir la démo',
  },
  {
    slug: 'conformite-re2020',
    category: 'assistant-interne',
    type: 'POC',
    tag: 'RAG réglementaire · Mistral + Qdrant',
    title: 'Conformité RE2020 : l’assistant qui refuse d’inventer',
    pitch:
      "Un assistant de conformité qui cite le texte en vigueur mot pour mot, sait quel seuil s’applique selon la date du permis, et dit « non couvert » plutôt que d’improviser. Un second agent re-vérifie chaque affirmation avant de laisser passer. Sa version en ligne est dans la rubrique Outils en ligne.",
    cta: 'Voir le POC',
  },
  {
    slug: 'chat-document',
    category: 'assistant-interne',
    type: 'POC',
    live: true,
    tag: 'IA souveraine · sans stockage',
    title: 'Chat sur un document',
    pitch:
      "Interrogez un document public (recommandations IA de la CNIL) en langage naturel. Réponses sourcées du document, sans stockage, via un modèle européen.",
    cta: 'Essayer la démo',
  },
  {
    slug: 'prospection-automatisee',
    category: 'automatisation-metier',
    type: 'POC',
    tag: 'Orchestration · source de vérité + LLM souverain',
    title: "J'automatise la prospection, la mienne comme la vôtre",
    pitch:
      "Le concept que j'applique à ma propre prospection, adaptable à vos outils : une source de vérité (Notion, Airtable, Excel…), de l'orchestration (n8n, Make…) et un LLM souverain pour préparer briefs et relances. Vous validez, vous agissez. Pas de spam, plateformes respectées.",
    cta: 'Voir comment',
  },
  {
    slug: 'mmn-bilan',
    category: 'automatisation-metier',
    type: 'MVP',
    tag: 'E-santé · n8n · HDS/RGPD',
    title: 'Questionnaire santé → bilan personnalisé',
    pitch:
      "Conçu pour myMicroNutrition : un questionnaire santé devient un bilan PDF personnalisé en quelques minutes, sans intervention humaine ni erreur de saisie, sous contrainte HDS/RGPD.",
    cta: 'Voir le cas',
    href: '/projets/mymicronutrition',
  },
];

/** Démos d'une catégorie, dans l'ordre de demos[]. */
export function demosOf(categoryId: CategoryId): DemoEntry[] {
  return demos.filter((d) => d.category === categoryId);
}
