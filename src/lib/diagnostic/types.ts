// Mini-diagnostic d'automatisation — types partagés du moteur.
// Spec : spec_diagnostic_31052026/spec_diagnostic_automatisation_31052026.md (Partie A).

/** Les 2 axes du diagnostic. */
export type Axis = 'maturite' | 'douleur';

/** Identifiants stables des 4 profils (matrice 2×2, cf. A2). */
export type ProfileId = 'deborde' | 'outille' | 'prudent' | 'optimisateur';

/** Niveau d'un axe après application du seuil (≥ 5 = élevé). */
export type Level = 'faible' | 'eleve';

/** Une réponse possible à une question : libellé + points (0–3) + aide optionnelle. */
export interface AnswerOption {
  label: string;
  points: 0 | 1 | 2 | 3;
  /** Exemple/clarification affiché en complément (les « (ex. …) » de la spec). */
  hint?: string;
}

/** Une question du questionnaire. */
export interface Question {
  /** Identifiant spec : 'Q1'..'Q6'. */
  id: string;
  /** Ordre d'affichage (1–6, alterné M, D, M, D, M, D). */
  order: number;
  axis: Axis;
  prompt: string;
  /** 4 options, points croissants de 0 à 3. */
  options: AnswerOption[];
}

/** CTA différencié par profil. */
export interface CTA {
  label: string;
  /** Clé analytics de destination : 'calcom-standard' | 'calcom-court' | 'linkedin'. */
  destination: string;
  href: string;
  external: boolean;
}

/** Un profil complet : diagnostic + leviers + CTA. */
export interface Profile {
  id: ProfileId;
  emoji: string;
  title: string;
  diagnostic: string;
  /** Exactement 3 leviers. */
  leviers: string[];
  cta: CTA;
}

/** Réponses de l'utilisateur : questionId → index de l'option choisie (0–3). */
export type Answers = Record<string, number>;

/** Scores entiers par axe (0–9). */
export interface Scores {
  maturite: number;
  douleur: number;
}

/** Jauges en pourcentage (0–100). */
export interface Gauges {
  maturite: number;
  douleur: number;
}

/** Résultat complet du diagnostic. */
export interface DiagnosticResult {
  scores: Scores;
  gauges: Gauges;
  profile: Profile;
}
