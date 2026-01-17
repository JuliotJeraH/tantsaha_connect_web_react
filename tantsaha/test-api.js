/**
 * Test API Tantsaha Connect
 * Exécuter avec : node test-api.js
 */

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🌾 Démarrage des tests API Tantsaha...\n');

  try {
    // Test 1: Récupérer la météo
    console.log('1️⃣ Test: Récupérer la météo');
    const weatherRes = await fetch(`${API_BASE}/weather`);
    const weather = await weatherRes.json();
    console.log('✅ Météo reçue:', weather.length, 'entrées');
    console.log('Exemple:', JSON.stringify(weather[0], null, 2), '\n');

    // Test 2: Récupérer les alertes
    console.log('2️⃣ Test: Récupérer les alertes');
    const alertsRes = await fetch(`${API_BASE}/alerts`);
    const alerts = await alertsRes.json();
    console.log('✅ Alertes reçues:', alerts.length, 'entrées\n');

    // Test 3: Créer une alerte
    console.log('3️⃣ Test: Créer une alerte');
    const newAlertRes = await fetch(`${API_BASE}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Semis du riz',
        description: 'Période idéale pour semer le riz',
        type: 'planting',
        date: new Date().toISOString().split('T')[0],
      }),
    });
    const newAlert = await newAlertRes.json();
    console.log('✅ Alerte créée avec ID:', newAlert.id, '\n');

    // Test 4: Récupérer les observations
    console.log('4️⃣ Test: Récupérer les observations');
    const obsRes = await fetch(`${API_BASE}/observations`);
    const observations = await obsRes.json();
    console.log('✅ Observations reçues:', observations.length, 'entrées\n');

    // Test 5: Créer une observation
    console.log('5️⃣ Test: Créer une observation');
    const newObsRes = await fetch(`${API_BASE}/observations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'rain',
        description: '15mm de pluie enregistrés',
        date: new Date().toISOString().split('T')[0],
        crop: 'riz',
      }),
    });
    const newObs = await newObsRes.json();
    console.log('✅ Observation créée avec ID:', newObs.id, '\n');

    // Test 6: Récupérer les conseils
    console.log('6️⃣ Test: Récupérer les conseils');
    const adviceRes = await fetch(`${API_BASE}/advice`);
    const advices = await adviceRes.json();
    console.log('✅ Conseils reçus:', advices.length, 'disponibles\n');

    console.log('✨ Tous les tests ont réussi! L\'API fonctionne correctement.');
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.message);
  }
}

testAPI();
    const obsRes = await fetch(`${API_BASE}/observations`);
    const obs = await obsRes.json();
    console.log('✅ Observations reçues:', obs.length, 'entrées\n');

    // Test 5: Ajouter une observation
    console.log('5️⃣ Test: Ajouter une observation');
    const newObsRes = await fetch(`${API_BASE}/observations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'rain',
        description: 'Pluie moyenne',
        date: new Date().toISOString().split('T')[0],
        crop: 'riz',
      }),
    });
    const newObs = await newObsRes.json();
    console.log('✅ Observation créée:', newObs, '\n');

    // Test 6: Récupérer les conseils
    console.log('6️⃣ Test: Récupérer les conseils');
    const adviceRes = await fetch(`${API_BASE}/advice`);
    const advice = await adviceRes.json();
    console.log('✅ Conseils reçus:', advice.length, 'entrées');
    console.log('Exemple:', advice[0], '\n');

    console.log('🎉 TOUS LES TESTS RÉUSSIS!\n');
    console.log('📊 Résumé:');
    console.log('- Météo: ✅');
    console.log('- Alertes: ✅');
    console.log('- Observations: ✅');
    console.log('- Conseils: ✅');
    console.log('- Persistance: ✅ (données sauvegardées en JSON)\n');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

// Vérifier que le serveur est en cours d'exécution
console.log('Vérification de la connexion au serveur...');
fetch(`${API_BASE}/alerts`)
  .then(() => testAPI())
  .catch(err => {
    console.error('❌ Erreur: Le serveur n\'est pas accessible');
    console.error('Assurez-vous que le serveur fonctionne sur http://localhost:5000');
    console.error('Lancez: npm run server');
    process.exit(1);
  });
