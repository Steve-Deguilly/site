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
export type CategoryId = 'relation-client' | 'automatisation-metier' | 'assistant-interne';

export interface Category {
  id: CategoryId;
  /** Intitulé affiché en tête de bloc. */
  label: string;
  /** Une phrase qui dit à qui/à quoi ça sert. */
  blurb: string;
}

export const categories: Category[] = [
  {
    id: 'relation-client',
    label: 'Relation client',
    blurb: "Automatiser et personnaliser la communication et le suivi de vos clients.",
  },
  {
    id: 'automatisation-metier',
    label: 'Automatisation métier',
    blurb: "Automatiser un process métier de bout en bout : analyse, décision, génération de livrables — sans saisie ni erreur.",
  },
  {
    id: 'assistant-interne',
    label: 'Assistant interne',
    blurb: "Des agents experts qui répondent à partir de vos documents et de vos process.",
  },
];

/** Nature : preuve de concept (POC) ou MVP client réel déployé. Le côté "testable en direct" est porté par `live` (cf. pill « Testez-moi »), pas par le type. */
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
}

export const demos: DemoEntry[] = [
  {
    slug: 'enerj-recommandation',
    category: 'relation-client',
    type: 'MVP',
    tag: 'Événementiel · n8n + IA',
    title: 'Moteur de recommandation de conférences',
    pitch:
      "Conçu et déployé pour EnerJ-meeting : à l'inscription, chaque visiteur reçoit les conférences faites pour lui — profil enrichi automatiquement, agent IA, sans ressaisie.",
    cta: 'Voir le cas',
    href: '/projets/enerj-meeting-recommandation',
  },
  {
    slug: 'emails-segmentes',
    category: 'relation-client',
    type: 'POC',
    tag: 'Automatisation · n8n',
    title: 'Notes de version → emails clients segmentés',
    pitch:
      "Un workflow transforme une note de version technique en emails clients segmentés par module, reformulés en bénéfices. Modèle européen, validation humaine avant envoi.",
    cta: 'Voir la démo',
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
    slug: 'mmn-bilan',
    category: 'automatisation-metier',
    type: 'MVP',
    tag: 'E-santé · n8n · HDS/RGPD',
    title: 'Questionnaire santé → bilan personnalisé',
    pitch:
      "Conçu pour myMicroNutrition : un questionnaire santé devient un bilan PDF personnalisé en quelques minutes, sans intervention humaine ni erreur de saisie — sous contrainte HDS/RGPD.",
    cta: 'Voir le cas',
    href: '/projets/mymicronutrition',
  },
];

/** Démos d'une catégorie, dans l'ordre de demos[]. */
export function demosOf(categoryId: CategoryId): DemoEntry[] {
  return demos.filter((d) => d.category === categoryId);
}
