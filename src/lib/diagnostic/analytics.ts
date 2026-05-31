// Mini-diagnostic d'automatisation — couche analytics (A6).
//
// ⚠ Cloudflare Web Analytics (branché dans Layout.astro) NE GÈRE PAS les événements personnalisés.
//    Ce wrapper émet les events vers un provider compatible (Plausible) S'IL est présent, sinon no-op.
//    Brancher réellement Plausible reste une décision séparée (cf. plan / spec A4 §analytics).
//
// Events spec A4 :
//   - diagnostic_started                          (au démarrage)
//   - diagnostic_completed   { profil }           (à l'affichage du résultat)
//   - diagnostic_cta_click   { profil, destination } (au clic CTA)

type Props = Record<string, string>;

interface PlausibleWindow extends Window {
  plausible?: (event: string, options?: { props?: Props }) => void;
}

/** Émet un événement analytics si un provider d'events est disponible ; sinon, ne fait rien. */
export function track(event: string, props?: Props): void {
  if (typeof window === 'undefined') return;
  const fn = (window as PlausibleWindow).plausible;
  if (typeof fn === 'function') {
    fn(event, props ? { props } : undefined);
  }
}

export const ANALYTICS_EVENTS = {
  started: 'diagnostic_started',
  completed: 'diagnostic_completed',
  ctaClick: 'diagnostic_cta_click',
  // Clic sur un point d'entrée vers /diagnostic depuis le site (propriété source : hero|bloc|navbar).
  entryClick: 'diagnostic_entry_click',
} as const;
