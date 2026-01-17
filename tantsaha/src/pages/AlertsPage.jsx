import React, { useEffect, useState, useCallback } from 'react';
import { FaBell, FaPlus, FaTimes } from 'react-icons/fa';
import Card from '../components/common/Card';
import AlertItem from '../components/features/AlertItem';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { getAlerts, addAlert, deleteAlert } from '../utils/api';
import './AlertsPage.css';

const AlertsPage = React.memo(() => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'planting',
    date: new Date().toISOString().split('T')[0],
  });

  const loadAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  const handleAddAlert = useCallback(async (e) => {
    e.preventDefault();
    try {
      const newAlert = await addAlert(formData);
      setAlerts([newAlert, ...alerts]);
      setFormData({
        title: '',
        description: '',
        type: 'planting',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding alert:', error);
    }
  }, [formData, alerts]);

  const handleDeleteAlert = useCallback(async (id) => {
    try {
      await deleteAlert(id);
      setAlerts(alerts.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  }, [alerts]);

  if (loading) return <Loading />;

  return (
    <div className="alerts-page">
      <div className="page-header">
        <h2>
          <FaBell /> Gestion des Alertes
        </h2>
        <Button variant="secondary" size="sm" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> Nouvelle alerte
        </Button>
      </div>

      {showForm && (
        <Card className="form-card">
          <div className="form-header">
            <h3>Créer une alerte</h3>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleAddAlert}>
            <div className="form-group">
              <label>Titre</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Semis du riz"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Détails de l'alerte..."
                required
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="planting">🌱 Semis</option>
                  <option value="harvest">🌾 Récolte</option>
                  <option value="warning">⚠️ Alerte</option>
                </select>
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
            </div>
            <Button variant="primary" type="submit">Créer l'alerte</Button>
          </form>
        </Card>
      )}

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
        <Card>Aucune alerte - Créez-en une pour commencer!</Card>
      )}
    </div>
  );
});

AlertsPage.displayName = 'AlertsPage';

export default AlertsPage;
