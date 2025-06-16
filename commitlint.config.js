module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nouvelle fonctionnalité
        'fix', // Correction de bug
        'docs', // Documentation
        'style', // Formatage, point-virgule manquant, etc.
        'refactor', // Refactoring du code
        'perf', // Amélioration des performances
        'test', // Ajout de tests
        'chore', // Maintenance, mise à jour des dépendances
        'revert', // Annulation d'un commit
        'build', // Changements affectant le build
        'ci', // Changements CI/CD
      ],
    ],
    'subject-case': [0],
  },
}