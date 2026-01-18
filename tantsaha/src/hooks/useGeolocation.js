import { useState, useEffect, useCallback } from 'react';
import { getRealtimeWeatherByLocation, getWeatherForecast } from '../utils/api';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async (latitude, longitude) => {
    try {
      setLoading(true);
      
      // Récupérer la météo en temps réel
      const weatherData = await getRealtimeWeatherByLocation(latitude, longitude);
      setWeather(weatherData);

      // Récupérer la prévision
      const forecastData = await getWeatherForecast(latitude, longitude);
      setForecast(forecastData);

      setError(null);
    } catch (err) {
      console.error('Erreur récupération données météo:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const startTracking = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Géolocalisation non supportée');
      setLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000 // Cache de 5 secondes
    };

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        const locationData = {
          latitude,
          longitude,
          accuracy,
          timestamp: new Date().toISOString()
        };

        setLocation(locationData);
        await fetchWeatherData(latitude, longitude);
      },
      (err) => {
        setError(`Erreur géolocalisation: ${err.message}`);
        setLoading(false);
      },
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [fetchWeatherData]);

  const getCurrentLocationOnce = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Géolocalisation non supportée');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        const locationData = {
          latitude,
          longitude,
          accuracy,
          timestamp: new Date().toISOString()
        };

        setLocation(locationData);
        await fetchWeatherData(latitude, longitude);
      },
      (err) => {
        setError(`Erreur géolocalisation: ${err.message}`);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [fetchWeatherData]);

  const stopTracking = useCallback(() => {
    setLocation(null);
    setWeather(null);
    setForecast(null);
  }, []);

  return {
    location,
    weather,
    forecast,
    loading,
    error,
    startTracking,
    getCurrentLocationOnce,
    stopTracking
  };
};

export default useGeolocation;
