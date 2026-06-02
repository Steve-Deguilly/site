// Démo /demo — types du contrat webhook (T2).
//
// Contrat FIGÉ avec le back-end n8n (cf. integration_front_demo / guide_import_n8n) :
//   POST { question, turnstileToken }
//   200  { answer }
//   403  { error: "bad_token" }
//   tout autre !res.ok → message générique (pas de corps garanti).
//
// ⚠ Pas de sessionId, pas de `remaining` : le serveur n'enforce ni quota ni rate-limit en v1.
//   Le quota (MAX_QUESTIONS) est purement côté client.

/** Corps de la requête envoyée au webhook. */
export interface DemoRequest {
  question: string;
  turnstileToken: string;
}

/** Réponse 200 du webhook. */
export interface DemoSuccess {
  answer: string;
}

/** Corps d'erreur connu (403). Les autres codes peuvent ne pas avoir de corps exploitable. */
export interface DemoErrorBody {
  error: string;
}

/** Résultat de la validation d'une question saisie. */
export type QuestionValidation =
  | { ok: true; value: string }
  | { ok: false; reason: 'empty' | 'too_long' };
