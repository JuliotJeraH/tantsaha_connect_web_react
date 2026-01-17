# 🧪 Guide de Test - Tantsaha Connect

## Démarrage pour les Tests

```bash
cd tantsaha
npm install
npm run dev
```

Les deux serveurs doivent démarrer :
- ✅ Vite Frontend sur http://localhost:5173
- ✅ Express Backend sur http://localhost:5000

---

## 📋 Checklist de Test

### 1️⃣ Page Accueil
- [ ] L'en-tête s'affiche correctement
- [ ] La météo du jour s'affiche
- [ ] Les alertes récentes apparaissent
- [ ] Les conseils du jour s'affichent
- [ ] Les statistiques sont visibles
- [ ] Aucune erreur console

### 2️⃣ Navigation
- [ ] Clic sur "Accueil" → page accueil
- [ ] Clic sur "Météo" → page météo
- [ ] Clic sur "Alertes" → page alertes
- [ ] Clic sur "Journal" → page journal
- [ ] Clic sur "Conseils" → page conseils
- [ ] Barre de navigation reste sticky

### 3️⃣ Page Météo
- [ ] Les 3 prévisions s'affichent
- [ ] Chaque carte affiche temp + humidité + % pluie
- [ ] Les icônes météo changent selon condition
- [ ] Les conseils de semis s'affichent
- [ ] Responsive mobile/tablet/desktop

### 4️⃣ Module Alertes
- [ ] Les alertes existantes s'affichent
- [ ] Clic "Nouvelle alerte" → formulaire apparaît
- [ ] Formulaire a 4 champs : titre, description, type, date
- [ ] Types disponibles : 🌱 Semis, 🌾 Récolte, ⚠️ Alerte
- [ ] Créer une alerte → elle apparaît en haut de liste
- [ ] Clic poubelle → supprime l'alerte
- [ ] Alerte supprimée disparaît immédiatement

### 5️⃣ Module Journal
- [ ] Les observations existantes s'affichent
- [ ] Clic "Nouvelle observation" → formulaire apparaît
- [ ] Formulaire a 4 champs : type, culture, description, date
- [ ] Types : 🌧️ Pluie, 🐛 Parasites, 🌱 Semis, 🌾 Récolte
- [ ] Cultures : riz, maïs, haricots, pommes de terre, manioc
- [ ] Créer observation → elle apparaît en haut
- [ ] Filtrer par type fonctionne
- [ ] Filtrer par culture fonctionne
- [ ] Filtres combinés fonctionnent
- [ ] Supprimer observation fonctionne

### 6️⃣ Module Conseils
- [ ] Les 5+ conseils s'affichent
- [ ] Boutons filtres apparaissent
- [ ] Tous les filtres de culture fonctionnent
- [ ] Conseils s'affichent avec icônes
- [ ] Descriptions claires et concises
- [ ] Section "Comment utiliser" affichée

### 7️⃣ Responsivité

#### Mobile (< 480px)
- [ ] Ouvrir devtools (F12)
- [ ] Mode responsive → iPhone SE
- [ ] Header toujours visible
- [ ] Navigation en onglets horizontaux
- [ ] Boutons à pleine largeur
- [ ] Texte lisible (pas trop petit)
- [ ] Images redimensionnées
- [ ] Pas de scroll horizontal

#### Tablet (768px)
- [ ] Mode responsive → iPad
- [ ] Layout en 2 colonnes où applicable
- [ ] Espacement équilibré
- [ ] Tout contenu visible sans scroll

#### Desktop (> 1280px)
- [ ] Layout multi-colonnes
- [ ] Spacing généreux
- [ ] Cartes espacées
- [ ] Navigation claire

### 8️⃣ Persistance des Données

- [ ] Créer une alerte
- [ ] Rafraîchir la page (F5)
- [ ] ✅ Alerte toujours là
- [ ] Créer une observation
- [ ] Fermer le navigateur
- [ ] Relancer l'app
- [ ] ✅ Observation toujours présente
- [ ] Les fichiers JSON dans `/data/` contiennent les données

### 9️⃣ Performance

- [ ] Page charge en < 2s
- [ ] Pas de lag au clic
- [ ] Transitions fluides (animations)
- [ ] Console sans erreurs
- [ ] Pas de fuites mémoire
- [ ] Icons s'affichent correctement

