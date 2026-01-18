import React, { useCallback } from 'react';
import { FaBell, FaTrash, FaLeaf, FaCheck, FaExclamation, FaRobot, FaUser, FaCloudRain, FaBolt, FaFire, FaWind, FaSnowflake, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import './AlertItem.css';

const AlertItem = React.memo(({ alert, onDelete }) => {
  console.log('AlertItem reçu:', {
    id: alert.id,
    title: alert.title,
    description: alert.description ? 'oui' : 'non',
    actions: alert.actions ? `oui (${alert.actions.length})` : 'non',
    source: alert.source,
    urgence: alert.urgence
  });
  
  const handleDelete = useCallback(() => {
    console.log('AlertItem.handleDelete appelé pour ID:', alert.id);
    onDelete(alert.id);
  }, [alert.id, onDelete]);

  const getAlertIcon = useCallback((type) => {
    switch (type) {
      case 'planting':
        return <FaLeaf className="alert-type-icon planting" />;
      case 'harvest':
        return <FaCheck className="alert-type-icon harvest" />;
      case 'warning':
        return <FaExclamation className="alert-type-icon warning" />;
      case 'pluie_forte':
        return <FaCloudRain className="alert-type-icon" />;
      case 'orage':
        return <FaBolt className="alert-type-icon" />;
      case 'chaleur':
        return <FaFire className="alert-type-icon" />;
      case 'vent':
        return <FaWind className="alert-type-icon" />;
      case 'froid':
        return <FaSnowflake className="alert-type-icon" />;
      default:
        return <FaBell className="alert-type-icon" />;
    }
  }, []);

  const getUrgenceClass = useCallback((urgence) => {
    switch (urgence) {
      case 'haute':
        return 'danger';
      case 'moyenne':
        return 'warning';
      default:
        return 'info';
    }
  }, []);

  const typeClass = getUrgenceClass(alert.urgence || 'moyenne');
  const isAutomatic = alert.source === 'automatique';

  return (
    <Card className={`alert-item ${typeClass}`}>
      <div className="alert-header">
        <div className="alert-type">
          {getAlertIcon(alert.type)}
          <div className="alert-title-group">
            <h3>{alert.title}</h3>
            <div className="alert-meta">
              <span className="alert-source">
                {isAutomatic ? <FaRobot /> : <FaUser />}
                {isAutomatic ? 'Automatique' : 'Manuel'}
              </span>
              {alert.urgence && (
                <span className={`alert-urgence ${alert.urgence}`}>
                  {alert.urgence === 'haute' ? '●' : '●'} {alert.urgence}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          <FaTrash />
        </Button>
      </div>
      
      <p className="alert-description">{alert.description}</p>
      
      {alert.actions && alert.actions.length > 0 && (
        <div className="alert-actions">
          <strong><FaCheckCircle /> Torolalana amin'ity andro ity:</strong>
          <ul>
            {alert.actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="alert-footer">
        <div className="alert-date">
          <FaCalendarAlt /> {new Date(alert.date).toLocaleDateString('fr-FR')}
        </div>
        {alert.active === false && (
          <span className="alert-inactive">Désactivée</span>
        )}
      </div>
    </Card>
  );
});

AlertItem.displayName = 'AlertItem';

export default AlertItem;
