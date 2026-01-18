import { useState, useEffect, useCallback } from 'react';
import { generateWeatherAlerts } from '../utils/weatherAlerts';

/**
 * Hook pour gérer les alertes météo
 * Génère automatiquement les alertes basées sur la météo
 */
export const useWeatherAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  // Générer les alertes au chargement
  useEffect(() => {
    const loadWeatherAndGenerateAlerts = async () => {
      try {
        // Récupérer les données météo du localStorage ou API
        const weatherData = JSON.parse(localStorage.getItem('weatherData'));
        
        if (weatherData) {
          const generatedAlerts = generateWeatherAlerts(weatherData);
          
          // Ajouter les alertes générées
          const alertesAvecId = generatedAlerts.map((alerte, index) => ({
            id: Date.now() + index,
            ...alerte,
            date: new Date().toISOString().split('T')[0],
            active: true,
            source: 'automatique',
            statut: 'a venir'
          }));

          // Fusionner avec les alertes existantes (éviter les doublons)
          setAlerts(prevAlerts => {
            const existingTypes = new Set(prevAlerts.map(a => a.type));
            const newAlerts = alertesAvecId.filter(a => !existingTypes.has(a.type));
            return [...newAlerts, ...prevAlerts.filter(a => a.active)];
          });
        }
      } catch (error) {
        console.error('Erreur chargement alertes météo:', error);
      }
    };

    loadWeatherAndGenerateAlerts();

    // Vérifier les nouvelles alertes toutes les 10 minutes
    const interval = setInterval(loadWeatherAndGenerateAlerts, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const deleteAlert = useCallback((alertId) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, active: false } : alert
      )
    );
  }, []);

  const getActiveAlerts = useCallback(() => {
    return alerts.filter(alert => alert.active);
  }, [alerts]);

  return {
    alerts,
    activeAlerts: getActiveAlerts(),
    deleteAlert,
  };
};

export default useWeatherAlerts;
