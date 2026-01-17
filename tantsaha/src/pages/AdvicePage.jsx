import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaBook, FaFilter } from 'react-icons/fa';
import Card from '../components/common/Card';
import AdviceCard from '../components/features/AdviceCard';
import Loading from '../components/common/Loading';
import { getAdvice } from '../utils/api';
import './AdvicePage.css';

const AdvicePage = React.memo(() => {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('all');

  const loadAdvices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAdvice();
      setAdvices(data);
    } catch (error) {
      console.error('Error loading advice:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdvices();
  }, [loadAdvices]);

  const crops = useMemo(() => {
    const uniqueCrops = [...new Set(advices.map(a => a.crop))];
    return uniqueCrops;
  }, [advices]);

  const filteredAdvices = useMemo(() => {
    if (selectedCrop === 'all') return advices;
    return advices.filter(a => a.crop === selectedCrop);
  }, [advices, selectedCrop]);

  if (loading) return <Loading />;

  return (
    <div className="advice-page">
      <div className="page-header">
        <h2>
          <FaBook /> Conseils Agricoles
        </h2>
      </div>

      <div className="advice-filters">
        <div className="filter-label">
          <FaFilter /> Filtrer par culture:
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${selectedCrop === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCrop('all')}
          >
            Tous
          </button>
          {crops.map(crop => (
            <button
              key={crop}
              className={`filter-btn ${selectedCrop === crop ? 'active' : ''}`}
              onClick={() => setSelectedCrop(crop)}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {filteredAdvices.length > 0 ? (
        <div className="advices-list">
          {filteredAdvices.map((advice) => (
            <AdviceCard key={advice.id} advice={advice} />
          ))}
        </div>
      ) : (
        <Card>Pas de conseils pour cette culture</Card>
      )}

      <div className="advice-tips">
        <Card>
          <h3>💡 Comment utiliser ces conseils</h3>
          <ul>
            <li>📖 Lire attentivement les conseils avant chaque culture</li>
            <li>📅 Planifier selon les dates recommandées</li>
            <li>🔄 Mettre à jour votre journal de culture régulièrement</li>
            <li>👨‍🌾 Partager les bonnes pratiques avec les autres paysans</li>
          </ul>
        </Card>
      </div>
    </div>
  );
});

AdvicePage.displayName = 'AdvicePage';

export default AdvicePage;
