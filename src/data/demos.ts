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
export type CategoryId = 'relation-client' | 'assistant-interne';

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
    id: 'assistant-interne',
    label: 'Assistant interne',
    blurb: "Des agents experts qui répondent à partir de vos documents et de vos process.",
  },
];

/** Nature : démo interactive en ligne, preuve de concept anonymisée, ou cas client réel. */
export type DemoType = 'Démo' | 'POC' | 'Cas';

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
}

export const demos: DemoEntry[] = [
  {
    slug: 'enerj-recommandation',
    category: 'relation-client',
    type: 'Cas',
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
    type: 'Démo',
    tag: 'IA souveraine · sans stockage',
    title: 'Chat sur un document',
    pitch:
      "Interrogez un document public (recommandations IA de la CNIL) en langage naturel. Réponses sourcées du document, sans stockage, via un modèle européen.",
    cta: 'Essayer la démo',
  },
];

/** Démos d'une catégorie, dans l'ordre de demos[]. */
export function demosOf(categoryId: CategoryId): DemoEntry[] {
  return demos.filter((d) => d.category === categoryId);
}
