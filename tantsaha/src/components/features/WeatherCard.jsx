import React, { useMemo } from 'react';
import { FaCloud, FaCloudRain, FaSun, FaWind } from 'react-icons/fa';
import Card from '../common/Card';
import weatherBg from '../../assets/weather.png';
import './WeatherCard.css';

const WeatherCard = React.memo(({ weather, showHighlight = true }) => {
  const getWeatherIcon = useMemo(() => {
    return (condition) => {
      if (!condition) return <FaSun className="weather-icon sun" />;
      const lowerCondition = condition.toLowerCase();
      
      if (lowerCondition.includes('rain')) {
        return <FaCloudRain className="weather-icon rain" />;
      } else if (lowerCondition.includes('cloud')) {
        return <FaCloud className="weather-icon cloud" />;
      } else if (lowerCondition.includes('clear') || lowerCondition.includes('sunny') || lowerCondition.includes('sunny')) {
        return <FaSun className="weather-icon sun" />;
      } else {
        return <FaSun className="weather-icon sun" />;
      }
    };
  }, []);

  if (!weather) {
    return <Card>Pas de données météo</Card>;
  }

  return (
    <Card 
      className={showHighlight ? "weather-card highlighted" : "weather-card"} 
      style={{
        '--bg-image': `url(${weatherBg})`
      }}
    >
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
