// Tests du module client pur de la démo /demo (T2). Logique déterministe, hors DOM → env node.

import { describe, expect, it } from 'vitest';
import {
  buildPayload,
  extractAnswer,
  hasQuotaLeft,
  mapHttpError,
  validateQuestion,
} from './client';
import { COPY, MAX_QUESTION_LEN, MAX_QUESTIONS } from './config';

describe('validateQuestion', () => {
  it('rejette une question vide ou blanche', () => {
    expect(validateQuestion('')).toEqual({ ok: false, reason: 'empty' });
    expect(validateQuestion('   ')).toEqual({ ok: false, reason: 'empty' });
  });

  it('trim la question valide', () => {
    expect(validateQuestion('  Quelle base légale ?  ')).toEqual({
      ok: true,
      value: 'Quelle base légale ?',
    });
  });

  it('accepte pile à la longueur max et rejette au-delà', () => {
    const atMax = 'a'.repeat(MAX_QUESTION_LEN);
    expect(validateQuestion(atMax)).toEqual({ ok: true, value: atMax });
    expect(validateQuestion('a'.repeat(MAX_QUESTION_LEN + 1))).toEqual({
      ok: false,
      reason: 'too_long',
    });
  });
});

describe('buildPayload', () => {
  it('produit exactement { question, turnstileToken } (contrat figé)', () => {
    const payload = buildPayload('Q ?', 'tok123');
    expect(payload).toEqual({ question: 'Q ?', turnstileToken: 'tok123' });
    // Aucune clé en trop (pas de sessionId).
    expect(Object.keys(payload).sort()).toEqual(['question', 'turnstileToken']);
  });
});

describe('hasQuotaLeft', () => {
  it('autorise jusqu’à MAX_QUESTIONS exclus', () => {
    expect(hasQuotaLeft(0)).toBe(true);
    expect(hasQuotaLeft(MAX_QUESTIONS - 1)).toBe(true);
    expect(hasQuotaLeft(MAX_QUESTIONS)).toBe(false);
    expect(hasQuotaLeft(MAX_QUESTIONS + 5)).toBe(false);
  });
});

describe('mapHttpError', () => {
  it('403 → message anti-robot, tout le reste → générique', () => {
    expect(mapHttpError(403)).toBe(COPY.errorBadToken);
    expect(mapHttpError(429)).toBe(COPY.errorGeneric);
    expect(mapHttpError(500)).toBe(COPY.errorGeneric);
    expect(mapHttpError(502)).toBe(COPY.errorGeneric);
  });
});

describe('extractAnswer', () => {
  it('retourne la réponse trimée quand présente', () => {
    expect(extractAnswer({ answer: '  La base légale est… ' })).toBe('La base légale est…');
  });

  it('repli sur emptyAnswer si vide, manquant ou malformé', () => {
    expect(extractAnswer({ answer: '   ' })).toBe(COPY.emptyAnswer);
    expect(extractAnswer({})).toBe(COPY.emptyAnswer);
    expect(extractAnswer(null)).toBe(COPY.emptyAnswer);
    expect(extractAnswer('pas un objet')).toBe(COPY.emptyAnswer);
    expect(extractAnswer({ answer: 42 })).toBe(COPY.emptyAnswer);
  });
});
