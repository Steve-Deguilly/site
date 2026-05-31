// Mini-diagnostic d'automatisation — persistance d'état (A4).
//
// sessionStorage UNIQUEMENT (first-party, éphémère, effacé à la fermeture de l'onglet).
// AUCUN cookie, AUCUNE donnée personnelle → pas de bandeau RGPD.
// ⚠ Ne JAMAIS ajouter de cookie de tracking ici.

import { QUESTIONS_BY_ORDER, TOTAL_QUESTIONS } from './questions';
import type { Answers } from './types';

const STORAGE_KEY = 'diagnostic.v1';

/** État persistant du quiz. `position` est l'index 0-based de la question affichée (0..TOTAL_QUESTIONS-1).
 *  position === TOTAL_QUESTIONS signifie « écran résultat ». */
export interface DiagnosticState {
  answers: Answers;
  position: number;
}

function emptyState(): DiagnosticState {
  return { answers: {}, position: 0 };
}

/** Charge l'état depuis sessionStorage (ou un état vide si absent / corrompu / hors navigateur). */
export function load(): DiagnosticState {
  if (typeof window === 'undefined' || !window.sessionStorage) return emptyState();
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return emptyState();
    const answers: Answers =
      parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {};
    const position =
      Number.isInteger(parsed.position) && parsed.position >= 0 && parsed.position <= TOTAL_QUESTIONS
        ? parsed.position
        : firstUnanswered(answers);
    return { answers, position };
  } catch {
    return emptyState();
  }
}

/** Sauvegarde l'état dans sessionStorage. */
export function save(state: DiagnosticState): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / mode privé : on dégrade silencieusement, le quiz reste utilisable en mémoire. */
  }
}

/** Efface l'état (« Refaire le diagnostic »). */
export function clear(): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* no-op */
  }
}

/** Index (0-based) de la 1ʳᵉ question non répondue, ou TOTAL_QUESTIONS si toutes répondues. */
export function firstUnanswered(answers: Answers): number {
  for (let i = 0; i < QUESTIONS_BY_ORDER.length; i++) {
    if (answers[QUESTIONS_BY_ORDER[i].id] === undefined) return i;
  }
  return TOTAL_QUESTIONS;
}

/** Toutes les questions ont-elles une réponse ? */
export function isComplete(answers: Answers): boolean {
  return firstUnanswered(answers) === TOTAL_QUESTIONS;
}
