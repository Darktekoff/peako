# Cahier des charges - Site Peak'O Music

## 📋 Contexte du projet

**Client :** Peak'O - DJ/Producteur Hardstyle  
**Problématique :** Remplacement d'un site existant (local.fr) coûteux et peu satisfaisant  
**Budget actuel :** 170€/mois (2040€/an) - À remplacer par une solution ~35€/an  
**Objectif :** Site moderne, autonome, avec interface d'administration complète  

---

## 🎯 Objectifs

### Objectifs principaux
- Créer une présence web professionnelle pour Peak'O
- Fournir une interface d'administration intuitive pour la gestion autonome
- Réduire drastiquement les coûts d'exploitation
- Améliorer les performances et le SEO

### Objectifs secondaires
- Promouvoir les services de DJ/Production
- Présenter le portfolio musical
- Faciliter les demandes de booking
- Créer une communauté autour de l'artiste

---

## 👥 Cible

### Audience principale
- **Organisateurs d'événements** (boîtes de nuit, festivals, événements privés)
- **Fans de Hardstyle** et musique électronique
- **Autres DJs/Producteurs** pour collaborations
- **Médias spécialisés** musique électronique

### Personas
1. **L'organisateur d'événement** (25-45 ans) - Recherche un DJ professionnel
2. **Le fan de Hardstyle** (18-35 ans) - Suit l'actualité de l'artiste
3. **Le professionnel de la musique** (20-50 ans) - Partenariats/collaborations

---

## 📱 Fonctionnalités

### 🌐 Interface publique

#### Page d'accueil
- **Hero section** avec photo de l'artiste et call-to-action
- **Dernières actualités** (3-4 posts récents)
- **Prochaines dates** de concert
- **Player audio** avec dernière production
- **Liens réseaux sociaux** prominents

#### Page Bio/À propos
- **Histoire de l'artiste** (texte riche avec photos)
- **Style musical** et influences
- **Achievements** et collaborations notables
- **Photos de scène** et studio

#### Page Musique
- **Discographie** organisée par année
- **Player audio intégré** pour chaque track
- **Liens de streaming** (Spotify, Apple Music, SoundCloud, etc.)
- **Clips vidéos** et sets live

#### Page Events/Dates
- **Calendrier** des prochaines performances
- **Historique** des événements passés
- **Filtres** par type d'événement et localisation
- **Liens billetterie** quand disponible

#### Page Gallery
- **Photos de concerts** organisées par événement
- **Photos studio** et backstage
- **Mode lightbox** pour visualisation agrandie
- **Téléchargement** de photos presse (HD)

#### Page Contact/Booking
- **Formulaire de contact** structuré
- **Informations booking** (tarifs, disponibilités)
- **Rider technique** téléchargeable
- **Coordonnées** de l'agent/manager

#### Page Blog/Actualités
- **Articles** sur les sorties, événements, collaborations
- **Catégorisation** des contenus
- **Partage social** intégré
- **Commentaires** (optionnel)

### 🔐 Interface d'administration

#### Dashboard
- **Vue d'ensemble** : statistiques de visites, derniers commentaires
- **Raccourcis** vers les sections les plus utilisées
- **Notifications** de nouveaux messages

#### Gestion du contenu
- **Éditeur WYSIWYG** pour les textes
- **Upload d'images** avec redimensionnement automatique
- **Gestion des médias** (audio, vidéo)
- **Prévisualisation** avant publication

#### Gestion des événements
- **Calendrier interactif** pour ajouter/modifier les dates
- **Formulaire** complet (lieu, heure, description, lien billetterie)
- **Statuts** : confirmé, en attente, annulé

#### Gestion de la musique
- **Upload de tracks** avec métadonnées
- **Organisation** par albums/EPs/singles
- **Liens streaming** par plateforme
- **Statistiques** d'écoute si API disponibles

