// Mini-diagnostic d'automatisation — textes des 4 profils + CTA (A3).
// Textes repris mot pour mot de la spec A3. Chaque profil = diagnostic + exactement 3 leviers + 1 CTA.

import type { CTA, Profile, ProfileId } from './types';

// ── Destinations CTA (centralisées, cf. récapitulatif A3) ──────────────────────
const CAL_STANDARD: CTA = {
  label: 'Réserver un appel découverte (30 min)',
  destination: 'calcom-standard',
  href: 'https://cal.com/steve-deguilly/30min',
  external: true,
};

// Événement Cal.com court « optimisation 20 min » (profil Optimisateur). Event créé et confirmé (2026-05-31).
const CAL_COURT: CTA = {
  label: 'Échanger 20 min sur vos pistes d’optimisation',
  destination: 'calcom-court',
  href: 'https://cal.com/steve-deguilly/20min',
  external: true,
};

const LINKEDIN: CTA = {
  label: 'Suivre mon actualité sur LinkedIn',
  destination: 'linkedin',
  href: 'https://linkedin.com/in/steve-deguilly',
  external: true,
};

export const PROFILES: Record<ProfileId, Profile> = {
  // 🔥 Maturité faible / douleur forte
  deborde: {
    id: 'deborde',
    emoji: '🔥',
    title: 'Le Débordé manuel',
    diagnostic:
      'Vos équipes passent un temps considérable sur des tâches manuelles et répétitives, sans l’outillage pour les soulager. La douleur est réelle, quotidienne, et elle freine votre croissance. La bonne nouvelle : c’est précisément le terrain où les gains arrivent le plus vite et se voient le plus.',
    leviers: [
      'Cartographier vos 2-3 process les plus chronophages et automatiser ceux-là d’abord (quick wins).',
      'Connecter vos outils existants pour supprimer la ressaisie.',
      'Viser un premier résultat mesurable en quelques semaines — pas un chantier de 12 mois.',
    ],
    cta: CAL_STANDARD,
  },

  // ⚙️ Maturité élevée / douleur forte
  outille: {
    id: 'outille',
    emoji: '⚙️',
    title: 'L’Outillé sous-exploité',
    diagnostic:
      'Vous avez déjà investi dans de bons outils, mais la douleur persiste. Le potentiel est là, il n’est juste pas exploité. Le problème n’est généralement pas l’outil : c’est l’orchestration entre eux et l’absence d’automatisation des flux.',
    leviers: [
      'Faire parler vos outils entre eux plutôt que d’en ajouter un de plus.',
      'Automatiser les flux à forte valeur : relances, reporting, transferts de données.',
      'Tester un cas d’usage IA/RAG ciblé sur un process qui vous coûte cher.',
    ],
    cta: CAL_STANDARD,
  },

  // 🌱 Maturité faible / douleur faible
  prudent: {
    id: 'prudent',
    emoji: '🌱',
    title: 'Le Prudent',
    diagnostic:
      'Pas d’urgence côté outillage, pas de douleur criante aujourd’hui. C’est une position saine — automatiser pour automatiser n’aurait aucun sens. Votre enjeu n’est pas d’agir maintenant, mais de repérer le moment où un process commencera à vous coûter cher.',
    leviers: [
      'Identifier en amont les process qui grossiront avec votre activité.',
      'Documenter vos processus actuels : la base indispensable avant toute automatisation.',
      'Monter en autonomie sur les usages no-code simples.',
    ],
    cta: LINKEDIN,
  },

  // 📈 Maturité élevée / douleur faible
  optimisateur: {
    id: 'optimisateur',
    emoji: '📈',
    title: 'L’Optimisateur',
    diagnostic:
      'Vous êtes bien outillés et la douleur est maîtrisée. Vous n’avez pas un problème à régler, mais une marge à aller chercher — c’est souvent là qu’on passe de « ça marche » à « ça crée un avantage ».',
    leviers: [
      'Industrialiser ce qui fonctionne déjà : supervision, fiabilité, passage à l’échelle.',
      'Explorer un cas d’usage IA à fort levier sur votre cœur de métier.',
      'Situer votre maturité face aux meilleures pratiques de votre secteur.',
    ],
    cta: CAL_COURT,
  },
};
