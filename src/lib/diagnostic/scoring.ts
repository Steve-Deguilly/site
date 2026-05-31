// Mini-diagnostic d'automatisation — moteur de scoring (A2).
// Fonctions pures, zéro effet de bord, zéro aléatoire → sortie 100 % déterministe.
//   score_maturité = Q1 + Q3 + Q5   (entier 0–9)
//   score_douleur  = Q2 + Q4 + Q6   (entier 0–9)
// Seuil (coupe au milieu de l'échelle 0–9) : Faible 0–4, Élevé 5–9 (≥ 5). Aucun arrondi sur le seuil.

import { QUESTION_BY_ID } from './questions';
import { PROFILES } from './profiles';
import type {
  Answers,
  DiagnosticResult,
  Level,
  ProfileId,
  Scores,
} from './types';

/** Seuil de bascule faible → élevé. */
export const HIGH_THRESHOLD = 5;

/** Points d'une réponse, ou 0 si la question / l'option est inconnue. */
function pointsFor(questionId: string, optionIndex: number): number {
  const question = QUESTION_BY_ID[questionId];
  if (!question) return 0;
  const option = question.options[optionIndex];
  return option ? option.points : 0;
}

/** Somme des points par axe à partir des réponses. */
export function computeScores(answers: Answers): Scores {
  let maturite = 0;
  let douleur = 0;
  for (const [questionId, optionIndex] of Object.entries(answers)) {
    const question = QUESTION_BY_ID[questionId];
    if (!question) continue;
    const pts = pointsFor(questionId, optionIndex);
    if (question.axis === 'maturite') maturite += pts;
    else douleur += pts;
  }
  return { maturite, douleur };
}

/** Classe un score d'axe selon le seuil (≥ 5 = élevé). */
export function classify(score: number): Level {
  return score >= HIGH_THRESHOLD ? 'eleve' : 'faible';
}

/** Attribue le profil via la matrice 2×2 (A2). */
export function attributeProfileId(scores: Scores): ProfileId {
  const maturite = classify(scores.maturite);
  const douleur = classify(scores.douleur);

  if (maturite === 'faible' && douleur === 'faible') return 'prudent';
  if (maturite === 'faible' && douleur === 'eleve') return 'deborde';
  if (maturite === 'eleve' && douleur === 'faible') return 'optimisateur';
  return 'outille'; // maturité élevée & douleur élevée
}

/** Jauge en pourcentage : round(score / 9 × 100). */
export function gauge(score: number): number {
  return Math.round((score / 9) * 100);
}

/** Construit le résultat complet (scores + jauges + profil) à partir des réponses. */
export function buildResult(answers: Answers): DiagnosticResult {
  const scores = computeScores(answers);
  return {
    scores,
    gauges: {
      maturite: gauge(scores.maturite),
      douleur: gauge(scores.douleur),
    },
    profile: PROFILES[attributeProfileId(scores)],
  };
}