#### Gestion des images
- **Albums photos** par événement ou catégorie
- **Compression automatique** pour le web
- **Watermark** automatique (optionnel)
- **Tags** et descriptions

#### Messages/Booking
- **Inbox** des demandes de booking
- **Système de statuts** (nouveau, en cours, traité)
- **Réponses rapides** pré-configurées
- **Export** des contacts

---

## 🛠 Stack technique

### Frontend
- **Next.js 15** (App Router avec React 19)
- **TypeScript** pour la robustesse
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **React Hook Form** pour les formulaires

### Backend
- **Next.js API Routes** (serverless)
- **Prisma ORM** pour la base de données
- **MongoDB** comme base de données
- **Auth.js v5** pour l'authentification (compatible Next.js 15)

### Stockage et médias
- **Cloudflare R2** pour le stockage des fichiers
- **Sharp** pour le traitement d'images
- **Compression** automatique des médias

### Déploiement et monitoring
- **Vercel** pour l'hébergement
- **GitHub** pour le versioning
- **Vercel Analytics** pour le monitoring
- **Sentry** pour le error tracking (optionnel)

### Outils de développement
- **ESLint + Prettier** pour la qualité de code
- **Husky** pour les pre-commit hooks
- **Conventional Commits** pour les messages de commit

---

## 📊 Plan d'action

### 🏗 Phase 1 : Fondations (Semaine 1-2)

#### 1.1 Setup initial
- [ ] Initialiser le projet Next.js avec TypeScript
- [ ] Configurer Tailwind CSS et les outils de développement
- [ ] Setup du repository GitHub avec CI/CD basique
- [ ] Configuration de l'environnement de développement

#### 1.2 Architecture de base
- [ ] Définir la structure des dossiers
- [ ] Créer les layouts de base (public/admin)
- [ ] Implémenter le système de routing
- [ ] Setup des composants UI de base

#### 1.3 Base de données
- [ ] Modéliser les entités Prisma (User, Post, Event, Track, etc.)
- [ ] Configurer MongoDB Atlas
- [ ] Créer les migrations initiales
- [ ] Setup des seeders pour les données de test

### 🎨 Phase 2 : Interface publique (Semaine 3-4)

#### 2.1 Pages principales
- [ ] Page d'accueil avec hero section
- [ ] Page Bio/À propos
- [ ] Structure de navigation responsive
- [ ] Footer avec liens essentiels

#### 2.2 Contenu dynamique
- [ ] Système de blog/actualités
- [ ] Page événements avec calendrier
- [ ] Galerie photos avec lightbox
- [ ] Page contact avec formulaire

#### 2.3 Optimisations
- [ ] SEO meta tags dynamiques
- [ ] Optimisation des images (next/image)
- [ ] Responsive design mobile-first
- [ ] Performance et Core Web Vitals

### 🔐 Phase 3 : Administration (Semaine 5-6)

#### 3.1 Authentification
- [ ] Setup Auth.js v5 avec Prisma adapter
- [ ] Configuration credentials provider pour admin simple
- [ ] Middleware de protection des routes admin
- [ ] Pages de login/logout compatibles App Router
- [ ] Gestion des sessions avec Next.js 15

#### 3.2 Interface d'admin
- [ ] Dashboard principal avec statistiques
- [ ] CRUD pour les articles/actualités
- [ ] Gestion des événements avec calendrier
- [ ] Interface de gestion des médias

#### 3.3 Fonctionnalités avancées
- [ ] Upload de fichiers vers R2
- [ ] Éditeur WYSIWYG pour le contenu
- [ ] Prévisualisation avant publication
- [ ] Système de notifications

### 🎵 Phase 4 : Fonctionnalités spécifiques (Semaine 7-8)

#### 4.1 Musique et médias
- [ ] Player audio intégré
- [ ] Gestion de la discographie
- [ ] Upload et traitement des fichiers audio
- [ ] Intégration des plateformes de streaming

