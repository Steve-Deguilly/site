export type Period = 'xpair' | 'creastory';

export interface Projet {
  client: string;
  mission: string;
  secteur: 'Média B2B' | 'Formation' | 'E-santé' | 'Événementiel';
  tags: string[];
  result: string;
  period: Period;
  caseSlug?: string; // si la ligne a un cas détaillé → lien "lire le cas" vers /projets/<caseSlug>
}

export const projets: Projet[] = [
  {
    client: 'myMicroNutrition',
    mission:
      "Architecture from scratch d'une plateforme SaaS sécurisée HDS/RGPD — intégration LLMs + RAG, automatisation complète des flux via n8n",
    secteur: 'E-santé',
    tags: ['Architecture', 'IA', 'RGPD'],
    result: "Création d'une BU sécurisée<br>Réduction de diagnostic (45 min → 2 min)",
    period: 'creastory',
    caseSlug: 'mymicronutrition',
  },
  {
    client: 'Batiactu Groupe',
    mission:
      "Pilotage de la refonte stratégique d'un site de communication vers un portail presse en ligne — diagnostic, roadmap, gouvernance, pilotage prestataires, conduite du changement",
    secteur: 'Média B2B',
    tags: ['Pilotage', 'Produit'],
    result: '+22% consultations<br>+14% rétention',
    period: 'creastory',
  },
  {
    client: 'GRETA France',
    mission:
      "Refonte du SI Formation d'un acteur national — parcours pédagogiques, intégration Moodle/LTI, mise en conformité RGPD, ouverture aux Académies",
    secteur: 'Formation',
    tags: ['Refonte SI', 'RGPD', 'Pilotage'],
    result: '+34% CA<br>150 000 users',
    period: 'creastory',
  },
  {
    client: 'EnerJ-meeting',
    mission:
      'Conception et lancement de la BU événementielle from scratch — concept, marque, modèle économique, première édition',
    secteur: 'Événementiel',
    tags: ['Produit', 'Pilotage'],
    result: "Création d'une BU événementielle<br>1ère édition 2016",
    period: 'xpair',
  },
  {
    client: 'EnerJ-meeting',
    mission:
      'Développement de la plateforme technique complète — 3 sites (Node.js/MongoDB), 3 apps mobiles (PWA, Android, iOS), BO client avec messagerie + prise de RDV inter-participants, CMS maison de gestion événementielle',
    secteur: 'Événementiel',
    tags: ['Architecture', 'Dev', 'Produit'],
    result: '4 500 présents / 8 000+ inscrits (éd. 2026)',
    period: 'xpair',
  },
  {
    client: 'EnerJ-meeting',
    mission:
      "Développement de l'algorithme de matchmaking B2B (v1 → v3) — scoring d'affinités inter-participants, recommandations personnalisées en fin d'inscription",
    secteur: 'Événementiel',
    tags: ['Architecture', 'IA', 'Analytics'],
    result: '27 000+ mises en relation',
    period: 'xpair',
    caseSlug: 'enerj-meeting-recommandation',
  },
  {
    client: 'EnerJ-meeting',
    mission:
      'Mise en place du CRM exposants — scoring leads, relances automatiques, validation de réception des éléments (logos, fiches produit, fonds de stand)',
    secteur: 'Événementiel',
    tags: ['Automatisation', 'Pilotage'],
    result: '—',
    period: 'xpair',
  },
  {
    client: 'XPair',
    mission:
      'Développement du back-office analytics clients — intégration GA4/GTM sur toutes les propriétés, dashboards de performance en self-service pour les annonceurs B2B',
    secteur: 'Média B2B',
    tags: ['Analytics', 'Architecture'],
    result: '8 propriétés déployées',
    period: 'xpair',
  },
  {
    client: 'XPair',
    mission:
      'Refonte des moteurs de recherche XPair.com et Emploi.xpair.com — indexation sémantique, pertinence des résultats',
    secteur: 'Média B2B',
    tags: ['Architecture', 'Produit'],
    result: '—',
    period: 'xpair',
  },
  {
    client: 'XPair',
    mission:
      'Mise en conformité RGPD des propriétés numériques du groupe — audit, rôle DPO délégué, documentation (7 domaines, 150 000+ abonnés)',
    secteur: 'Média B2B',
    tags: ['RGPD', 'Pilotage'],
    result: '7 domaines · 150K+ abonnés',
    period: 'xpair',
  },
  {
    client: 'XPair',
    mission:
      'Définition et mise en place du design system groupe — charte UI, composants réutilisables, guidelines équipes',
    secteur: 'Média B2B',
    tags: ['Produit', 'UX'],
    result: 'Design system v1',
    period: 'xpair',
  },
  {
    client: 'XPair',
    mission:
      "Conduite de 5 migrations d'infrastructure sans interruption de service (XPair ×2, EnerJ-meeting ×2, Climamaison ×1)",
    secteur: 'Média B2B',
    tags: ['Migration', 'Architecture'],
    result: '0 interruption',
    period: 'xpair',
  },
  {
    client: 'XPair',
    mission:
      'Direction de la transformation numérique du groupe pendant 6 ans au CODIR — stratégie pluriannuelle, pilotage équipes pluridisciplinaires, budget',
    secteur: 'Média B2B',
    tags: ['Pilotage', 'Stratégie'],
    result: 'CODIR · 6 ans',
    period: 'xpair',
  },
];

export const secteursFilter = ['Média B2B', 'Formation', 'E-santé', 'Événementiel'] as const;

export const competencesFilter = [
  { value: 'Pilotage', label: 'Pilotage' },
  { value: 'IA', label: 'IA & automatisation' },
  { value: 'Automatisation', label: 'Automatisation' },
  { value: 'RGPD', label: 'RGPD / HDS' },
  { value: 'Refonte SI', label: 'Refonte SI' },
  { value: 'Migration', label: 'Migration' },
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Analytics', label: 'Analytics' },
  { value: 'Produit', label: 'Produit' },
  { value: 'UX', label: 'UX' },
  { value: 'Dev', label: 'Dev' },
  { value: 'Stratégie', label: 'Stratégie' },
] as const;
