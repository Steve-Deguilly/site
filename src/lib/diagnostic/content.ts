// Mini-diagnostic — contenu éditorial CITABLE (Partie B).
// Source UNIQUE partagée par le rendu HTML (diagnostic.astro) et le JSON-LD FAQPage,
// pour garantir que la FAQ visible et les données structurées sont strictement identiques.
// Textes FAQ repris mot pour mot de la spec B3.

/** Paragraphe d'intro autonome (~60 mots) : ce qu'est le diagnostic, pour qui, ce qu'il donne. */
export const INTRO =
  'Ce diagnostic gratuit situe votre organisation sur deux axes : votre maturité (vos outils et leur niveau de connexion) et votre douleur (le volume de tâches répétitives chronophages). En six questions, vous obtenez un profil parmi quatre et des leviers d’action concrets. Il s’adresse aux dirigeants de PME/ETI et aux responsables qui se demandent par où commencer pour automatiser — sans audit lourd ni jargon.';

/** Étapes « Comment ça marche » (statique, citable). */
export const HOW_IT_WORKS: string[] = [
  '6 questions à choix unique, posées une par une.',
  '2 minutes, montre en main.',
  'Un profil clair + 3 leviers d’action priorisés.',
  'Gratuit, sans création de compte ni email.',
  'Aucun cookie, aucune donnée personnelle stockée.',
  'Un résultat 100 % déterministe : mêmes réponses, même profil.',
];

export interface FaqItem {
  q: string;
  a: string;
}

/** FAQ citable — réponses courtes, factuelles, qui portent le cadrage de Steve (spec B3, verbatim). */
export const FAQ: FaqItem[] = [
  {
    q: 'Comment savoir si mon entreprise doit automatiser ses processus ?',
    a: 'Trois signaux le révèlent : vos équipes passent un temps important sur des tâches répétitives (ressaisie, copier-coller, mises en forme) ; ces tâches génèrent des erreurs ou des retards ; le volume augmente avec votre activité. Si les trois sont réunis, l’automatisation a un retour sur investissement rapide. Un diagnostic structuré permet de l’objectiver en quelques minutes.',
  },
  {
    q: 'Qu’est-ce qu’un diagnostic d’automatisation ?',
    a: 'C’est une évaluation courte qui situe une organisation sur deux axes : sa maturité (les outils en place et leur niveau de connexion) et sa douleur (le volume de tâches répétitives chronophages). Le croisement des deux donne un profil et des leviers d’action prioritaires, sans audit lourd préalable.',
  },
  {
    q: 'Quels processus automatiser en priorité dans une PME ?',
    a: 'Ceux qui combinent forte répétitivité, faible valeur ajoutée et fort volume : relances clients, transferts de données entre outils, génération de documents, reporting récurrent. La règle : commencer par les 2-3 processus les plus chronophages pour obtenir un résultat mesurable vite, plutôt qu’un chantier global de plusieurs mois.',
  },
  {
    q: 'Combien de temps faut-il pour automatiser un processus métier ?',
    a: 'Un processus simple et bien cadré peut être automatisé en quelques semaines. La durée dépend moins de la technique que de la clarté du processus existant : un processus documenté s’automatise vite, un processus flou doit d’abord être cartographié. L’approche par MVP — livrer un premier résultat utile, puis itérer — réduit ce délai.',
  },
  {
    q: 'Faut-il de l’IA pour automatiser, ou de simples outils suffisent-ils ?',
    a: 'La majorité des gains viennent d’automatisations classiques (connexion d’outils, workflows, transferts de données) qui ne nécessitent pas d’IA. L’IA (LLM, RAG) apporte de la valeur sur des tâches précises : analyse de documents, extraction d’information, traitement du langage. Le bon réflexe : automatiser d’abord le répétitif simple, puis ajouter l’IA là où elle change la donne.',
  },
  {
    q: 'Quelle différence entre automatisation et transformation digitale ?',
    a: 'L’automatisation traite une tâche ou un processus précis. La transformation digitale est plus large : organisation, outils, données et méthodes de travail dans leur ensemble. L’automatisation est un levier concret de la transformation digitale, mais elle n’en est qu’une composante. Une transformation réussie combine vision stratégique et exécution terrain.',
  },
];
