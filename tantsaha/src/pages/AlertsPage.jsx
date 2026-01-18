import React, { useCallback } from 'react';
import { FaBell, FaInbox } from 'react-icons/fa';
import Card from '../components/common/Card';
import AlertItem from '../components/features/AlertItem';
import Loading from '../components/common/Loading';
import './AlertsPage.css';

const AlertsPage = React.memo(({ alerts = [], onDeleteAlert }) => {
  const [loading, setLoading] = React.useState(false);

  const handleDeleteAlert = useCallback((id) => {
    if (onDeleteAlert) {
      onDeleteAlert(id);
    }
  }, [onDeleteAlert]);

  if (loading) return <Loading />;

  return (
    <div className="alerts-page">
      <div className="page-header">
        <h2>
          <FaBell /> Fitantanana ny fampahafantarana
        </h2>
      </div>

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
        <Card><FaInbox /> Tsy misy fampahafantarana</Card>
      )}
    </div>
  );
});

AlertsPage.displayName = 'AlertsPage';

export default AlertsPage;
