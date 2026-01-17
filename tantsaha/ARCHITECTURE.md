# 📂 Structure du Projet Tantsaha Connect

## Fichiers Principaux

### 🔧 Configuration
- `package.json` - Dépendances et scripts npm
- `vite.config.js` - Configuration Vite avec proxy API
- `eslint.config.js` - Règles ESLint
- `server.js` - Serveur Express backend

### 📱 Frontend React

#### Pages (src/pages/)
- `HomePage.jsx` - Accueil avec vue d'ensemble
- `WeatherPage.jsx` - Prévisions météorologiques
- `AlertsPage.jsx` - Gestion des alertes
- `JournalPage.jsx` - Journal de culture
- `AdvicePage.jsx` - Conseils agricoles

#### Composants Common (src/components/common/)
- `Header.jsx` - En-tête avec navigation
- `Button.jsx` - Boutons réutilisables
- `Card.jsx` - Conteneurs de contenu
- `Loading.jsx` - Indicateur de chargement

#### Composants Features (src/components/features/)
- `WeatherCard.jsx` - Carte météo
- `AlertItem.jsx` - Élément d'alerte
- `ObservationItem.jsx` - Élément d'observation
- `AdviceCard.jsx` - Carte de conseil

#### Utilitaires (src/)
- `App.jsx` - Composant principal
- `main.jsx` - Point d'entrée React
- `index.css` - Styles globaux
- `App.css` - Styles de l'app
- `hooks/useFetch.js` - Hook pour requêtes API
- `utils/api.js` - Fonctions d'appels API

### 🗄️ Données (data/)
- `alerts.json` - Base de données des alertes
- `observations.json` - Base de données des observations
- `weather.json` - Prévisions météorologiques

### 📚 Documentation
- `README.md` - Guide de démarrage rapide
- `PROJECT_DOCUMENTATION.md` - Documentation complète
- `CONFIGURATION.md` - Configuration et intégrations
- `DEPLOYMENT.md` - Guide de déploiement
- `ARCHITECTURE.md` - Ce fichier

---

## Arborescence Complète

```
tantsaha/
│
├── server.js                      # Backend Express
├── package.json                   # Dépendances
├── vite.config.js                 # Configuration Vite
├── eslint.config.js               # Configuration ESLint
│
├── src/
│   ├── main.jsx                   # Point d'entrée
│   ├── App.jsx                    # Composant racine
│   ├── App.css                    # Styles app
│   ├── index.css                  # Styles globaux
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx         # Navigation principale
│   │   │   ├── Header.css
│   │   │   ├── Button.jsx         # Bouton réutilisable
│   │   │   ├── Button.css
│   │   │   ├── Card.jsx           # Conteneur
│   │   │   ├── Card.css
│   │   │   ├── Loading.jsx        # Loader
│   │   │   ├── Loading.css
│   │   │   └── index.js           # Exports
│   │   │
│   │   └── features/
│   │       ├── WeatherCard.jsx    # Carte météo
│   │       ├── WeatherCard.css
│   │       ├── AlertItem.jsx      # Élément alerte
│   │       ├── AlertItem.css
│   │       ├── ObservationItem.jsx # Élément journal
│   │       ├── ObservationItem.css
│   │       ├── AdviceCard.jsx     # Conseil
│   │       ├── AdviceCard.css
│   │       └── index.js           # Exports
│   │
│   ├── pages/
│   │   ├── HomePage.jsx           # Accueil
│   │   ├── HomePage.css
│   │   ├── WeatherPage.jsx        # Météo
│   │   ├── WeatherPage.css
│   │   ├── AlertsPage.jsx         # Alertes
│   │   ├── AlertsPage.css
│   │   ├── JournalPage.jsx        # Journal
│   │   ├── JournalPage.css
│   │   ├── AdvicePage.jsx         # Conseils
│   │   └── AdvicePage.css
│   │
│   ├── hooks/
│   │   └── useFetch.js            # Hook fetch personnalisé
│   │
│   ├── utils/
│   │   └── api.js                 # Fonctions API
│   │
│   ├── context/                   # À développer
│   │
│   └── assets/                    # Images/ressources statiques
│
├── data/
│   ├── alerts.json                # Données alertes
│   ├── observations.json          # Données journal
│   └── weather.json               # Données météo
│
├── public/                        # Fichiers statiques
│   └── index.html
│
├── README.md                      # Guide rapide
├── PROJECT_DOCUMENTATION.md       # Doc complète
├── CONFIGURATION.md               # Configuration
├── DEPLOYMENT.md                  # Déploiement
└── ARCHITECTURE.md                # Structure (ce fichier)
```

