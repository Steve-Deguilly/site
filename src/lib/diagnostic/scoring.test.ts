// Critères d'acceptation du moteur (spec A5), un bloc de tests par scénario Gherkin.
// Le moteur étant déterministe, ces tests le verrouillent au cordeau.

import { describe, expect, it } from 'vitest';
import {
  attributeProfileId,
  buildResult,
  classify,
  computeScores,
  gauge,
} from './scoring';
import { QUESTIONS } from './questions';
import { PROFILES } from './profiles';
import type { Answers } from './types';

// Helper : construit un jeu de réponses à partir des points voulus par question.
// Comme les options sont rangées par points croissants (0,1,2,3), l'index d'option = le nombre de points.
function answersFromPoints(p: {
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
  Q5: number;
  Q6: number;
}): Answers {
  return { Q1: p.Q1, Q2: p.Q2, Q3: p.Q3, Q4: p.Q4, Q5: p.Q5, Q6: p.Q6 };
}

describe('Scénario: Calcul des scores par axe', () => {
  it('Q1=2, Q3=1, Q5=1, Q2=3, Q4=2, Q6=2 → maturité=4 et douleur=7', () => {
    const scores = computeScores(answersFromPoints({ Q1: 2, Q3: 1, Q5: 1, Q2: 3, Q4: 2, Q6: 2 }));
    expect(scores.maturite).toBe(4);
    expect(scores.douleur).toBe(7);
  });
});

describe('Scénario: Bornes', () => {
  it('tout au minimum → 0/0 ; tout au maximum → 9/9', () => {
    expect(computeScores(answersFromPoints({ Q1: 0, Q2: 0, Q3: 0, Q4: 0, Q5: 0, Q6: 0 }))).toEqual({
      maturite: 0,
      douleur: 0,
    });
    expect(computeScores(answersFromPoints({ Q1: 3, Q2: 3, Q3: 3, Q4: 3, Q5: 3, Q6: 3 }))).toEqual({
      maturite: 9,
      douleur: 9,
    });
  });

  it('toutes les combinaisons d’options donnent 0 ≤ score ≤ 9 sur chaque axe', () => {
    for (let a = 0; a <= 3; a++) {
      for (let b = 0; b <= 3; b++) {
        for (let c = 0; c <= 3; c++) {
          for (let d = 0; d <= 3; d++) {
            for (let e = 0; e <= 3; e++) {
              for (let f = 0; f <= 3; f++) {
                const { maturite, douleur } = computeScores(
                  answersFromPoints({ Q1: a, Q3: c, Q5: e, Q2: b, Q4: d, Q6: f }),
                );
                expect(maturite).toBeGreaterThanOrEqual(0);
                expect(maturite).toBeLessThanOrEqual(9);
                expect(douleur).toBeGreaterThanOrEqual(0);
                expect(douleur).toBeLessThanOrEqual(9);
              }
            }
          }
        }
      }
    }
  });
});

describe('Les 4 cas-frontière (verrouillent les deux seuils)', () => {
  it('4/4 → Le Prudent (CTA LinkedIn)', () => {
    const r = buildResult(answersFromPoints({ Q1: 2, Q3: 1, Q5: 1, Q2: 2, Q4: 1, Q6: 1 }));
    expect(r.scores).toEqual({ maturite: 4, douleur: 4 });
    expect(r.profile.id).toBe('prudent');
    expect(r.profile.cta.destination).toBe('linkedin');
  });

  it('4/5 → Le Débordé manuel (CTA Cal.com standard)', () => {
    const r = buildResult(answersFromPoints({ Q1: 2, Q3: 1, Q5: 1, Q2: 3, Q4: 1, Q6: 1 }));
    expect(r.scores).toEqual({ maturite: 4, douleur: 5 });
    expect(r.profile.id).toBe('deborde');
    expect(r.profile.cta.destination).toBe('calcom-standard');
  });

  it('5/4 → L’Optimisateur (CTA Cal.com court)', () => {
    const r = buildResult(answersFromPoints({ Q1: 3, Q3: 1, Q5: 1, Q2: 2, Q4: 1, Q6: 1 }));
    expect(r.scores).toEqual({ maturite: 5, douleur: 4 });
    expect(r.profile.id).toBe('optimisateur');
    expect(r.profile.cta.destination).toBe('calcom-court');
  });

  it('5/5 → L’Outillé sous-exploité (CTA Cal.com standard)', () => {
    const r = buildResult(answersFromPoints({ Q1: 3, Q3: 1, Q5: 1, Q2: 3, Q4: 1, Q6: 1 }));
    expect(r.scores).toEqual({ maturite: 5, douleur: 5 });
    expect(r.profile.id).toBe('outille');
    expect(r.profile.cta.destination).toBe('calcom-standard');
  });

  it('le seuil bascule bien à 5 (classify)', () => {
    expect(classify(4)).toBe('faible');
    expect(classify(5)).toBe('eleve');
  });
});

