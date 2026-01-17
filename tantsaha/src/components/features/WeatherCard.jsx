import React, { useMemo } from 'react';
import { FaCloud, FaCloudRain, FaSun, FaWind } from 'react-icons/fa';
import Card from '../common/Card';
import './WeatherCard.css';

const WeatherCard = React.memo(({ weather }) => {
  const getWeatherIcon = useMemo(() => {
    return (condition) => {
      switch (condition) {
        case 'rainy':
          return <FaCloudRain className="weather-icon rain" />;
        case 'sunny':
          return <FaSun className="weather-icon sun" />;
        default:
          return <FaCloud className="weather-icon cloud" />;
      }
    };
  }, []);

  if (!weather) {
    return <Card>Pas de données météo</Card>;
  }

  return (
    <Card className="weather-card highlighted">
      <div className="weather-header">
        <div className="weather-icon-container">
          {getWeatherIcon(weather.condition)}
        </div>
        <div className="weather-info">
          <div className="temp">{weather.temp}°C</div>
          <div className="date">{new Date(weather.date).toLocaleDateString('fr-FR')}</div>
        </div>
      </div>
      <div className="weather-details">
        <div className="detail">
          <FaWind className="detail-icon" />
          <span>{weather.humidity}% Humidité</span>
        </div>
        <div className="detail">
          <FaCloudRain className="detail-icon" />
          <span>{weather.rainChance}% Pluie</span>
        </div>
      </div>
    </Card>
  );
});

WeatherCard.displayName = 'WeatherCard';

export default WeatherCard;
