# steve-deguilly.com

Site personnel de Steve Deguilly — Directeur de transformation digitale freelance.

Built with **Astro 5** + **Tailwind 4**, déployé sur **Cloudflare Pages**.

**Démo interactive « chat sur document »** : [steve-deguilly.com/demos/chat-document](https://steve-deguilly.com/demos/chat-document)
— front statique (îlot Astro) → webhook **n8n** → **Mistral** (EU), sans RAG, sans stockage.

---

## Structure

```
site/
├── public/                  # assets servis tels quels (favicon, OG, photo)
│   ├── apple-touch-icon.png
│   ├── favicon.svg
│   ├── og-image.jpg         # 1200×630, OG / Twitter card
│   ├── profil-steve-deguilly.jpg
│   └── robots.txt
├── src/
│   ├── components/          # 9 composants Astro (Hero, PourQui, etc.)
│   ├── data/projets.ts      # 13 projets — source unique pour /projets
│   ├── layouts/Layout.astro # head + meta + OG + JSON-LD
│   ├── pages/
│   │   ├── index.astro      # one-page principal
│   │   ├── projets.astro    # table filtrable des 13 missions
│   │   ├── mentions-legales.astro
│   │   └── confidentialite.astro
│   └── styles/global.css    # design tokens (Tailwind 4 @theme) + base
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Commandes locales

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de dev (http://localhost:4321)
npm run dev

# 3. Build de production (génère dist/)
npm run build

# 4. Prévisualiser le build local
npm run preview
```

Pré-requis : **Node.js 20.x ou 22.x**, **npm 10+**.

---

## Stack & dépendances

| Couche       | Outil                     | Version |
| ------------ | ------------------------- | ------- |
| Framework    | astro                     | ^5.0    |
| Styling      | tailwindcss + @tailwindcss/vite | ^4.0    |
| Sitemap      | @astrojs/sitemap          | ^3.2    |
| Hébergement  | Cloudflare Pages          | —       |
| RDV          | Cal.com (`/steve-deguilly/30min`) | —       |
| Analytics    | Cloudflare Web Analytics  | —       |

Aucun cookie tiers, aucun tracker. RGPD-compliant out-of-the-box.

---

## Déploiement — Cloudflare Pages

### 1. Pousser sur GitHub

```bash
cd site
git init
git add .
git commit -m "Initial commit — site v1"
git branch -M main
git remote add origin git@github.com:steve-deguilly/steve-deguilly-site.git
git push -u origin main
```

### 2. Connecter Cloudflare Pages

1. Aller sur https://dash.cloudflare.com → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Sélectionner le repo `steve-deguilly-site`
3. Configuration de build :
   - **Framework preset** : Astro
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Root directory** : `/` (ou `/site` si le projet n'est pas à la racine du repo)
   - **Node version** (Environment variable) : `NODE_VERSION = 22`
4. **Save and deploy**

### 3. Brancher le domaine `steve-deguilly.com`

Le domaine est chez **Hostinger**. Deux options :

**Option A — Transférer la zone DNS chez Cloudflare (recommandé)** :
1. Dans Cloudflare Pages → **Custom domains** → **Set up a custom domain** → entrer `steve-deguilly.com`
2. Cloudflare donne 2 nameservers (ex: `xxx.ns.cloudflare.com`)
3. Sur Hostinger, dans la gestion du domaine → **Nameservers** → remplacer par ceux de Cloudflare
4. Propagation DNS : 5 min à 24 h. Le HTTPS est auto.

**Option B — Garder Hostinger comme registrar DNS** :
1. Dans Cloudflare Pages → **Custom domains** → ajouter `steve-deguilly.com` (et `www.steve-deguilly.com`)
2. Cloudflare donne des CNAME / A à pointer
3. Sur Hostinger DNS :
   - `A` pour `@` → IP fournie par Cloudflare (ou `CNAME` si supporté à l'apex)
   - `CNAME` pour `www` → `steve-deguilly-site.pages.dev`

### 4. Redirection `creastory-conseil.fr` → `steve-deguilly.com`

Sur Cloudflare (si la zone est gérée par Cloudflare) → **Rules** → **Redirect Rules** :

```
When incoming requests match: hostname equals "creastory-conseil.fr"
Then: Static redirect → https://steve-deguilly.com/$1 (301)
```

---

## Cloudflare Web Analytics

1. Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site**
2. Entrer `steve-deguilly.com`
3. Cloudflare fournit un snippet `<script>` à ajouter avant `</body>` dans `src/layouts/Layout.astro`

(Pas implémenté pour l'instant — à ajouter quand le compte est créé.)

---

## Cal.com — page de réservation

URL utilisée : `https://cal.com/steve-deguilly/30min`

Si le slug change, mettre à jour les 4 occurrences dans :
- `src/components/Hero.astro`
- `src/components/CTAFinal.astro`
- `src/pages/projets.astro` (×2)

---

## Checklist pré-mise-en-ligne

- [ ] `npm install && npm run build` passe sans erreur en local
- [ ] `npm run preview` ouvre le site sans bug visible
- [ ] Test mobile (Chrome DevTools → iPhone) : hamburger fonctionne, drawer ferme avec ESC
- [ ] Test des 4 ancres `#approche`, `#cas-concrets`, `#apropos`, `#contact`
- [ ] Test du filtre sur `/projets`
- [ ] Test du lien Cal.com (réservation factice)
- [ ] Lighthouse sur le build de prod : 95+ sur les 4 métriques
- [ ] Vérifier le rendu OG sur https://www.opengraph.xyz/url/https%3A%2F%2Fsteve-deguilly.com
- [ ] Vérifier la console : aucune erreur, aucun 404
- [ ] Vérifier `view-source:` : title, description, canonical, OG bien présents

---

## Brand kit (rappel)

| Token             | Valeur     | Usage                          |
| ----------------- | ---------- | ------------------------------ |
| `--color-bg-cream`        | `#F5F1EA` | Fond principal                 |
| `--color-primary`         | `#2D5A4F` | Titres, accents                |
| `--color-primary-deep`    | `#1F4138` | Section sombre, footer         |
| `--color-accent-cta`      | `#C97A4B` | Boutons primaires              |
| `--color-text-primary`    | `#1A2421` | Texte courant                  |
| `--color-text-muted`      | `#6B7570` | Légendes                       |
| Typo serif        | Fraunces   | Titres (H1, H2)                |
| Typo sans         | Inter      | Corps de texte                 |
| Typo mono         | JetBrains Mono | Chiffres, code             |

---

## Contact

Steve Deguilly — sdeguilly@gmail.com — [LinkedIn](https://linkedin.com/in/steve-deguilly)
