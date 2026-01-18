import React, { useEffect, useState, useCallback } from 'react';
import { FaCloud, FaBell, FaBook, FaLeaf, FaCalendar } from 'react-icons/fa';
import Card from '../components/common/Card';
import WeatherCard from '../components/features/WeatherCard';
import AlertItemCompact from '../components/features/AlertItemCompact';
import AdviceCard from '../components/features/AdviceCard';
import ObservationItem from '../components/features/ObservationItem';
import Loading from '../components/common/Loading';
import { getWeather, getAdvice, getObservations } from '../utils/api';
import './HomePage.css';

const HomePage = React.memo(({ alerts = [], onDeleteAlert, onNavigate }) => {
  const [weather, setWeather] = useState(null);
  const [advice, setAdvice] = useState([]);
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [weatherData, adviceData, observationsData] = await Promise.all([
        getWeather(),
        getAdvice(),
        getObservations(),
      ]);
      setWeather(weatherData[0] || null);
      setAdvice(adviceData); // Load all advice
      setObservations(observationsData); // Load observations
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteAlert = useCallback((id) => {
    console.log('HomePage.handleDeleteAlert appelé pour ID:', id);
    if (onDeleteAlert) {
      console.log('→ Appelant onDeleteAlert');
      onDeleteAlert(id);
    } else {
      console.log('AVERTISSEMENT: onDeleteAlert non défini');
    }
  }, [onDeleteAlert]);

  if (loading) return <Loading />;

  // Prendre les 2 premières alertes
  const displayAlerts = alerts.slice(0, 2);

  return (
    <div className="homepage">
      <section className="home-section" onClick={() => onNavigate('weather')} style={{ cursor: 'pointer' }}>
        <h2 className="section-title">
          <FaCloud /> Toetr'andro androany
        </h2>
        {weather ? (
          <WeatherCard weather={weather} />
        ) : (
          <Card>Tsy misy angon-drakitra angilan-danitra</Card>
        )}
      </section>

      <section className="home-section" onClick={() => onNavigate('alerts')} style={{ cursor: 'pointer' }}>
        <h2 className="section-title">
          <FaBell /> Fampahafantarana manan-danja
        </h2>
        {displayAlerts.length > 0 ? (
          <div className="alerts-list">
            {displayAlerts.map((alert) => (
              <AlertItemCompact
                key={alert.id}
                alert={alert}
                onDelete={() => {}}
                hideDelete={true}
              />
            ))}
          </div>
        ) : (
          <Card>Tsy misy fampahafantarana</Card>
        )}
      </section>

      <section className="home-section" onClick={() => onNavigate('advice')} style={{ cursor: 'pointer' }}>
        <h2 className="section-title">
          <FaBook /> Torolalana efa misy
        </h2>
        {advice.length > 0 ? (
          <div className="advice-list">
            <div style={{ position: 'relative' }}>
              <AdviceCard key={advice[0].id} advice={advice[0]} />
              {advice.length > 1 && (
                <div style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: '#2E7D32',
                  color: 'white',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '700'
                }}>
                  +{advice.length - 1}
                </div>
              )}
            </div>
          </div>
        ) : (
          <Card>Tsy misy torolalana</Card>
        )}
      </section>

      <section className="home-section" onClick={() => onNavigate('journal')} style={{ cursor: 'pointer' }}>
        <h2 className="section-title">
          <FaCalendar /> Bokin-tsoratra manokana
        </h2>
        {observations.length > 0 ? (
          <div style={{ position: 'relative' }}>
            <ObservationItem
              observation={observations[0]}
              onDelete={() => {}}
              hideDelete={true}
            />
            {observations.length > 1 && (
              <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#4CAF50',
                color: 'white',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700'
              }}>
                +{observations.length - 1}
              </div>
            )}
          </div>
        ) : (
          <Card>Tsy misy observations</Card>
        )}
      </section>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;

