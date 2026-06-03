// Intégrité des données des cas clients (spec §9). Pas de DOM → env node.

import { describe, expect, it } from 'vitest';
import { casClients, casClientsBySlug } from './casClients';

const SLUGS_ATTENDUS = [
  'mymicronutrition',
  'xpair-assistant-formation',
  'enerj-meeting-recommandation',
];

describe('casClients — structure', () => {
  it('contient exactement les 3 cas attendus', () => {
    expect(casClients).toHaveLength(3);
    expect(casClients.map((c) => c.slug).sort()).toEqual([...SLUGS_ATTENDUS].sort());
  });

  it('slugs uniques', () => {
    const slugs = casClients.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('casClientsBySlug couvre tous les cas', () => {
    for (const slug of SLUGS_ATTENDUS) {
      expect(casClientsBySlug[slug]).toBeDefined();
      expect(casClientsBySlug[slug].slug).toBe(slug);
    }
  });
});

describe('casClients — champs requis non vides', () => {
  it.each(casClients.map((c) => [c.slug, c] as const))('%s a ses champs requis', (_slug, c) => {
    expect(c.client.trim().length).toBeGreaterThan(0);
    expect(c.role.trim().length).toBeGreaterThan(0);
    expect(c.heroPromesse.trim().length).toBeGreaterThan(0);
    expect(c.defi.trim().length).toBeGreaterThan(0);
    expect(c.transposeIntro.trim().length).toBeGreaterThan(0);

    expect(c.stack.length).toBeGreaterThan(0);
    expect(c.livraison.length).toBeGreaterThan(0);
    expect(c.chiffres.length).toBeGreaterThan(0);
    expect(c.transposeCibles.length).toBeGreaterThan(0);
    expect(c.demontre.length).toBeGreaterThan(0);
  });

  it.each(casClients.map((c) => [c.slug, c] as const))('%s — heroChiffre valide', (_slug, c) => {
    expect(c.heroChiffre.label.trim().length).toBeGreaterThan(0);
    expect(c.heroChiffre.valeur.trim().length).toBeGreaterThan(0);
  });

  it.each(casClients.map((c) => [c.slug, c] as const))(
    '%s — chaque chiffre a label + valeur non vides',
    (_slug, c) => {
      for (const chiffre of c.chiffres) {
        expect(chiffre.label.trim().length).toBeGreaterThan(0);
        // Règle de rendu : une valeur vide ne doit jamais exister en data (sinon ligne non rendue).
        expect(chiffre.valeur.trim().length).toBeGreaterThan(0);
      }
    },
  );

  it.each(casClients.map((c) => [c.slug, c] as const))('%s — secteur & période valides', (_slug, c) => {
    expect(['E-santé', 'Formation', 'Événementiel']).toContain(c.secteur);
    expect(['xpair', 'creastory']).toContain(c.periode);
  });
});