describe('Scénario: Déterminisme', () => {
  it('un même jeu de réponses calculé 100 fois → profil identique', () => {
    const answers = answersFromPoints({ Q1: 1, Q3: 2, Q5: 0, Q2: 2, Q4: 3, Q6: 1 });
    const expected = buildResult(answers).profile.id;
    for (let i = 0; i < 100; i++) {
      expect(buildResult(answers).profile.id).toBe(expected);
    }
  });
});

describe('Scénario: Contenu de l’écran résultat (jauges)', () => {
  it('chaque jauge = round(score / 9 × 100)', () => {
    expect(gauge(0)).toBe(0);
    expect(gauge(4)).toBe(44);
    expect(gauge(5)).toBe(56);
    expect(gauge(7)).toBe(78);
    expect(gauge(9)).toBe(100);
  });

  it('buildResult expose les jauges cohérentes avec les scores', () => {
    const r = buildResult(answersFromPoints({ Q1: 3, Q3: 3, Q5: 0, Q2: 2, Q4: 2, Q6: 0 }));
    expect(r.gauges.maturite).toBe(gauge(r.scores.maturite));
    expect(r.gauges.douleur).toBe(gauge(r.scores.douleur));
  });
});

describe('Cohérence des données (profils & questionnaire)', () => {
  it('chaque profil a exactement 3 leviers et un CTA non vide', () => {
    for (const profile of Object.values(PROFILES)) {
      expect(profile.leviers).toHaveLength(3);
      expect(profile.cta.label.length).toBeGreaterThan(0);
      expect(profile.cta.href.length).toBeGreaterThan(0);
      expect(profile.cta.destination.length).toBeGreaterThan(0);
    }
  });

  it('6 questions, 4 options chacune, points 0→3 dans l’ordre, 3 par axe', () => {
    expect(QUESTIONS).toHaveLength(6);
    const maturite = QUESTIONS.filter((q) => q.axis === 'maturite');
    const douleur = QUESTIONS.filter((q) => q.axis === 'douleur');
    expect(maturite).toHaveLength(3);
    expect(douleur).toHaveLength(3);
    for (const q of QUESTIONS) {
      expect(q.options.map((o) => o.points)).toEqual([0, 1, 2, 3]);
    }
  });

  it('toutes les destinations CTA possibles sont couvertes', () => {
    const destinations = new Set(Object.values(PROFILES).map((p) => p.cta.destination));
    expect(destinations).toEqual(new Set(['calcom-standard', 'calcom-court', 'linkedin']));
  });

  it('attributeProfileId couvre les 4 quadrants', () => {
    expect(attributeProfileId({ maturite: 0, douleur: 0 })).toBe('prudent');
    expect(attributeProfileId({ maturite: 0, douleur: 9 })).toBe('deborde');
    expect(attributeProfileId({ maturite: 9, douleur: 0 })).toBe('optimisateur');
    expect(attributeProfileId({ maturite: 9, douleur: 9 })).toBe('outille');
  });
});
