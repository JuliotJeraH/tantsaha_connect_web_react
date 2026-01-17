import React, { useCallback } from 'react';
import { FaBell, FaTrash, FaLeaf, FaCheck, FaExclamation } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import './AlertItem.css';

const AlertItem = React.memo(({ alert, onDelete }) => {
  const handleDelete = useCallback(() => {
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
      default:
        return <FaBell className="alert-type-icon" />;
    }
  }, []);

  const typeClass = alert.type === 'warning' ? 'danger' : alert.type === 'planting' ? 'highlighted' : 'warning';

  return (
    <Card className={`alert-item ${typeClass}`}>
      <div className="alert-header">
        <div className="alert-type">
          {getAlertIcon(alert.type)}
          <h3>{alert.title}</h3>
        </div>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          <FaTrash />
        </Button>
      </div>
      <p className="alert-description">{alert.description}</p>
      <div className="alert-date">
        {new Date(alert.date).toLocaleDateString('fr-FR')}
      </div>
    </Card>
  );
});

AlertItem.displayName = 'AlertItem';

export default AlertItem;
