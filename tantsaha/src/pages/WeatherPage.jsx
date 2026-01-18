import React, { useEffect, useState, useCallback } from 'react';
import { FaCloud, FaPlus, FaTimes, FaCloudSun, FaLightbulb, FaSun, FaCloudRain, FaTint, FaWind, FaCompass } from 'react-icons/fa';
import Card from '../components/common/Card';
import WeatherCard from '../components/features/WeatherCard';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { getWeather } from '../utils/api';
import { generateWeatherAlerts } from '../utils/weatherAlerts';
import weatherBg from '../assets/weather.png';
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
      
      // Générer les alertes météo automatiquement
      if (data && data.length > 0) {
        const primaryWeather = data[0]; // Prendre la première donnée météo
        
        // Formater les données pour generateWeatherAlerts
        // Les données peuvent venir soit de la DB soit de l'API OpenWeatherMap
        const weatherData = {
          temp: primaryWeather.temp || primaryWeather.temperature || 0,
          description: primaryWeather.description || primaryWeather.condition || '',
          rainChance: primaryWeather.rainChance || primaryWeather.rain || 0,
          wind: primaryWeather.wind || primaryWeather.windSpeed || 0
        };
        
        // Générer les alertes
        const generatedAlerts = generateWeatherAlerts(weatherData);
        console.log('Alertes générées à partir de la météo:', generatedAlerts);
        
        // Stocker les données météo dans localStorage pour les alertes
        localStorage.setItem('weatherData', JSON.stringify(weatherData));
      }
    } catch (error) {
      console.error('Erreur chargement météo:', error);
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
          <FaCloud /> Toetr'andro
        </h2>
      </div>

      {weatherList.length > 0 ? (
        <>
          {/* Carte principale de météo actuelle */}
          <div className="weather-main">
            <div 
              className="weather-current"
              style={{
                '--bg-image': `url(${weatherBg})`
              }}
            >
              <div className="weather-location">
                Antananarivo, MG
              </div>
              <div className="weather-content">
                <div className="weather-temperature">
                  {weatherList[0].temp}°
                </div>
                <div className="weather-description">
                  {weatherList[0].description || 'Légère Pluie'}
                </div>
                <div className="weather-detal">
                  Toa {weatherList[0].temp}°
                </div>
              </div>
              <div className="weather-details-grid">
                <div className="detail-item">
                  <FaTint /> Hamelana
                  <span className="detail-value">{weatherList[0].humidity || 65}%</span>
                </div>
                <div className="detail-item">
                  <FaWind /> Rivotra
                  <span className="detail-value">{weatherList[0].wind || 13} km/h</span>
                </div>
                <div className="detail-item">
                  <FaCompass /> Tsindry
                  <span className="detail-value">{weatherList[0].pressure || 1013} hPa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Prévisions 3 jours */}
          <div className="weather-forecast-section">
            <h3>Vinavinain'ny 3 andro</h3>
            <div className="weather-grid">
              {weatherList.slice(0, 3).map((weather, index) => (
                <div key={index} className="weather-item">
                  <WeatherCard weather={weather} showHighlight={false} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Card>Tsy misy angon-drakitra angilan-danitra</Card>
      )}

      {showForm && (
        <Card className="form-card">
          <div className="form-header">
            <h3>Manampy fitsikiana</h3>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              <FaTimes />
            </button>
          </div>
          <p className="info-text">
            <FaCloudSun /> Fanangonana angon-drakitra avy amin'ny API
          </p>
        </Card>
      )}

      <div className="weather-tips">
        <Card>
          <h3><FaLightbulb /> Torolalana fampitanim arakaraka ny toetr'andro</h3>
          <ul>
            <li><FaSun /> Mambanin'ny akondratsiny: Tsara amin'ny fampitanim</li>
            <li><FaCloudRain /> Oran'adin'ny: Tsara amin'ny sedera</li>
            <li><FaCloud /> Mitarika: Antrena ny fitsikiana</li>
          </ul>
        </Card>
      </div>
    </div>
  );
});

WeatherPage.displayName = 'WeatherPage';

export default WeatherPage;
