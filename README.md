# Peak'O Music - Site Web DJ/Producteur

Site web professionnel pour Peak'O Music, développé avec Next.js 15, TypeScript et Tailwind CSS.

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- PostgreSQL (optionnel, pour la base de données)

### Installation des dépendances
```bash
npm install
```

### Configuration
1. Copier le fichier `.env.example` vers `.env`
```bash
cp .env.example .env
```

2. Configurer les variables d'environnement dans `.env` selon vos besoins

## 📁 Structure du projet

```
peako-music/
├── app/              # App Router de Next.js 15
├── components/       # Composants React réutilisables
├── lib/             # Utilitaires et fonctions helper
├── types/           # Types TypeScript
├── prisma/          # Schéma et migrations Prisma
├── public/          # Assets statiques
└── package.json     # Dépendances et scripts
```

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm run start

# Linter
npm run lint

# Formater le code
npm run format
```

## 🎨 Technologies utilisées

- **Framework**: Next.js 15 avec App Router
- **Langage**: TypeScript (mode strict)
- **Styling**: Tailwind CSS
- **Linting**: ESLint + Prettier
- **Base de données**: PostgreSQL avec Prisma ORM (configuré mais optionnel)

## 🔧 Configuration ESLint/Prettier

Le projet est configuré avec ESLint et Prettier pour maintenir un code propre et cohérent. Les règles sont définies dans :
- `eslint.config.mjs` : Configuration ESLint
- `.prettierrc` : Configuration Prettier

## 📝 Variables d'environnement

Voir `.env.example` pour la liste complète des variables disponibles. Les principales incluent :
- `DATABASE_URL` : URL de connexion PostgreSQL
- `NEXT_PUBLIC_SITE_URL` : URL du site
- APIs externes : Spotify, YouTube, SoundCloud, etc.

## 🚀 Déploiement

Le projet est prêt pour être déployé sur :
- Vercel (recommandé pour Next.js)
- Netlify
- Ou tout autre service compatible avec Next.js

## 📄 License

© 2025 Peak'O Music. Tous droits réservés.