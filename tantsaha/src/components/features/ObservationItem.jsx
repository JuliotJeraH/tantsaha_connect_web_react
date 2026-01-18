import React, { useCallback } from 'react';
import { FaTrash, FaTint, FaBug, FaCalendar } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import './ObservationItem.css';

const ObservationItem = React.memo(({ observation, onDelete, hideDelete = false }) => {
  const handleDelete = useCallback(() => {
    onDelete(observation.id);
  }, [observation.id, onDelete]);

  const getObservationIcon = useCallback((type) => {
    switch (type) {
      case 'rain':
        return <FaTint className="obs-icon rain" />;
      case 'pest':
        return <FaBug className="obs-icon pest" />;
      case 'planting':
        return <FaCalendar className="obs-icon planting" />;
      default:
        return <FaCalendar className="obs-icon" />;
    }
  }, []);

  return (
    <Card className="observation-item">
      <div className="obs-header">
        <div className="obs-info">
          <div className="obs-type-badge">
            {getObservationIcon(observation.type)}
            <span className="obs-type">{observation.type}</span>
          </div>
          <div className="obs-crop">{observation.crop}</div>
        </div>
        <Button variant="danger" size="sm" onClick={handleDelete} style={{ display: hideDelete ? 'none' : 'flex' }}>
          <FaTrash />
        </Button>
      </div>
      <p className="obs-description">{observation.description}</p>
      <div className="obs-footer">
        <span className="obs-date">
          {new Date(observation.date).toLocaleDateString('fr-FR')}
        </span>
      </div>
    </Card>
  );
});

ObservationItem.displayName = 'ObservationItem';

export default ObservationItem;
