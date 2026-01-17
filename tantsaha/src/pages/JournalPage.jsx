import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaCalendar, FaPlus, FaTimes, FaFilter } from 'react-icons/fa';
import Card from '../components/common/Card';
import ObservationItem from '../components/features/ObservationItem';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { getObservations, addObservation, deleteObservation } from '../utils/api';
import './JournalPage.css';

const CROPS = ['riz', 'maïs', 'haricots', 'pommes de terre', 'manioc'];

const JournalPage = React.memo(() => {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterCrop, setFilterCrop] = useState('all');
  const [formData, setFormData] = useState({
    type: 'rain',
    description: '',
    date: new Date().toISOString().split('T')[0],
    crop: 'riz',
  });

  const loadObservations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getObservations();
      setObservations(data);
    } catch (error) {
      console.error('Error loading observations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadObservations();
  }, [loadObservations]);

  const filteredObservations = useMemo(() => {
    return observations.filter((obs) => {
      const typeMatch = filterType === 'all' || obs.type === filterType;
      const cropMatch = filterCrop === 'all' || obs.crop === filterCrop;
      return typeMatch && cropMatch;
    });
  }, [observations, filterType, filterCrop]);

  const handleAddObservation = useCallback(async (e) => {
    e.preventDefault();
    try {
      const newObs = await addObservation(formData);
      setObservations([newObs, ...observations]);
      setFormData({
        type: 'rain',
        description: '',
        date: new Date().toISOString().split('T')[0],
        crop: 'riz',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding observation:', error);
    }
  }, [formData, observations]);

  const handleDeleteObservation = useCallback(async (id) => {
    try {
      await deleteObservation(id);
      setObservations(observations.filter(o => o.id !== id));
    } catch (error) {
      console.error('Error deleting observation:', error);
    }
  }, [observations]);

  if (loading) return <Loading />;

  return (
    <div className="journal-page">
      <div className="page-header">
        <h2>
          <FaCalendar /> Journal de Culture
        </h2>
        <Button variant="secondary" size="sm" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> Nouvelle observation
        </Button>
      </div>

      {showForm && (
        <Card className="form-card">
          <div className="form-header">
            <h3>Ajouter une observation</h3>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleAddObservation}>
            <div className="form-row">
              <div className="form-group">
                <label>Type d'observation</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="rain">🌧️ Pluie</option>
                  <option value="pest">🐛 Parasites</option>
                  <option value="planting">🌱 Semis</option>
                  <option value="harvest">🌾 Récolte</option>
                </select>
              </div>
              <div className="form-group">
                <label>Culture</label>
                <select
                  value={formData.crop}
                  onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                >
                  {CROPS.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez votre observation..."
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <Button variant="primary" type="submit">Enregistrer l'observation</Button>
          </form>
        </Card>
      )}

      <div className="filters">
        <div className="filter-group">
          <FaFilter /> Filtrer par:
        </div>
        <div className="filter-buttons">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les types</option>
            <option value="rain">🌧️ Pluie</option>
            <option value="pest">🐛 Parasites</option>
            <option value="planting">🌱 Semis</option>
            <option value="harvest">🌾 Récolte</option>
          </select>
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="filter-select"
          >
            <option value="all">Toutes les cultures</option>
            {CROPS.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredObservations.length > 0 ? (
        <div className="observations-list">
          {filteredObservations.map((obs) => (
            <ObservationItem
              key={obs.id}
              observation={obs}
              onDelete={handleDeleteObservation}
            />
          ))}
        </div>
      ) : (
        <Card>
          {observations.length === 0 ? 'Aucune observation' : 'Aucune observation correspondant aux filtres'}
        </Card>
      )}
    </div>
  );
});

JournalPage.displayName = 'JournalPage';

export default JournalPage;
