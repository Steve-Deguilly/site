// Mini-diagnostic d'automatisation — questionnaire (A1).
// Chaque réponse vaut 0 à 3 points. Plus de points = plus de maturité (M) ou plus de douleur (D).
// 3 questions par axe → max 9 points/axe. Ordre d'affichage alterné M, D, M, D, M, D.
// Textes repris mot pour mot de la spec A1. Vouvoiement.

import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ── Q1 (Maturité) ──────────────────────────────────────────────────────────
  {
    id: 'Q1',
    order: 1,
    axis: 'maturite',
    prompt: 'Aujourd’hui, vos processus métier reposent surtout sur…',
    options: [
      { label: 'Du papier, des emails et des fichiers Excel partagés', points: 0 },
      {
        label: 'Quelques outils SaaS isolés, peu connectés',
        points: 1,
        hint: 'ex. un CRM, un logiciel de facturation, un Trello — chacun dans son coin, on recopie d’un outil à l’autre',
      },
      {
        label: 'Un socle d’outils bien adoptés mais cloisonnés',
        points: 2,
        hint: 'ex. CRM + ERP + messagerie utilisés par toute l’équipe, mais qui ne communiquent pas entre eux',
      },
      {
        label: 'Des outils connectés entre eux',
        points: 3,
        hint: 'ex. une vente saisie dans le CRM crée automatiquement la facture ; les données se synchronisent seules via Zapier, Make ou n8n',
      },
    ],
  },

  // ── Q2 (Douleur) ───────────────────────────────────────────────────────────
  {
    id: 'Q2',
    order: 2,
    axis: 'douleur',
    prompt:
      'Quelle part du temps de vos équipes part dans des tâches répétitives à faible valeur (ressaisie, copier-coller, mise en forme) ?',
    options: [
      { label: 'Marginale (< 10 %)', points: 0 },
      { label: 'Modérée (~ 25 %)', points: 1 },
      { label: 'Importante (~ 40 %)', points: 2 },
      { label: 'La moitié ou plus', points: 3 },
    ],
  },

  // ── Q3 (Maturité) ──────────────────────────────────────────────────────────
  {
    id: 'Q3',
    order: 3,
    axis: 'maturite',
    prompt:
      'Des tâches répétitives sont-elles déjà automatisées (relances, transferts de données, génération de documents) ?',
    options: [
      { label: 'Non, tout est manuel', points: 0 },
      { label: 'Une ou deux automatisations bricolées', points: 1 },
      { label: 'Plusieurs automatisations, sans vraie supervision', points: 2 },
      { label: 'Automatisations structurées et monitorées', points: 3 },
    ],
  },

  // ── Q4 (Douleur) ───────────────────────────────────────────────────────────
  {
    id: 'Q4',
    order: 4,
    axis: 'douleur',
    prompt: 'Ces tâches manuelles ralentissent-elles vos délais ou génèrent-elles des erreurs ?',
    options: [
      { label: 'Rarement', points: 0 },
      { label: 'Parfois', points: 1 },
      { label: 'Souvent, c’est un point de friction connu', points: 2 },
      { label: 'En permanence, ça bloque la croissance', points: 3 },
    ],
  },

  // ── Q5 (Maturité) ──────────────────────────────────────────────────────────
  {
    id: 'Q5',
    order: 5,
    axis: 'maturite',
    prompt: 'Où en êtes-vous sur l’exploitation de vos données et de l’IA ?',
    options: [
      { label: 'On n’exploite pas vraiment nos données', points: 0 },
      { label: 'Reporting manuel sur Excel', points: 1 },
      { label: 'Tableaux de bord en place, IA testée ponctuellement', points: 2 },
      { label: 'Données centralisées, IA/LLM déjà en production sur un cas', points: 3 },
    ],
  },

  // ── Q6 (Douleur) ───────────────────────────────────────────────────────────
  {
    id: 'Q6',
    order: 6,
    axis: 'douleur',
    prompt: 'Si rien ne change dans 6 mois, l’impact sur votre activité sera…',
    options: [
      { label: 'Négligeable', points: 0 },
      { label: 'Gênant mais gérable', points: 1 },
      { label: 'Coûteux (temps, marge, turnover)', points: 2 },
      { label: 'Critique, on doit agir maintenant', points: 3 },
    ],
  },
];

/** Questions triées par ordre d'affichage (utilisé par l'îlot UI). */
export const QUESTIONS_BY_ORDER: Question[] = [...QUESTIONS].sort((a, b) => a.order - b.order);

/** Accès rapide par id. */
export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
);

/** Nombre total de questions. */
export const TOTAL_QUESTIONS = QUESTIONS.length;
