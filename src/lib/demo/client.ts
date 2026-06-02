// Démo /demo — logique pure côté client (T2).
//
// Tout ce qui est testable hors DOM vit ici : validation, construction du payload,
// mapping des erreurs HTTP, extraction de la réponse, quota local.
// Le composant DemoChat.astro ne fait qu'orchestrer ces fonctions + le DOM/réseau.
//
// ⚠ Aucune génération de réponse ni de refus ici : on n'affiche QUE ce que le serveur renvoie.

import { COPY, MAX_QUESTION_LEN, MAX_QUESTIONS } from './config';
import type { DemoRequest, QuestionValidation } from './types';

/** Valide une question saisie : trim, non vide, longueur ≤ plafond. */
export function validateQuestion(raw: string): QuestionValidation {
  const value = raw.trim();
  if (value.length === 0) return { ok: false, reason: 'empty' };
  if (value.length > MAX_QUESTION_LEN) return { ok: false, reason: 'too_long' };
  return { ok: true, value };
}

/** Construit le corps de requête conforme au contrat figé. */
export function buildPayload(question: string, turnstileToken: string): DemoRequest {
  return { question, turnstileToken };
}

/** Reste-t-il du quota ? (cap côté client uniquement). */
export function hasQuotaLeft(count: number): boolean {
  return count < MAX_QUESTIONS;
}

/** Mappe un statut HTTP d'échec vers le message utilisateur (rendu en textContent). */
export function mapHttpError(status: number): string {
  // Seul 403 est spécifié par le contrat ({ error: "bad_token" }) ; tout le reste → générique.
  return status === 403 ? COPY.errorBadToken : COPY.errorGeneric;
}

/** Extrait le texte de réponse d'un corps 200, avec repli sur un message si vide/malformé. */
export function extractAnswer(data: unknown): string {
  if (data && typeof data === 'object' && typeof (data as { answer?: unknown }).answer === 'string') {
    const answer = (data as { answer: string }).answer.trim();
    return answer.length > 0 ? answer : COPY.emptyAnswer;
  }
  return COPY.emptyAnswer;
}
