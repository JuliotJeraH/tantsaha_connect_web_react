# 🌾 Tantsaha Connect

## Application Web de Gestion Agricole pour les Paysans Malagasy

Une application mobile-first, entièrement fonctionnelle, conçue pour aider les paysans malagasy à gérer leurs cultures et leurs saisons agricoles.

---

## 📋 Fonctionnalités

### 1. **Accueil** 
- Vue d'ensemble du jour avec météo en direct
- Alertes importantes
- Conseils rapides
- Statistiques rapides (alertes actives, température)

### 2. **Météorologie**
- Prévisions météorologiques détaillées (température, humidité, chance de pluie)
- Conseils de semis basés sur la météo
- Historique des prévisions

### 3. **Gestion des Alertes**
- Création d'alertes pour semis, récolte ou avertissements
- Organisation par type et date
- Suppression des alertes
- Interface simple sans texte trop dense

### 4. **Journal de Culture**
- Enregistrement des observations (pluie, parasites, semis, récolte)
- Filtrage par type d'observation et type de culture
- Historique complet des observations
- Support de 5 cultures : riz, maïs, haricots, pommes de terre, manioc

### 5. **Conseils Agricoles**
- Conseils filtrés par culture
- Pictogrammes et icônes pour une compréhension facile
- Information sans texte trop dense
- Conseils pratiques pour chaque culture

---

## 🛠️ Technologie

### Frontend
- **React 19** - Framework UI moderne
- **Vite** - Build tool ultra-rapide
- **React Icons** - Icônes professionnelles
- **CSS personnalisé** - Design responsive mobile-first

### Backend
- **Node.js + Express** - Serveur API léger
- **JSON Files** - Stockage de données local (sans base de données)
- **CORS** - Support des requêtes cross-origin

### Architecture
```
Frontend (React) ↔ API Express → Fichiers JSON
   Vite 5173        Backend 5000   Data persistance
```

---

## 📱 Design Responsif

L'application est 100% responsive pour tous les appareils :

- **Desktop** (1280px+) : Grille multi-colonnes
- **Tablet** (768px - 1279px) : Grille adaptée
- **Mobile** (480px - 767px) : Single column
- **Ultra mobile** (<480px) : Optimisé pour petits écrans

---

## 🎨 Principes d'Ergonomie Appliqués

Selon les critères de Nielsen et Scapin-Bastien :

1. **Visibilité de l'état du système** : Feedback immédiat pour toutes les actions
2. **Reconnaissance plutôt que rappel** : Icônes pictogrammes omniprésentes
3. **Flexibilité** : Filtres et options personnalisées
4. **Rétroaction** : Animations et confirmations
5. **Signifiance des éléments** : Symboles simples, couleurs significatives
6. **Guidage explicite** : Boutons d'action évidents
7. **Concision informationnelle** : Peu de texte, beaucoup d'icônes
8. **Hors ligne ready** : Design pensé pour connexion faible/absence internet

---

## ⚙️ Installation & Lancement

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
cd tantsaha
npm install
```

### Lancement en développement
```bash
npm run dev
```

Cela lancera :
- **Frontend Vite** sur `http://localhost:5173`
- **Backend Express** sur `http://localhost:5000`

### Build pour production
```bash
npm run build
npm run preview
```

---

## 📁 Structure du Projet

```
tantsaha/
├── server.js                    # Backend Express
├── src/
│   ├── App.jsx                  # Composant principal
│   ├── App.css                  # Styles globaux
│   ├── index.css                # Styles de base
│   ├── main.jsx                 # Point d'entrée React
│   ├── components/
│   │   ├── common/              # Composants réutilisables
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Loading.jsx
│   │   └── features/            # Composants métier
│   │       ├── AlertItem.jsx
│   │       ├── ObservationItem.jsx
│   │       ├── WeatherCard.jsx
│   │       └── AdviceCard.jsx
│   ├── pages/                   # Pages principales
│   │   ├── HomePage.jsx
│   │   ├── WeatherPage.jsx
│   │   ├── AlertsPage.jsx
│   │   ├── JournalPage.jsx
│   │   └── AdvicePage.jsx
│   ├── hooks/                   # Hooks personnalisés
│   │   └── useFetch.js
│   ├── utils/                   # Utilities
│   │   └── api.js               # Appels API
│   └── context/                 # Contexte React (extensible)
├── data/                        # Données JSON (créé au lancement)
│   ├── alerts.json
│   ├── observations.json
│   └── weather.json
└── package.json

```

