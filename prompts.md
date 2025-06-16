Prompts Claude Code - Site Peak'O Music
📋 Instructions générales

Copier/coller ces prompts un par un dans Claude Code
Attendre que chaque étape soit terminée avant de passer à la suivante
Vérifier que chaque commande s'exécute sans erreur
Adapter les noms de fichiers/dossiers selon votre structure


🏗 PHASE 1 : SETUP INITIAL
Prompt 1.1 - Initialisation du projet
Créer un nouveau projet Next.js 15 avec TypeScript pour un site de DJ/Producteur nommé "Peak'O Music". 

Configuration requise :
- Next.js 15 avec App Router
- TypeScript strict
- Tailwind CSS
- ESLint + Prettier
- Structure de dossiers professionnelle : /app, /components, /lib, /types, /prisma
- Package.json avec scripts de dev, build, start
- Fichier .env.example avec variables d'environnement commentées
- .gitignore complet (Node, Next.js, env, IDE)
- README.md basique avec instructions de setup

Installer également : @types/node, @types/react, @types/react-dom
Prompt 1.2 - Configuration Tailwind et outils dev
Configurer Tailwind CSS avec :
- Configuration personnalisée dans tailwind.config.js avec couleurs pour un site de DJ (noir, rouge, blanc, gradients)
- Fonts personnalisées (Inter pour le texte, font display pour les titres)
- Animations personnalisées pour les effets hover
- Configuration responsive complète

Ajouter et configurer :
- Prettier avec config pour Tailwind (.prettierrc)
- ESLint avec règles strictes pour TypeScript et React
- Husky pour pre-commit hooks
- Lint-staged pour formatter automatiquement

Créer un fichier globals.css propre avec les styles de base.
Prompt 1.3 - Setup Prisma et MongoDB
Configurer Prisma avec MongoDB :
- Installer prisma, @prisma/client, @auth/prisma-adapter
- Créer le schema.prisma avec :
  - Provider MongoDB
  - Modèles de base : User, Post, Event, Track, Gallery, ContactMessage
  - Relations appropriées entre les modèles
  - Index pour les performances

Créer les types TypeScript correspondants dans /types
Ajouter les scripts prisma dans package.json
Créer un fichier lib/prisma.ts pour la connexion singleton
Ajouter les variables d'env pour DATABASE_URL dans .env.example

🎨 PHASE 2 : STRUCTURE DE BASE
Prompt 2.1 - Layout et composants de base
Créer la structure de layout pour le site :

1. app/layout.tsx avec :
   - Metadata SEO optimisé pour DJ/Producteur
   - Fonts (Inter + display font)
   - Structure HTML5 sémantique

2. Composants dans /components/ui/ :
   - Header avec navigation responsive et logo
   - Footer avec liens sociaux et copyright
   - Navigation mobile avec hamburger menu
   - Bouton scroll-to-top

3. Composants dans /components/layout/ :
   - Container wrapper avec padding responsive
   - Section wrapper avec espacement cohérent
   - GridLayout pour galleries

Utiliser des icônes Lucide React pour la navigation et les réseaux sociaux.
Prompt 2.2 - Pages publiques de base
Créer les pages publiques principales dans /app :

1. page.tsx (Homepage) :
   - Hero section avec photo DJ, titre, sous-titre
   - Section "Latest News" (3 derniers posts)
   - Section "Upcoming Events" (prochaines dates)
   - Audio player simple
   - Call-to-action booking

2. about/page.tsx :
   - Biographie de l'artiste
   - Photos de scène/studio
   - Style musical et influences
   - Timeline des achievements

3. music/page.tsx :
   - Grid de tracks/albums
   - Player audio intégré
   - Liens vers plateformes streaming
   - Filtres par année/type

4. events/page.tsx :
   - Liste des événements (passés/futurs)
   - Calendrier view
   - Détails par événement
   - Liens billetterie

