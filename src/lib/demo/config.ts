// Démo "Chat sur document" (/demo) — configuration & libellés (T1).
//
// Constantes publiques uniquement. AUCUN secret ici :
//   - l'URL du webhook est publique par nature (visible dans le JS client → c'est Turnstile qui protège) ;
//   - la site key Turnstile est publique (le secret vit dans n8n).
// La clé Mistral et le secret Turnstile vivent côté n8n, JAMAIS dans le repo.
//
// ⚠ La phrase de refus hors-doc N'EST PAS définie ici : le system prompt (et donc le refus)
//   vit dans n8n = source de vérité. Le site se contente d'afficher `answer` renvoyé par le serveur.

/** Webhook n8n de prod (HTTPS + CORS steve-deguilly.com). Contrat figé : POST {question,turnstileToken} → 200 {answer}. */
export const WEBHOOK_URL = 'https://n8n.creastory.fr/webhook/demo-SDpro-cnil-x7k2';

/** Site key Cloudflare Turnstile (publique).
 *  ⚠ PLACEHOLDER — à remplacer par la vraie valeur fournie par Steve avant le test live.
 *  Tant que c'est ce placeholder, le widget ne validera pas réellement (test live bloqué, build OK). */
export const TURNSTILE_SITE_KEY = 'TURNSTILE_SITE_KEY_PLACEHOLDER';

/** Cap de questions par session (garde-fou coût, CÔTÉ CLIENT — le serveur n'enforce rien en v1). */
export const MAX_QUESTIONS = 10;

/** Longueur max d'une question (cohérent avec maxlength du champ + garde-fou). */
export const MAX_QUESTION_LEN = 500;

/** Lien de conversion unique du site (CTA permanent). */
export const CALCOM_URL = 'https://cal.com/steve-deguilly/30min';

/** Titre lisible du document interrogé (affiché « Vous interrogez : … »). */
export const DOC_TITLE = 'recommandations IA de la CNIL';

/** Questions d'amorce cliquables (issues de l'impl de référence, orientées doc CNIL). */
export const SUGGESTED_QUESTIONS = [
  'Quelle base légale pour développer une IA ?',
  'Quand faut-il réaliser une AIPD ?',
  'Quelles règles pour le web scraping ?',
  'Comment gérer les durées de conservation ?',
] as const;

/** Libellés UI (centralisés pour cohérence éditoriale). */
export const COPY = {
  inputPlaceholder: 'Posez votre question sur le document CNIL…',
  sendLabel: 'Demander',
  statusWriting: 'L’assistant rédige…',
  // Bandeau RGPD — wording défendable AVANT ZDR (spec §8). Ne pas durcir sans ZDR accordée.
  rgpd: 'Steve ne conserve rien · modèle européen (Mistral) · pas de réutilisation pour l’entraînement.',
  attribution: 'Source du document : CNIL — Licence Ouverte.',
  ctaPrimary: 'Réserver un échange',
  // Messages d'état/erreur affichés à l'utilisateur (rendu en textContent).
  quotaReached:
    'Limite de la démo atteinte. Parlons-en de vive voix : réservez un échange.',
  needTurnstile: 'Merci de valider le contrôle anti-robot avant d’envoyer.',
  errorBadToken: 'Contrôle anti-robot expiré. Revalidez et réessayez.',
  errorGeneric: 'Une erreur est survenue. Réessayez dans un instant.',
  errorNetwork: 'Connexion impossible. Réessayez dans un instant.',
  emptyAnswer: 'Réponse vide.',
} as const;