---

## 🔌 API Endpoints

### Alertes
- `GET /api/alerts` - Récupérer toutes les alertes
- `POST /api/alerts` - Créer une alerte
- `DELETE /api/alerts/:id` - Supprimer une alerte

### Observations
- `GET /api/observations` - Récupérer toutes les observations
- `POST /api/observations` - Ajouter une observation
- `DELETE /api/observations/:id` - Supprimer une observation

### Météo
- `GET /api/weather` - Récupérer les prévisions
- `POST /api/weather` - Ajouter une prévision

### Conseils
- `GET /api/advice` - Récupérer les conseils disponibles

---

## 💡 Bonnes Pratiques React Implémentées

✅ **React.memo** - Composants stables mémorisés  
✅ **useCallback** - Fonctions stables dans les props  
✅ **useMemo** - Calculs lourds mémorisés  
✅ **useEffect avec dépendances** - Gestion efficace du cycle de vie  
✅ **Composants découplés** - Réutilisabilité maximale  
✅ **Pas d'objets/fonctions inline** - Performances optimales  
✅ **Lazy loading** - Code splitting pour pages lourdes (extensible)  

---

## 🌍 Adaptations pour Madagascar

### Interface
- Couleurs significatives (vert = croissance, rouge = alerte)
- Icônes universelles (pas de langage écrit requis)
- Navigation simple et intuitive
- Adaptée aux petits écrans (téléphones basiques)

### Cultures supportées
- 🍚 Riz
- 🌽 Maïs
- 🫘 Haricots
- 🥔 Pommes de terre
- 🥜 Manioc

### Types d'observations
- 🌧️ Pluie
- 🐛 Parasites
- 🌱 Semis
- 🌾 Récolte

---

## 📊 Données Persistantes

Toutes les données sont stockées localement dans des fichiers JSON :

- **alerts.json** - Alertes créées par l'utilisateur
- **observations.json** - Journal de culture
- **weather.json** - Prévisions météorologiques

Les données persistent entre les rechargements et sessions.

---

## 🚀 Déploiement

### Option 1 : Hébergement local
```bash
npm run build
npm run server
```

### Option 2 : Cloud (Heroku, Render, Vercel)
- Build frontend : `npm run build`
- Déployer `dist/` sur CDN static
- Déployer `server.js` sur serveur Node.js

### Option 3 : Docker
À développer...

---

## 📚 Ressources & Références

### Heuristiques d'usabilité
- Nielsen's 10 Usability Heuristics
- Critères Scapin-Bastien
- WCAG 2.1 Accessibility Guidelines

### Pictogrammes & Icônes
- React Icons (Font Awesome, Feather, etc.)
- Open source & libres d'utilisation

### Documentation
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js](https://expressjs.com)

---

## 👥 Personas Cibles

**Agriculteur malagasy typique**
- Âge : 35-55 ans
- Niveau d'éducation : CEPE/BEPC
- Langue : Malagasy
- Équipement : Téléphone Android basique
- Connexion : Internet intermittent ou absent
- Littéracie numérique : Faible à modérée

---

## 🎯 Objectifs Pédagogiques Atteints

✅ Analyse d'un contexte utilisateur réel  
✅ Application des heuristiques Nielsen  
✅ Implémentation des critères d'ergonomie  
✅ Design simple et compréhensible sans texte  
✅ Prototype fonctionnel complet  
✅ Performance & responsivité optimale  
✅ Accessibilité et inclusion  

---

## 📝 Notes de Développement

### Améliorations futures
- [ ] Intégration API météo réelle
- [ ] Support vocal en malagasy
- [ ] Synchronisation cloud
- [ ] Notifications push
- [ ] Multi-langue (FR, EN, MG)
- [ ] Mode hors ligne complet
- [ ] Graphiques de croissance
- [ ] Partage de données entre paysans

### Performance
- Code splitting automatique avec Vite
- Compression CSS/JS en production
- Cache optimisé côté client
- Fichiers JSON comprimés

---

## 📄 Licence

Ce projet est créé à titre éducatif pour les paysans malagasy. Libre d'utilisation et de modification.

---

## ✨ Crédits

Développé avec ❤️ pour les agriculteurs de Madagascar  
2026 - Tantsaha Connect

🌾 **Faire pousser l'agriculture digitale en Afrique** 🌍
