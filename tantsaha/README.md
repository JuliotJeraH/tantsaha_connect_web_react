# 🌾 Tantsaha Connect - Application Agricole pour Madagascar

Application web complète pour aider les paysans malagasy à gérer leurs cultures et leurs saisons agricoles.

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Lancement en développement
```bash
npm run dev
```

L'application s'ouvrira sur :
- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:5000

### Build production
```bash
npm run build
npm run preview
```

## 📱 Fonctionnalités

- ☀️ **Météorologie** - Prévisions météorologiques locales
- 🚨 **Alertes** - Alertes de semis et récolte
- 📔 **Journal de Culture** - Enregistrement des observations (pluie, parasites, etc.)
- 💡 **Conseils Agricoles** - Conseils pratiques par culture
- 📊 **Statistiques** - Vue d'ensemble rapide

## 🎯 Principes d'Ergonomie

- ✅ Interface simple sans texte trop dense
- ✅ Icônes pictogrammes universelles
- ✅ Navigation intuitive pour utilisateurs peu alphabétisés
- ✅ 100% responsive (mobile, tablet, desktop)
- ✅ Fonctionne avec connexion intermittente

## 💾 Données

Toutes les données sont sauvegardées localement en JSON :
- `data/alerts.json` - Alertes créées
- `data/observations.json` - Journal de culture
- `data/weather.json` - Prévisions météo

## 📚 Documentation

- [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) - Documentation complète du projet
- [CONFIGURATION.md](./CONFIGURATION.md) - Configuration et déploiement

## 🛠️ Stack Technique

- **Frontend** : React 19 + Vite + React Icons
- **Backend** : Node.js + Express + CORS
- **Données** : Fichiers JSON (persistance locale)

## 📄 Structure du Projet

```
src/
├── components/
│   ├── common/      # Composants réutilisables
│   └── features/    # Composants métier
├── pages/           # Pages principales
├── hooks/           # Hooks personnalisés
├── utils/           # Utilities (API calls, etc.)
└── context/         # Context API (extensible)
```

## 🌍 Cultures Supportées

- 🍚 Riz
- 🌽 Maïs
- 🫘 Haricots
- 🥔 Pommes de terre
- 🥜 Manioc

## ✨ Optimisations React

- React.memo pour composants stables
- useCallback pour fonctions stables
- useMemo pour calculs lourds
- Pas de fonctions inline
- Dépendances useEffect propres

## 📞 Support

Pour toute question ou amélioration, consultez la documentation complète ou ouvrez une issue.

🌾 **Faire pousser l'agriculture digitale en Afrique** 🌍
