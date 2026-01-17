import React from 'react';
import './Card.css';

const Card = React.memo(({ children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
