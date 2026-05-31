// Génère l'image OG dédiée à /diagnostic : public/og-diagnostic.jpg (1200×630).
// Rejouable. Utilise `sharp` (déjà livré avec Astro) → zéro dépendance ajoutée.
//   node scripts/generate-og.mjs
//
// Le rendu est figé dans le JPG : polices système (Georgia/Arial) suffisantes,
// identiques pour tous les viewers une fois rasterisé. Couleurs = tokens de marque.

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/og-diagnostic.jpg');

const W = 1200;
const H = 630;

// Tokens de marque (cf. global.css)
const CREAM = '#F5F1EA';
const PRIMARY = '#2D5A4F';
const TERRACOTTA = '#A55E2D';
const INK = '#1A2421';
const MUTED = '#5A625E';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .serif { font-family: Georgia, 'Times New Roman', serif; }
      .sans  { font-family: Arial, Helvetica, sans-serif; }
    </style>
  </defs>

  <!-- Fond crème -->
  <rect width="${W}" height="${H}" fill="${CREAM}"/>

  <!-- Liseré vertical terracotta (accent) -->
  <rect x="0" y="0" width="14" height="${H}" fill="${TERRACOTTA}"/>

  <!-- En-tête : monogramme + nom -->
  <g transform="translate(80, 84)">
    <rect width="56" height="56" rx="12" fill="${PRIMARY}"/>
    <text x="28" y="40" text-anchor="middle" class="serif" font-size="30" fill="${CREAM}">S</text>
    <text x="74" y="38" class="sans" font-size="24" font-weight="500" fill="${INK}">Steve Deguilly</text>
  </g>

  <!-- Étiquette -->
  <text x="80" y="250" class="sans" font-size="22" font-weight="700" letter-spacing="2" fill="${PRIMARY}">OUTIL GRATUIT · 2 MINUTES</text>

  <!-- Titre principal -->
  <text x="80" y="332" class="serif" font-size="76" font-weight="600" fill="${INK}">Diagnostic</text>
  <text x="80" y="416" class="serif" font-size="76" font-weight="600" fill="${INK}">d'automatisation</text>

  <!-- Sous-titre / promesse -->
  <text x="80" y="486" class="sans" font-size="28" fill="${MUTED}">6 questions · un profil · des leviers d'action concrets</text>

  <!-- Pied : URL -->
  <text x="80" y="566" class="sans" font-size="22" font-weight="500" fill="${PRIMARY}">steve-deguilly.com/diagnostic</text>
</svg>`;

await sharp(Buffer.from(svg))
  .flatten({ background: CREAM })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`✓ ${OUT} — ${meta.width}×${meta.height} (${meta.format})`);