### 🔟 Erreurs & Edge Cases

- [ ] Créer formulaire vide → message erreur
- [ ] Créer alerte sans titre → erreur
- [ ] Créer observation sans description → erreur
- [ ] Dates futures acceptées
- [ ] Dates passées acceptées
- [ ] Caractères spéciaux acceptés
- [ ] Supprimer dernier élément → liste vide OK

---

## 🧪 Tests Spécifiques

### Test 1 : Créer une Alerte
```
1. Aller à Alertes
2. Clic "Nouvelle alerte"
3. Remplir : 
   - Titre : "Semis riz"
   - Description : "Semis idéal cette semaine"
   - Type : Semis (🌱)
   - Date : 18/01/2026
4. Clic "Créer l'alerte"
5. ✅ Alerte apparaît en haut
6. ✅ Données sauvegardées en JSON
```

### Test 2 : Filtrer Observations
```
1. Aller à Journal
2. Créer observation : Type Pluie, Culture Riz
3. Créer observation : Type Parasites, Culture Maïs
4. Créer observation : Type Semis, Culture Riz
5. Filtrer par Type = Pluie → 1 résultat ✅
6. Filtrer par Culture = Riz → 2 résultats ✅
7. Filtrer Type=Semis + Culture=Riz → 1 résultat ✅
```

### Test 3 : Responsive Mobile
```
1. Ouvrir Chrome DevTools (F12)
2. Mode responsive → iPhone 12
3. Naviguer toutes les pages
4. Vérifier :
   - Header visible
   - Navigation fonctionnelle
   - Buttons cliquables
   - Pas de scroll horizontal
   - Texte lisible
```

### Test 4 : Persistance
```
1. Page Accueil
2. Créer alerte "Test 1"
3. Créer observation "Test 1"
4. Fermer navigateur complètement
5. Relancer navigateur
6. Aller à Accueil
7. ✅ Alerte et observation toujours présentes
8. Vérifier data/alerts.json contient les données
```

### Test 5 : Iconographie
```
1. Vérifier que toutes les icônes s'affichent :
   - Feuille 🌱 (semis)
   - Épi 🌾 (récolte)
   - Goutte 💧 (pluie)
   - Insecte 🐛 (parasites)
   - Soleil ☀️ (météo)
   - Nuage ☁️ (météo)
   - Pluie 🌧️ (météo)
2. Vérifier qu'elles sont cohérentes partout
```

---

## 🐛 Dépannage

### Problème : API non accessible
**Solution** :
```bash
# Vérifier que le serveur tourne
netstat -ano | findstr :5000

# Relancer
npm run dev
```

### Problème : Données perdues
**Solution** :
```bash
# Vérifier dossier data/
ls -la data/

# Données doivent être dans :
# - data/alerts.json
# - data/observations.json
# - data/weather.json
```

### Problème : Erreur 404 sur API
**Solution** :
1. Vérifier que backend tourne sur port 5000
2. Vérifier routes dans `server.js`
3. Vérifier URL dans `api.js`

### Problème : Layout cassé sur mobile
**Solution** :
1. Vérifier DevTools mode responsive
2. Vérifier CSS media queries
3. Vérifier base font-size

---

## ✅ Critères d'Acceptation

### Fonctionnalité
- ✅ Tous les boutons fonctionnent
- ✅ Formulaires validés
- ✅ Données persistantes
- ✅ Navigation fluide

### Ergonomie
- ✅ Interface claire
- ✅ Iconographie compréhensible
- ✅ Pas de texte trop dense
- ✅ Accessible sans connexion

### Performance
- ✅ Charge rapide (< 2s)
- ✅ Pas de lag
- ✅ Animations fluides
- ✅ Console propre

### Design
- ✅ Responsive mobile/tablet/desktop
- ✅ Couleurs cohérentes
- ✅ Spacing équilibré
- ✅ Typo lisible

---

## 📊 Résultats Attendus

Après tous les tests :
- ✅ 0 erreur console
- ✅ 0 warning critiques
- ✅ Toutes les features fonctionnent
- ✅ Application responsive
- ✅ Données persistantes
- ✅ Performance acceptable

**État final : READY FOR PRODUCTION ✅**

---

**Bon testing! 🧪**
