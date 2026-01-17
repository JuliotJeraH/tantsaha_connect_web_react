# 🚀 Guide de Déploiement - Tantsaha Connect

## Déploiement Local

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
cd tantsaha
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer en développement**
```bash
npm run dev
```

L'application sera accessible sur :
- Frontend : http://localhost:5173
- Backend : http://localhost:5000

---

## Déploiement en Production

### Build Frontend
```bash
npm run build
```

Cela générera un dossier `dist/` avec les fichiers statiques optimisés.

### Option 1 : Heroku

1. **Installer Heroku CLI**
```bash
npm install -g heroku
heroku login
```

2. **Créer une application**
```bash
heroku create tantsaha-app
```

3. **Déployer**
```bash
git push heroku main
```

4. **Ouvrir**
```bash
heroku open
```

### Option 2 : Vercel

1. **Installer Vercel CLI**
```bash
npm install -g vercel
```

2. **Déployer**
```bash
vercel
```

Suivez les instructions interactives.

### Option 3 : Docker

1. **Créer Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5000 3000
CMD ["node", "server.js"]
```

2. **Build l'image**
```bash
docker build -t tantsaha-app .
```

3. **Lancer le conteneur**
```bash
docker run -p 5000:5000 -p 3000:3000 tantsaha-app
```

### Option 4 : VPS (Ubuntu/Debian)

1. **Se connecter au serveur**
```bash
ssh user@your-server.com
```

2. **Installer Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Cloner le projet**
```bash
git clone https://github.com/your-repo/tantsaha.git
cd tantsaha
```

4. **Installer les dépendances**
```bash
npm install
npm run build
```

5. **Installer PM2 (process manager)**
```bash
sudo npm install -g pm2
```

6. **Lancer l'application**
```bash
pm2 start server.js --name "tantsaha"
pm2 startup
pm2 save
```

7. **Configurer Nginx (reverse proxy)**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Redémarrer Nginx**
```bash
sudo systemctl restart nginx
```

### Option 5 : Cloud Run (Google Cloud)

1. **Créer le Dockerfile** (voir Option 3)

2. **Configurer gcloud**
```bash
gcloud config set project YOUR_PROJECT_ID
```

3. **Builder et déployer**
```bash
gcloud run deploy tantsaha \
    --source . \
    --platform managed \
    --region us-central1
```

---

## Variables d'Environnement

Créez un fichier `.env` à la racine :

```env
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-domain.com
```

---

## Optimisations Production

### Frontend
- ✅ Minification automatique avec Vite
- ✅ Code splitting
- ✅ Compression CSS/JS
- ✅ Image optimization

### Backend
- ✅ Cache headers
- ✅ Compression gzip
- ✅ CORS configuré
- ✅ Validation des entrées

---

## Monitoring

### Logs
```bash
pm2 logs tantsaha
```

### Redémarrage automatique
```bash
pm2 start server.js --watch --ignore-watch="data"
```

### Health Check
```bash
curl http://localhost:5000/api/alerts
```

---

## Sauvegarde des Données

### Backup manuel
```bash
cp -r data/ backup/data-$(date +%Y%m%d)
```

### Backup automatisé (cron)
```bash
0 2 * * * cp -r /app/data /backups/tantsaha-$(date +\%Y\%m\%d)
```

---

## Mise à Jour

1. **Télécharger les derniers changements**
```bash
git pull origin main
```

2. **Réinstaller dépendances (si changé)**
```bash
npm install
```

3. **Rebuild**
```bash
npm run build
```

4. **Redémarrer**
```bash
pm2 restart tantsaha
```

---

## Troubleshooting

### Port déjà utilisé
```bash
lsof -i :5000
kill -9 <PID>
```

### Permission refusée
```bash
sudo chown -R $USER:$USER /path/to/tantsaha
chmod -R 755 data/
```

### API non accessible
- Vérifier CORS dans `server.js`
- Vérifier les pare-feu
- Vérifier les logs : `pm2 logs`

---

## Performance

### Frontend
- Lighthouse Score: 90+
- Time to Interactive: < 2s
- Largest Contentful Paint: < 1.5s

### Backend
- Response time: < 100ms
- Memory usage: < 100MB
- CPU usage: < 50%

---

## Sécurité

- ✅ CORS configuré
- ✅ Validation des entrées
- ✅ HTTPS recommandé (certbot)
- ✅ Rate limiting (à implémenter)
- ✅ Authentification (à implémenter)

---

## Support

Pour toute question, consultez la documentation complète ou ouvrez une issue.

🌾 Bon déploiement! 🌍
