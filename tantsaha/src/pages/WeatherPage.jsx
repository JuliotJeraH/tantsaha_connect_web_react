import React, { useEffect, useState, useCallback } from 'react';
import { FaCloud, FaPlus, FaTimes } from 'react-icons/fa';
import Card from '../components/common/Card';
import WeatherCard from '../components/features/WeatherCard';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { getWeather } from '../utils/api';
import './WeatherPage.css';

const WeatherPage = React.memo(() => {
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getWeather();
      setWeatherList(data);
    } catch (error) {
      console.error('Error loading weather:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  if (loading) return <Loading />;

  return (
    <div className="weather-page">
      <div className="page-header">
        <h2>
          <FaCloud /> Prévisions Météorologiques
        </h2>
        <Button variant="secondary" size="sm" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> Ajouter
        </Button>
      </div>

      {weatherList.length > 0 ? (
        <div className="weather-grid">
          {weatherList.map((weather, index) => (
            <div key={index} className="weather-item">
              <WeatherCard weather={weather} />
            </div>
          ))}
        </div>
      ) : (
        <Card>Pas de données météorologiques</Card>
      )}

      {showForm && (
        <Card className="form-card">
          <div className="form-header">
            <h3>Ajouter une prévision</h3>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              <FaTimes />
            </button>
          </div>
          <p className="info-text">
            🌤️ Collecte des données météo depuis une API locale ou météo.gov
          </p>
        </Card>
      )}

      <div className="weather-tips">
        <Card>
          <h3>💡 Conseils de semis selon la météo</h3>
          <ul>
            <li>☀️ Ensoleillé: Idéal pour planter</li>
            <li>🌧️ Pluie prévue: Parfait pour les semences</li>
            <li>☁️ Nuageux: Attendre les prévisions</li>
          </ul>
        </Card>
      </div>
    </div>
  );
});

WeatherPage.displayName = 'WeatherPage';

export default WeatherPage;