Utiliser des composants réutilisables et du contenu de placeholder réaliste pour un DJ Hardstyle.
Prompt 2.3 - Système de composants UI
Créer un système de design complet dans /components/ui/ :

1. Composants de base :
   - Button (variants: primary, secondary, ghost, outline)
   - Card avec différentes variantes
   - Badge pour les tags/genres
   - Input et Textarea pour formulaires
   - Modal/Dialog réutilisable

2. Composants spécialisés :
   - AudioPlayer avec controls custom
   - EventCard pour afficher les événements
   - TrackCard pour la discographie
   - GalleryItem avec lightbox
   - ContactForm avec validation

3. Animations avec Framer Motion :
   - Fade in au scroll
   - Hover effects pour les cards
   - Loading states
   - Page transitions fluides

Tout doit être accessible (ARIA), responsive et typé avec TypeScript.

🔐 PHASE 3 : AUTHENTIFICATION ET ADMIN
Prompt 3.1 - Setup Auth.js v5
Configurer Auth.js v5 pour l'authentification admin :

1. Installation et configuration :
   - Installer @auth/nextjs-adapter, @auth/prisma-adapter
   - Créer app/api/auth/[...nextauth]/route.ts
   - Configuration avec Credentials provider pour un admin unique
   - Adapter Prisma pour MongoDB
   - Types TypeScript pour les sessions

