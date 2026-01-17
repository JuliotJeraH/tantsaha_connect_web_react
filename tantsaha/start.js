#!/usr/bin/env node

/**
 * Script de démarrage simple pour Tantsaha Connect
 * Utilisation: node start.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🌾 Tantsaha Connect - Démarrage...\n');

// Vérifier si node_modules existe
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('📦 Installation des dépendances...');
  const npm = spawn('npm', ['install'], { stdio: 'inherit' });
  npm.on('close', (code) => {
    if (code === 0) {
      startApp();
    } else {
      console.error('❌ Erreur lors de l\'installation');
      process.exit(1);
    }
  });
} else {
  startApp();
}

function startApp() {
  console.log('🚀 Démarrage des serveurs...\n');

  const vite = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
  });

  vite.on('close', (code) => {
    console.log(`\n✨ Application fermée (code: ${code})`);
    process.exit(code);
  });

  console.log('\n✅ Application en cours d\'exécution!');
  console.log('📱 Frontend: http://localhost:5173');
  console.log('🔧 Backend: http://localhost:5000');
  console.log('\n💡 Appuyez sur Ctrl+C pour arrêter...\n');
}
