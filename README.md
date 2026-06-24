# steve-deguilly.com

Site personnel de **Steve Deguilly — Architecte IA & Automatisation** (freelance, Creastory Conseil).
Objectif unique : convertir les visiteurs en appels découverte de 30 min via **Cal.com**. Pas de blog, pas de formulaire de contact.

Built with **Astro 5** (`output: 'static'`) + **Tailwind 4** + CSS custom à variables, déployé sur **Cloudflare Pages** (push sur `main` = déploiement).
Repo public : https://github.com/Steve-Deguilly/site

> **Contexte projet, charte et décisions = `../CLAUDE.md` (master).** Ce README ne couvre que l'aspect technique/dev. En cas de divergence, CLAUDE.md fait foi.

---

## Pages (13 générées au build)

| Route | Rôle |
| --- | --- |
| `/` | Home one-page (conversion) |
| `/methode` | Méthode d'intervention — 4 temps (JSON-LD HowTo) |
| `/maturite` | Test de maturité interactif (ex-`/diagnostic` → 301) |
| `/projets` | Hub Réalisations + portfolio filtrable (14 missions) |
| `/projets/[slug]` | 3 cas clients détaillés (`mymicronutrition`, `xpair-assistant-formation`, `enerj-meeting-recommandation`) |
| `/demos` | Hub « Démos & POC » (cartes regroupées par catégorie) |
| `/demos/chat-document` | Démo interactive « chat sur document » — live (ex-`/demo` → 301) |
| `/demos/emails-segmentes` | POC « notes de version → emails segmentés » (Wattia) + vidéo MP4 |
| `/sdd` | Spec-driven development (hors menu, lié depuis /methode) |
| `/mentions-legales`, `/confidentialite` | Pages légales |

**Menu (5 entrées)** : Accueil · Méthode · Maturité · Réalisations · Démos & POC + CTA « Réserver un appel ».
Ajouter une démo = 1 entrée dans `data/demos.ts` + 1 page `src/pages/demos/<slug>.astro` ; le menu ne bouge pas (cf. `docs/PLAYBOOK_DEMOS.md`).

---

## Structure `src/`

```
src/
├── components/      # 15 composants Astro (Navbar, Hero, CTAFinal, DemoChat, DemoCatBlock, CasClientDetail…)
├── data/
│   ├── projets.ts     # portfolio 14 missions (filtrable sur /projets)
│   ├── casClients.ts  # 3 cas clients détaillés (spec-locked) — testé
│   └── demos.ts       # démos/POC + catégories du hub
├── lib/
│   ├── diagnostic/    # moteur du test de maturité (questions, scoring, profiles, analytics) — URL = /maturite
│   └── demo/          # logique pure de la démo chat (config, client) — testée
├── layouts/Layout.astro   # head, OG par page, JSON-LD @graph, beacons analytics
├── pages/                 # cf. tableau ci-dessus
└── styles/global.css      # design tokens (couleurs/typo) + styles globaux
```

---

## Commandes

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère dist/
npm run preview
npm test          # Vitest — 38 tests (scoring maturité, client démo, intégrité cas clients)
```

Pré-requis : Node 20.x ou 22.x, npm 10+.
> ⚠ Le build et les tests **doivent tourner en local** : le sandbox Cowork échoue sur l'archi du `node_modules`.

---

## Démo « chat sur document » (`/demos/chat-document`)

Front statique (îlot Astro) → `fetch` webhook **n8n** (`n8n.creastory.fr`) → **Mistral** (EU).
**Sans RAG** (doc CNIL injectée en entier), **sans stockage**, **Turnstile** anti-abus, rendu markdown **marked + DOMPurify** (jamais d'`innerHTML` brut).
Clé Mistral + secret Turnstile = credentials n8n, **jamais dans le repo**. Quota = client only (10 questions/session).

---

## Stack

| Couche | Outil |
| --- | --- |
| Framework | Astro 5 (static, `inlineStylesheets: 'always'`, `compressHTML`) |
| Styling | CSS à variables (`global.css`) + Tailwind 4 (dispo, peu utilisé) |
| SEO/GEO | `@astrojs/sitemap` + JSON-LD `@graph` + balises OG par page |
| Tests | Vitest (38 tests, 3 fichiers) |
| Hébergement | Cloudflare Pages (CDN mondial, déploiement auto via Git) |
| Analytics | Cloudflare Web Analytics (trafic, sans cookie) + Umami (events, cookieless) |
| RDV | Cal.com `steve-deguilly/30min` (seul canal de conversion) |

> Pas de formulaire de contact, pas de Resend, pas d'endpoint serveur. Toute la conversion passe par Cal.com.

---

## Analytics

- **Cloudflare Web Analytics** — trafic + Core Web Vitals, sans cookie ni bandeau (beacon dans `Layout.astro`). Ne gère pas les events personnalisés.
- **Events** — `lib/diagnostic/analytics.ts` émet vers **Umami** (cookieless, fallback Plausible), piloté par les env vars `PUBLIC_UMAMI_WEBSITE_ID` / `PUBLIC_UMAMI_SRC`. Events : `diagnostic_started`, `diagnostic_completed`, `diagnostic_cta_click`, `diagnostic_entry_click`. Si aucun provider chargé → no-op.
- **À valider** : confirmer en prod que les events remontent (cf. `../TASKS.md`).

---

## Cal.com

URL : `https://cal.com/steve-deguilly/30min`. Si le slug change, mettre à jour toutes les occurrences sous `src/` :

```bash
grep -rl 'cal.com/steve-deguilly' src/
# Hero, CTAFinal, Navbar, projets.astro, demos/emails-segmentes.astro, lib/demo/config.ts, lib/diagnostic/profiles.ts
```

---

## Déploiement — Cloudflare Pages

Repo GitHub `Steve-Deguilly/site` connecté à Cloudflare Pages. **Push sur `main` = déploiement.**
Build command `npm run build`, output directory `dist`, variable `NODE_VERSION = 22`.
Domaine `steve-deguilly.com` (+ redirection depuis `creastory-conseil.fr`). Redirects 301 dans `public/_redirects` (`/diagnostic` → `/maturite`, `/demo` → `/demos/chat-document`, `/demo-emails` → `/demos/emails-segmentes`). En-têtes dans `public/_headers`.

---

## Brand kit (valeurs réelles dans `src/styles/global.css`)

| Token | Valeur | Usage |
| --- | --- | --- |
| `--color-bg-cream` | `#F5F1EA` | Fond principal (crème) |
| `--color-primary` | `#2D5A4F` | Titres, accents (eucalyptus) |
| `--color-primary-deep` | `#1F4138` | Section sombre, footer |
| `--color-accent-cta` | `#A55E2D` | Boutons primaires (terracotta, AA — hover `#8B4D24`) |
| `--color-text-primary` | `#1A2421` | Texte courant |
| `--color-text-muted` | `#5A625E` | Légendes |
| Typo | Fraunces (titres) · Inter (corps) · JetBrains Mono (chiffres/preuves) | |

Couleurs uniquement via tokens `--color-*`, polices via `--font-*`. **Aucun hex ni police en dur** dans une page/composant (seule exception : les SVG de `public/`). Cf. règle CSS systémique dans `../CLAUDE.md`.

---

Steve Deguilly — steve@creastory.fr — [LinkedIn](https://linkedin.com/in/steve-deguilly)