2. Middleware d'authentification :
   - middleware.ts pour protéger les routes /admin/*
   - Redirection automatique vers login si non authentifié
   - Gestion des erreurs d'auth

3. Pages d'auth :
   - app/auth/signin/page.tsx (page de login)
   - app/auth/signout/page.tsx (confirmation logout)
   - Formulaire de login avec validation
   - Messages d'erreur appropriés

4. Variables d'environnement :
   - NEXTAUTH_SECRET, NEXTAUTH_URL
   - Credentials admin (email/password) hashés
Prompt 3.2 - Interface admin de base
Créer l'interface d'administration dans /app/admin/ :

1. Layout admin (layout.tsx) :
   - Sidebar avec navigation admin
   - Header avec infos utilisateur et logout
   - Breadcrumbs pour la navigation
   - Design distinct de la partie publique

2. Dashboard principal (page.tsx) :
   - Statistiques de base (nb articles, événements, messages)
   - Derniers messages de contact
   - Raccourcis vers les sections importantes
   - Graphiques simples si possible

3. Navigation admin :
   - Dashboard
   - Gestion du contenu (posts/actualités)
   - Gestion des événements
   - Gestion de la musique
   - Galerie photos
   - Messages de contact
   - Paramètres

Protéger toutes les routes avec le middleware d'authentification.
Prompt 3.3 - CRUD pour le contenu
Créer les interfaces CRUD pour la gestion de contenu :

1. Gestion des posts/actualités (/app/admin/posts/) :
   - Liste des posts avec pagination
   - Formulaire création/édition avec éditeur riche
   - Gestion des statuts (draft, published)
   - Upload d'images pour les articles
   - Preview avant publication

2. Gestion des événements (/app/admin/events/) :
   - Calendrier interactif pour visualiser les événements
   - Formulaire avec : titre, date, lieu, description, lien billetterie
   - Statuts : confirmé, en attente, annulé
   - Import/export des événements

3. API Routes correspondantes :
   - /api/admin/posts (GET, POST, PUT, DELETE)
   - /api/admin/events (GET, POST, PUT, DELETE)
   - Validation des données avec Zod
   - Gestion des erreurs appropriée
   - Middleware d'authentification sur toutes les routes admin

Utiliser React Hook Form pour les formulaires avec validation côté client.

🗃 PHASE 4 : STOCKAGE ET MÉDIAS
Prompt 4.1 - Configuration Cloudflare R2
Configurer le stockage de fichiers avec Cloudflare R2 :

1. Setup du client R2 :
   - Installer @aws-sdk/client-s3 (compatible R2)
   - Créer lib/r2-client.ts avec configuration S3-compatible
   - Variables d'environnement pour R2 (endpoint, access key, secret, bucket)

2. Service d'upload :
   - lib/upload.ts avec fonctions upload/delete
   - Gestion des types de fichiers (images, audio, documents)
   - Génération d'URLs publiques
   - Compression automatique des images avec Sharp

3. API Routes pour upload :
   - /api/upload/image (pour les photos)
   - /api/upload/audio (pour les tracks)
   - /api/upload/document (pour les riders/docs)
   - Validation des types MIME
   - Limitation de taille des fichiers
   - Génération de noms uniques

4. Composants upload :
   - FileUploader réutilisable avec drag & drop
   - ImageUploader avec preview
   - Progress bars pour les uploads
   - Gestion des erreurs d'upload
Prompt 4.2 - Gestion des médias admin
Créer l'interface de gestion des médias dans l'admin :

1. Gestionnaire de musique (/app/admin/music/) :
   - Upload de tracks audio
   - Formulaire avec métadonnées (titre, genre, année, description)
   - Player intégré pour preview
   - Liens vers plateformes de streaming
   - Organisation par albums/EPs/singles

2. Gestionnaire de galerie (/app/admin/gallery/) :
   - Upload multiple d'images avec drag & drop
   - Organisation par albums/événements
   - Compression automatique (web + haute résolution)
   - Système de tags pour organisation
   - Batch operations (delete, move, tag)

3. Gestionnaire de documents (/app/admin/documents/) :
   - Upload de riders techniques
   - Press kit et photos presse
   - Contrats et documents légaux
   - Gestion des permissions d'accès

4. API correspondantes :
   - /api/admin/music (CRUD tracks)
   - /api/admin/gallery (CRUD photos + albums)
   - /api/admin/documents (CRUD documents)
   - Intégration avec le stockage R2

🎵 PHASE 5 : FONCTIONNALITÉS SPÉCIFIQUES
Prompt 5.1 - Audio Player et musique
Développer le système audio du site :

1. Audio Player avancé (/components/AudioPlayer/) :
   - Player HTML5 custom avec controls stylés
   - Playlist support pour écouter plusieurs tracks
   - Visualisation de waveform (simple bars)
   - Volume control et mute
   - Progress bar interactive
   - Keyboard shortcuts (space, arrows)

2. Intégration dans les pages :
   - Player persistant en bas de page (comme Spotify)
   - Mini-player qui reste visible pendant navigation
   - Auto-play du prochain track en playlist
   - Gestion de l'état global du player

3. Streaming platforms integration :
   - Boutons vers Spotify, Apple Music, SoundCloud
   - Récupération automatique des liens si APIs disponibles
   - Embed de playlists Spotify/SoundCloud

4. API pour les tracks :
   - /api/tracks avec filtres (genre, année, album)
   - Statistiques d'écoute basiques
   - Gestion des favoris utilisateurs (optionnel)
Prompt 5.2 - Système de contact et booking
Créer le système de contact et booking :

1. Formulaire de contact public (/components/ContactForm/) :
   - Formulaire multi-étapes (type demande → détails → confirmation)
   - Types : Booking, Press, Collaboration, General
   - Validation côté client et serveur
   - Protection anti-spam (honeypot + rate limiting)
   - Confirmation par email automatique

2. Interface admin des messages (/app/admin/messages/) :
   - Inbox avec statuts (nouveau, lu, traité, archivé)
   - Filtres par type de demande et date
   - Réponse rapide avec templates pré-configurés
   - Export des contacts pour mailing
   - Notifications de nouveaux messages

3. API pour les messages :
   - /api/contact (POST pour nouveau message)
   - /api/admin/messages (CRUD avec filtres)
   - Envoi d'emails avec service externe (Resend ou Nodemailer)
   - Notifications push/email pour l'admin

4. Templates d'emails :
   - Confirmation de réception pour l'expéditeur
   - Notification pour l'admin
   - Templates de réponse type
   - Design HTML responsive pour emails
Prompt 5.3 - SEO et optimisations
Optimiser le site pour le SEO et les performances :

1. SEO avancé :
   - Metadata dynamiques pour chaque page
   - Open Graph pour partage social (avec images générées)
   - JSON-LD schema markup pour artiste/événements/musique
   - Sitemap.xml automatique
   - robots.txt optimisé

2. Optimisations images :
   - next/image avec placeholder blur
   - Génération automatique de tailles multiples
   - Format WebP avec fallback
   - Lazy loading intelligent
   - Optimisation des images R2 avec transformations

3. Performance :
   - Bundle analyzer pour identifier les gros imports
   - Lazy loading des composants non-critiques
   - Préchargement des pages importantes
   - Service Worker pour cache (optionnel)
   - Monitoring Core Web Vitals

4. Accessibilité :
   - Navigation au clavier complète
   - ARIA labels appropriés
   - Contraste de couleurs validé
   - Screen reader friendly
   - Focus management dans les modals

🚀 PHASE 6 : DÉPLOIEMENT ET FINALISATION
Prompt 6.1 - Configuration production
Préparer le déploiement en production :

1. Variables d'environnement :
   - Fichier .env.production avec toutes les variables
   - Secrets sécurisés (auth, database, R2)
   - URLs de production
   - Configuration email service

2. Configuration Vercel :
   - vercel.json avec redirections si nécessaire
   - Variables d'environnement dans Vercel dashboard
   - Configuration du domaine custom
   - Headers de sécurité (CSP, HSTS, etc.)

3. Base de données production :
   - MongoDB Atlas cluster production
   - Backup automatique configuré
   - Monitoring et alertes
   - Index optimisés pour la performance

4. Tests de déploiement :
   - Build de production sans erreurs
   - Tests des fonctionnalités critiques
   - Tests sur différents devices/navigateurs
   - Validation W3C du HTML généré
Prompt 6.2 - Documentation et formation
Créer la documentation complète du projet :

1. Documentation technique (/docs/) :
   - README détaillé avec setup instructions
   - Architecture du projet et choix techniques
   - Guide de contribution et standards de code
   - API documentation avec exemples
   - Troubleshooting courant

2. Guide utilisateur pour Peak'O :
   - Manuel d'utilisation de l'interface admin (PDF)
   - Screenshots et explications étape par étape
   - Guides vidéo pour les tâches principales
   - FAQ et résolution de problèmes courants
   - Contacts support et procédures d'urgence

3. Scripts de maintenance :
   - Scripts de backup automatique
   - Scripts de migration de données
   - Monitoring et health checks
   - Procédures de rollback

4. Formation client :
   - Checklist de formation complète
   - Exercices pratiques pour Peak'O
   - Templates de contenu pré-remplis
   - Guide des bonnes pratiques SEO
Prompt 6.3 - Tests finaux et mise en ligne
Effectuer les tests finaux et la mise en ligne :

1. Tests complets :
   - Tests unitaires pour les fonctions critiques
   - Tests d'intégration des APIs
   - Tests end-to-end des parcours utilisateur
   - Tests de performance avec Lighthouse
   - Tests de sécurité basiques

2. Migration du contenu :
   - Export du contenu existant si possible
   - Import dans la nouvelle base de données
   - Vérification de l'intégrité des données
   - Tests avec le contenu réel

3. Mise en ligne :
   - Déploiement sur Vercel
   - Configuration DNS pour le domaine
   - Tests en environnement de production
   - Monitoring des erreurs les premiers jours

4. Optimisations post-lancement :
   - Analyse des performances réelles
   - Optimisations basées sur les métriques
   - Ajustements SEO selon Search Console
   - Collecte des premiers retours utilisateur

5. Handover client :
   - Session de formation finale avec Peak'O
   - Remise de tous les accès et documentations
   - Support technique défini pour les premières semaines
   - Plan de maintenance et évolutions futures