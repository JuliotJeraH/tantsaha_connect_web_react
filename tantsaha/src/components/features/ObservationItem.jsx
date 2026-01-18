import React, { useCallback, useMemo } from 'react';
import { FaTrash, FaSearch, FaExclamationCircle } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import './ObservationItem.css';

const ObservationItem = React.memo(({ observation, onDelete, hideDelete = false }) => {
  const handleDelete = useCallback(() => {
    onDelete(observation.id);
  }, [observation.id, onDelete]);

  const getObservationIcon = useCallback((type) => {
    return <FaSearch className="obs-icon" />;
  }, []);

  const isToday = useMemo(() => {
    const obsDate = new Date(observation.date).toLocaleDateString('fr-FR');
    const today = new Date().toLocaleDateString('fr-FR');
    return obsDate === today;
  }, [observation.date]);

  return (
    <Card className={`observation-item ${isToday ? 'is-today' : ''}`}>
      {isToday && (
        <div className="obs-alert">
          <FaExclamationCircle /> À faire aujourd'hui !
        </div>
      )}
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
