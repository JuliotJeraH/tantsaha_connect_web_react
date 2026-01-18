import React from 'react';
import { FaBook, FaLeaf, FaBug, FaCheckCircle, FaTint, FaLightbulb } from 'react-icons/fa';
import Card from '../common/Card';
import './AdviceCard.css';

const AdviceCard = React.memo(({ advice }) => {
  const getAdviceIcon = React.useMemo(() => {
    return (icon) => {
      const iconMap = {
        droplet: <FaTint className="advice-icon" />,
        leaf: <FaLeaf className="advice-icon" />,
        bug: <FaBug className="advice-icon" />,
        shield: <FaCheckCircle className="advice-icon" />,
        book: <FaBook className="advice-icon" />,
        lightbulb: <FaLightbulb className="advice-icon" />,
      };
      return iconMap[icon] || iconMap.book;
    };
  }, []);

  return (
    <Card className="advice-card">
      <div className="advice-header">
        {getAdviceIcon(advice.icon)}
        <div>
          <h3>{advice.title}</h3>
          <span className="advice-crop">{advice.crop}</span>
        </div>
      </div>
      <p className="advice-description">{advice.description}</p>
    </Card>
  );
});

AdviceCard.displayName = 'AdviceCard';

export default AdviceCard;
