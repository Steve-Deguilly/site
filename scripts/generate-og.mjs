// Génère les images OG du site (1200×630) : public/og-diagnostic.jpg et public/og-projets.jpg.
// Rejouable. Utilise `sharp` (déjà livré avec Astro) → zéro dépendance ajoutée.
//   node scripts/generate-og.mjs
//
// Le rendu est figé dans le JPG : polices système (Georgia/Arial) suffisantes,
// identiques pour tous les viewers une fois rasterisé. Couleurs = tokens de marque.

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '../public');

const W = 1200;
const H = 630;

// Tokens de marque (cf. global.css)
const CREAM = '#F5F1EA';
const PRIMARY = '#2D5A4F';
const TERRACOTTA = '#A55E2D';
const INK = '#1A2421';
const MUTED = '#5A625E';

/** Construit le SVG d'une image OG. `lines` = 1 à 2 lignes de titre. */
function makeSvg({ kicker, lines, subtitle, url, titleSize = 76 }) {
  const lh = Math.round(titleSize * 1.105);
  const titleTop = 332;
  const titles = lines
    .map(
      (t, i) =>
        `<text x="80" y="${titleTop + i * lh}" class="serif" font-size="${titleSize}" font-weight="600" fill="${INK}">${t}</text>`,
    )
    .join('\n  ');
  const subY = titleTop + (lines.length - 1) * lh + 70;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .serif { font-family: Georgia, 'Times New Roman', serif; }
      .sans  { font-family: Arial, Helvetica, sans-serif; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect x="0" y="0" width="14" height="${H}" fill="${TERRACOTTA}"/>

  <g transform="translate(80, 84)">
    <rect width="56" height="56" rx="12" fill="${PRIMARY}"/>
    <text x="28" y="40" text-anchor="middle" class="serif" font-size="30" fill="${CREAM}">S</text>
    <text x="74" y="38" class="sans" font-size="24" font-weight="500" fill="${INK}">Steve Deguilly</text>
  </g>

  <text x="80" y="250" class="sans" font-size="22" font-weight="700" letter-spacing="2" fill="${PRIMARY}">${kicker}</text>

  ${titles}

  <text x="80" y="${subY}" class="sans" font-size="28" fill="${MUTED}">${subtitle}</text>

  <text x="80" y="566" class="sans" font-size="22" font-weight="500" fill="${PRIMARY}">${url}</text>
</svg>`;
}

const IMAGES = [
  {
    file: 'og-diagnostic.jpg',
    kicker: 'OUTIL GRATUIT · 2 MINUTES',
    lines: ['Diagnostic', 'd’automatisation'],
    subtitle: '6 questions · un profil · des leviers d’action concrets',
    url: 'steve-deguilly.com/diagnostic',
    titleSize: 76,
  },
  {
    file: 'og-projets.jpg',
    kicker: 'PARCOURS · 18 ANS · 4 SECTEURS',
    lines: ['Des projets livrés,', 'pas seulement présentés.'],
    subtitle: 'média B2B · formation · e-santé · événementiel',
    url: 'steve-deguilly.com/projets',
    titleSize: 64,
  },
  {
    file: 'og-mentions-legales.jpg',
    kicker: 'INFORMATIONS LÉGALES',
    lines: ['Mentions légales'],
    subtitle: 'Éditeur · directeur de publication · hébergeur · contact',
    url: 'steve-deguilly.com/mentions-legales',
    titleSize: 76,
  },
  {
    file: 'og-confidentialite.jpg',
    kicker: 'CONFIDENTIALITÉ · RGPD',
    lines: ['Confidentialité'],
    subtitle: 'Sans cookie tiers · données minimales · droits RGPD',
    url: 'steve-deguilly.com/confidentialite',
    titleSize: 76,
  },
];

for (const img of IMAGES) {
  const out = resolve(PUBLIC, img.file);
  await sharp(Buffer.from(makeSvg(img)))
    .flatten({ background: CREAM })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`✓ ${img.file} — ${meta.width}×${meta.height} (${meta.format})`);
}
