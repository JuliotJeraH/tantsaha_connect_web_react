import React, { useEffect, useState, useCallback } from 'react';
import { FaCloud, FaBell, FaBook, FaLeaf, FaCalendar } from 'react-icons/fa';
import Card from '../components/common/Card';
import WeatherCard from '../components/features/WeatherCard';
import AlertItem from '../components/features/AlertItem';
import AdviceCard from '../components/features/AdviceCard';
import Loading from '../components/common/Loading';
import { getWeather, getAlerts, getAdvice, deleteAlert } from '../utils/api';
import './HomePage.css';

const HomePage = React.memo(() => {
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [weatherData, alertsData, adviceData] = await Promise.all([
        getWeather(),
        getAlerts(),
        getAdvice(),
      ]);
      setWeather(weatherData[0] || null);
      setAlerts(alertsData.slice(0, 2)); // Show top 2 alerts
      setAdvice(adviceData.slice(0, 2)); // Show top 2 advice
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteAlert = useCallback(async (id) => {
    await deleteAlert(id);
    setAlerts(alerts.filter(a => a.id !== id));
  }, [alerts]);

  if (loading) return <Loading />;

  return (
    <div className="homepage">
      <section className="home-section">
        <h2 className="section-title">
          <FaCloud /> Météo d'aujourd'hui
        </h2>
        {weather ? (
          <WeatherCard weather={weather} />
        ) : (
          <Card>Pas de données météo</Card>
        )}
      </section>

      <section className="home-section">
        <h2 className="section-title">
          <FaBell /> Alertes Importantes
        </h2>
        {alerts.length > 0 ? (
          <div className="alerts-list">
            {alerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onDelete={handleDeleteAlert}
              />
            ))}
          </div>
        ) : (
          <Card>Aucune alerte</Card>
        )}
      </section>

      <section className="home-section">
        <h2 className="section-title">
          <FaBook /> Conseils du jour
        </h2>
        {advice.length > 0 ? (
          <div className="advice-list">
            {advice.map((item) => (
              <AdviceCard key={item.id} advice={item} />
            ))}
          </div>
        ) : (
          <Card>Pas de conseils disponibles</Card>
        )}
      </section>

      <section className="home-section stats">
        <h2 className="section-title">
          <FaCalendar /> Statistiques rapides
        </h2>
        <div className="stats-grid">
          <Card>
            <div className="stat-item">
              <span className="stat-value">{alerts.length}</span>
              <span className="stat-label">Alertes actives</span>
            </div>
          </Card>
          <Card>
            <div className="stat-item">
              <span className="stat-value">{weather?.temp}°C</span>
              <span className="stat-label">Température</span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
