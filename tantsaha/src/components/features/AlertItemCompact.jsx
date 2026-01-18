import React, { useCallback } from 'react';
import { FaTrash, FaRobot, FaUser, FaCloudRain, FaBolt, FaFire, FaWind, FaSnowflake, FaBell, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import './AlertItemCompact.css';

/**
 * Version compacte d'AlertItem pour HomePage
 * Affiche toutes les infos de façon lisible
 */
const AlertItemCompact = React.memo(({ alert, onDelete, hideDelete = false }) => {
  const handleDelete = useCallback(() => {
    console.log('AlertItemCompact.handleDelete appelé pour ID:', alert.id);
    onDelete(alert.id);
  }, [alert.id, onDelete]);

  const getUrgenceClass = (urgence) => {
    switch (urgence) {
      case 'haute':
        return 'danger';
      case 'moyenne':
        return 'warning';
      default:
        return 'info';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'pluie_forte':
        return <FaCloudRain className="alert-icon-compact" />;
      case 'orage':
        return <FaBolt className="alert-icon-compact" />;
      case 'chaleur':
        return <FaFire className="alert-icon-compact" />;
      case 'vent':
        return <FaWind className="alert-icon-compact" />;
      case 'froid':
        return <FaSnowflake className="alert-icon-compact" />;
      case 'planting':
        return <FaBell className="alert-icon-compact" />;
      case 'harvest':
        return <FaBell className="alert-icon-compact" />;
      case 'warning':
        return <FaBell className="alert-icon-compact" />;
      default:
        return <FaBell className="alert-icon-compact" />;
    }
  };

  const typeClass = getUrgenceClass(alert.urgence || 'moyenne');
  const isAutomatic = alert.source === 'automatique';

  return (
    <Card className={`alert-item-compact ${typeClass}`}>
      {/* En-tête: icône + titre + source + urgence + bouton supprimer */}
      <div className="alert-header-compact">
        <div className="alert-title-bar">
          {getAlertIcon(alert.type)}
          <h4>{alert.title}</h4>
          <span className="alert-source-compact">
            {isAutomatic ? <FaRobot /> : <FaUser />}
            {isAutomatic ? 'Auto' : 'Manuel'}
          </span>
          <span className={`alert-urgence-compact ${alert.urgence}`}>
            {alert.urgence === 'haute' ? '●' : '●'} {alert.urgence}
          </span>
        </div>
        <Button variant="danger" size="sm" onClick={handleDelete} style={{ display: hideDelete ? 'none' : 'flex' }}>
          <FaTrash />
        </Button>
      </div>

      {/* Description */}
      {alert.description && (
        <p className="alert-description-compact">{alert.description}</p>
      )}

      {/* Actions */}
      {alert.actions && alert.actions.length > 0 && (
        <div className="alert-actions-compact">
          <strong><FaCheckCircle /> Torolalana amin'ity andro ity:</strong>
          <ul>
            {alert.actions.slice(0, 3).map((action, index) => (
              <li key={index}>{action}</li>
            ))}
            {alert.actions.length > 3 && <li>... +{alert.actions.length - 3}</li>}
          </ul>
        </div>
      )}

      {/* Footer: date */}
      {alert.date && (
        <div className="alert-footer-compact">
          <FaCalendarAlt /> {new Date(alert.date).toLocaleDateString('fr-FR')}
        </div>
      )}
    </Card>
  );
});

AlertItemCompact.displayName = 'AlertItemCompact';

export default AlertItemCompact;
