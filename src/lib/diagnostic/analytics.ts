// Mini-diagnostic d'automatisation — couche analytics (A6).
//
// ⚠ Cloudflare Web Analytics (branché dans Layout.astro) NE GÈRE PAS les événements personnalisés.
//    Ce wrapper émet les events vers Umami (cookieless) s'il est chargé, avec fallback Plausible.
//    Si aucun provider n'est présent (ex. build local sans env var), le wrapper est un no-op.
//    Umami est piloté par les env vars PUBLIC_UMAMI_WEBSITE_ID / PUBLIC_UMAMI_SRC (cf. Layout.astro).
//
// Events spec A4 :
//   - diagnostic_started                          (au démarrage)
//   - diagnostic_completed   { profil }           (à l'affichage du résultat)
//   - diagnostic_cta_click   { profil, destination } (au clic CTA)

type Props = Record<string, string>;

interface AnalyticsWindow extends Window {
  umami?: { track: (event: string, data?: Props) => void };
  plausible?: (event: string, options?: { props?: Props }) => void;
}

/** Émet un événement analytics vers Umami (ou Plausible en fallback) si disponible ; sinon, no-op. */
export function track(event: string, props?: Props): void {
  if (typeof window === 'undefined') return;
  const w = window as AnalyticsWindow;
  if (typeof w.umami?.track === 'function') {
    w.umami.track(event, props);
  } else if (typeof w.plausible === 'function') {
    w.plausible(event, props ? { props } : undefined);
  }
}

export const ANALYTICS_EVENTS = {
  started: 'diagnostic_started',
  completed: 'diagnostic_completed',
  ctaClick: 'diagnostic_cta_click',
  // Clic sur un point d'entrée vers /diagnostic depuis le site (propriété source : hero|bloc|navbar).
  entryClick: 'diagnostic_entry_click',
} as const;