---

## Flux de Données

```
┌─────────────────┐
│   React App     │
│  (localhost     │
│   5173)         │
└────────┬────────┘
         │
         │ HTTP/JSON
         │ fetch()
         ↓
┌─────────────────┐
│  Express API    │
│ (localhost      │
│  5000)          │
└────────┬────────┘
         │
         │ Read/Write
         ↓
┌─────────────────┐
│  JSON Files     │
│  /data/*.json   │
└─────────────────┘
```

---

## Endpoints API

### GET
- `/api/weather` - Récupérer prévisions
- `/api/alerts` - Récupérer alertes
- `/api/observations` - Récupérer observations
- `/api/advice` - Récupérer conseils

### POST
- `/api/weather` - Ajouter prévision
- `/api/alerts` - Créer alerte
- `/api/observations` - Ajouter observation

### DELETE
- `/api/alerts/:id` - Supprimer alerte
- `/api/observations/:id` - Supprimer observation

---

## Styles CSS

### Couleurs Principales
- Vert primaire : `#4CAF50` (croissance, succès)
- Orange secondaire : `#FF9800` (alerte, attention)
- Rouge danger : `#f44336` (danger, suppression)
- Gris : `#333`, `#666`, `#999` (texte)

### Typographie
- Font-family: système (Apple system fonts, etc.)
- Font-sizes: 12px (petit), 14px (normal), 16px (grand), 18px+ (titres)
- Font-weight: 400 (normal), 600 (medium), 700 (bold)

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: 768px - 1280px
- Large: > 1280px

---

## Conventions de Code

### Composants React
- Toujours utiliser `React.memo` pour optimiser
- Utiliser `useCallback` pour fonctions en props
- Utiliser `useMemo` pour calculs lourds
- Pas de déclarations inline
- displayName pour chaque composant mémorisé

### CSS
- Classes avec tiret (kebab-case)
- BEM partiellement appliqué
- Mobile-first avec media queries
- Variables CSS pour couleurs communes

### Noms de Variables
- camelCase pour variables/fonctions
- PascalCase pour composants
- UPPER_CASE pour constantes
- Préfixes: `is`, `has`, `should`, `on` pour booléens/handlers

---

## Performance

### Frontend
- Code splitting automatique (Vite)
- Lazy loading des images
- Memoization des composants
- Dépendances optimisées

### Backend
- Cache headers sur API
- Validation entrées côté serveur
- Pas de requête de base de données (JSON files)
- Réponses JSON compressées

---

## Extensibilité

### Ajouter une nouvelle page
1. Créer `src/pages/NewPage.jsx`
2. Importer dans `App.jsx`
3. Ajouter route dans switch
4. Ajouter navigation dans `Header.jsx`

### Ajouter un nouveau composant
1. Créer dans `src/components/features/NewComponent.jsx`
2. Exporter dans `src/components/features/index.js`
3. Envelopper avec `React.memo`
4. Ajouter CSS correspondant

### Intégrer une API externe
1. Ajouter fonction dans `src/utils/api.js`
2. Utiliser hook `useFetch` ou `useEffect`
3. Gérer loading/error
4. Tester endpoints

### Ajouter une nouvelle culture
1. Éditer liste `CROPS` dans `JournalPage.jsx`
2. Ajouter icône correspondante
3. Tester filtrage

---

## Sécurité

- ✅ CORS configuré
- ✅ Validation côté serveur
- ✅ Pas d'authentification (à implémenter si nécessaire)
- ✅ Sanitization JSON
- ⚠️ À améliorer : Rate limiting, authentification, HTTPS

---

## Maintenance

### Dépendances
Mettre à jour régulièrement :
```bash
npm outdated
npm update
```

### Performances
Monitorer avec Chrome DevTools :
- Lighthouse
- Performance tab
- Network tab

### Logs
- Backend : `pm2 logs`
- Frontend : Browser console

---

**Dernière mise à jour** : 18 janvier 2026
**Version** : 1.0.0