#### 4.2 Booking et contact
- [ ] Formulaire de booking structuré
- [ ] Système de gestion des demandes
- [ ] Notifications par email
- [ ] Export des données de contact

#### 4.3 Réseaux sociaux
- [ ] Intégration des flux Instagram/Twitter (si APIs disponibles)
- [ ] Boutons de partage
- [ ] Meta tags pour le partage social
- [ ] Widgets de réseaux sociaux

### 🚀 Phase 5 : Déploiement et optimisation (Semaine 9-10)

#### 5.1 Préparation production
- [ ] Configuration des variables d'environnement
- [ ] Setup du nom de domaine
- [ ] Configuration SSL et sécurité
- [ ] Tests de charge et optimisation

#### 5.2 Déploiement
- [ ] Déploiement sur Vercel
- [ ] Configuration du CDN R2
- [ ] Setup du monitoring et analytics
- [ ] Tests en environnement de production

#### 5.3 Documentation et formation
- [ ] Documentation technique du projet
- [ ] Guide d'utilisation de l'interface admin
- [ ] Formation de Peak'O à l'administration
- [ ] Procédures de sauvegarde et maintenance

---

## 📈 Métriques de succès

### Techniques
- **Performance** : Score Lighthouse > 90
- **SEO** : Score SEO > 95
- **Accessibilité** : Score A11Y > 90
- **Temps de chargement** : < 2 secondes

### Fonctionnelles
- **Autonomie** : Peak'O peut gérer 100% du contenu
- **Stabilité** : 99.9% d'uptime
- **Facilité d'usage** : Admin utilisable sans formation technique
- **Économies** : Réduction de 98% des coûts annuels

### Business
- **Augmentation du trafic** : +50% dans les 6 premiers mois
- **Taux de conversion** : Amélioration des demandes de booking
- **Engagement** : Temps passé sur le site > 2 minutes
- **Référencement** : Top 3 pour "DJ Hardstyle [région]"

---

## 💰 Budget prévisionnel

### Coûts de développement
- **Développement** : Bénévole (valeur estimée : 3000-5000€)
- **Design/UX** : Intégré au développement

### Coûts d'exploitation annuels
- **Nom de domaine** : 10€/an
- **Hébergement Vercel** : 0€ (plan hobby)
- **Base de données MongoDB** : 0€ (plan gratuit 512MB)
- **Stockage R2** : ~24€/an (estimation 2€/mois)
- **Email service** : 0€ (avec Gmail/contact form)

**Total annuel : ~35€** (vs 2040€ actuellement)  
**Économie sur 5 ans : 10 125€**

---

## 🎯 Livrables

### Techniques
- **Code source** complet avec documentation
- **Base de données** avec structure et données de test
- **Fichiers de configuration** pour tous les services
- **Scripts de déploiement** automatisés

### Documentation
- **Guide d'administration** illustré
- **Documentation technique** pour maintenance
- **Procédures de sauvegarde** et restauration
- **Guide de dépannage** courant

### Formation
- **Session de formation** à l'interface admin (2h)
- **Support technique** pendant 3 mois
- **Évolutions mineures** gratuites (6 premiers mois)

---

## ⚠️ Risques et mitigation

### Risques techniques
- **Compatibilité Auth.js v5** → Tests auth en priorité sur Vercel
- **Complexité underestimée** → Planning avec buffer de 20%
- **Problèmes d'intégration** → Tests continus et MVP itératif
- **Performance insuffisante** → Benchmarks réguliers

### Risques projet
- **Changement de scope** → Validation à chaque phase
- **Indisponibilité client** → Planning flexible
- **Migration données** → Plan de migration détaillé

### Risques business
- **Résiliation contrat local.fr** → Conseils juridiques si nécessaire
- **Perte de référencement** → Migration SEO planifiée
- **Formation insuffisante** → Support étendu prévu