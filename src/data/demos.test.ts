import { describe, it, expect } from 'vitest';
import { demos, categories, demosOf } from './demos';

describe('catalogue des démos', () => {
  it('la rubrique Outils en ligne est en tête du hub', () => {
    expect(categories[0].id).toBe('outils-en-ligne');
  });

  it('les slugs sont uniques', () => {
    const slugs = demos.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('toute carte de la rubrique Outils en ligne pointe vers batiment-ia.fr', () => {
    for (const d of demosOf('outils-en-ligne')) {
      expect(d.href).toMatch(/^https:\/\/batiment-ia\.fr\//);
    }
  });

  it('la rubrique Outils en ligne compte trois cartes', () => {
    expect(demosOf('outils-en-ligne')).toHaveLength(3);
  });

  it("l'outil sur demande ne porte pas le pill Testez-moi", () => {
    const dpgf = demos.find((d) => d.slug === 'bai-rapprochement-dpgf');
    expect(dpgf?.live).toBeUndefined();
  });

  it('aucun pitch ne prétend que les trois outils sont testables', () => {
    for (const d of demos) {
      expect(d.pitch).not.toMatch(/trois outils testables|3 outils testables/i);
    }
  });

  it('aucun tiret cadratin dans les libellés publiés', () => {
    for (const d of demos) {
      expect(`${d.title} ${d.pitch} ${d.cta} ${d.tag}`).not.toContain('—');
    }
    for (const c of categories) {
      expect(`${c.label} ${c.blurb}`).not.toContain('—');
    }
  });
});
