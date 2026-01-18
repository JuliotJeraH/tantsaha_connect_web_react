import { useState, useEffect, useCallback } from 'react';
import { getAlerts, getWeather, deleteAlert } from '../utils/api';
import { generateWeatherAlerts } from '../utils/weatherAlerts';

/**
 * Hook personnalisé pour gérer les alertes globalement
 * Synchronise les alertes entre toutes les pages
 */
export const useGlobalAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const loadAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const [alertsData, weatherData] = await Promise.all([
        getAlerts(),
        getWeather(),
      ]);

      let allAlerts = alertsData || [];

      // Générer les alertes météo automatiquement
      if (weatherData && weatherData.length > 0) {
        const primaryWeather = weatherData[0];

        const weatherDataForAlerts = {
          temp: primaryWeather.temp || primaryWeather.temperature || 0,
          description: primaryWeather.description || primaryWeather.condition || '',
          rainChance: primaryWeather.rainChance || primaryWeather.rain || 0,
          wind: primaryWeather.wind || primaryWeather.windSpeed || 0
        };

        const generatedAlerts = generateWeatherAlerts(weatherDataForAlerts);

        const today = new Date().toISOString().split('T')[0];
        const formattedWeatherAlerts = generatedAlerts.map((alerte, index) => ({
          id: `auto_${Date.now()}_${index}`,
          title: alerte.titre,
          description: alerte.message,
          type: alerte.type,
          date: today,
          active: true,
          source: 'automatique',
          urgence: alerte.urgence,
          icon: alerte.icon,
          actions: alerte.actions || []
        }));

        // Formater les alertes manuelles pour avoir les mêmes propriétés
        const formattedManualAlerts = (alertsData || []).filter(a => a.active).map(a => ({
          id: a.id,
          title: a.title || a.titre || '',
          description: a.description || a.message || '',
          type: a.type || 'warning',
          date: a.date || today,
          active: true,
          source: 'manuel',
          urgence: a.urgence || 'moyenne',
          icon: a.icon || '🔔',
          actions: a.actions || []
        }));

        allAlerts = [...formattedWeatherAlerts, ...formattedManualAlerts];
        localStorage.setItem('weatherData', JSON.stringify(weatherDataForAlerts));
      } else {
        // Si pas de météo, juste formater les alertes manuelles
        const formattedManualAlerts = (alertsData || []).filter(a => a.active).map(a => ({
          id: a.id,
          title: a.title || a.titre || '',
          description: a.description || a.message || '',
          type: a.type || 'warning',
          date: a.date || new Date().toISOString().split('T')[0],
          active: true,
          source: 'manuel',
          urgence: a.urgence || 'moyenne',
          icon: a.icon || '🔔',
          actions: a.actions || []
        }));
        allAlerts = formattedManualAlerts;
      }

      setAlerts(allAlerts);
      setLastUpdate(Date.now());
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAlertById = useCallback(async (id) => {
    try {
      console.log('Suppression alerte:', id);
      // Si c'est une alerte automatique (id commence par 'auto_'), supprimer localement
      if (typeof id === 'string' && id.startsWith('auto_')) {
        console.log('Alerte automatique: suppression locale');
        setAlerts(prevAlerts => prevAlerts.filter(a => a.id !== id));
      } else {
        // Sinon, supprimer via API
        console.log('Alerte manuelle: suppression via API');
        await deleteAlert(id);
        setAlerts(prevAlerts => prevAlerts.filter(a => a.id !== id));
      }
      setLastUpdate(Date.now());
      console.log('Alerte supprimée');
    } catch (error) {
      console.error('Erreur suppression alerte:', error);
    }
  }, []);

  useEffect(() => {
    loadAlerts();
  }, []);

  return {
    alerts,
    loading,
    alertsCount: alerts.length,
    loadAlerts,
    deleteAlert: deleteAlertById,
    lastUpdate
  };
};

export default useGlobalAlerts;
