# Configuration Tantsaha Connect

## Variables d'environnement

Créez un fichier `.env.local` dans le répertoire racine :

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Tantsaha Connect
VITE_LANGUAGE=mg
```

## Configuration serveur

### Port personnalisé

Modifiez `server.js` :
```javascript
const PORT = process.env.PORT || 5000;
```

### Base de données personnalisée

Pour utiliser une base de données :
1. Remplacer `server.js` pour intégrer MongoDB/PostgreSQL
2. Adapter les routes API
3. Mettre à jour `src/utils/api.js`

## Configuration Vite

### Proxy API personnalisé

Dans `vite.config.js` :
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/api')
    }
  }
}
```

## Build production

```bash
npm run build
npm run preview
```

Les fichiers compilés seront dans le dossier `dist/`.

## Déploiement

### Heroku
```bash
heroku login
heroku create tantsaha-app
git push heroku main
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Docker

Créez `Dockerfile` :
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "server"]
```

## Intégrations futures

### API météo
- OpenWeatherMap
- Weatherbit
- local Météo API

### Notifications
- Firebase Cloud Messaging
- Twilio SMS
- Email notifications

### Authentification
- Firebase Auth
- Auth0
- Custom JWT

### Stockage cloud
- AWS S3
- Google Cloud Storage
- Azure Blob Storage
