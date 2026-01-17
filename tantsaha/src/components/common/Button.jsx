import React from 'react';
import './Button.css';

const Button = React.memo(({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  ...props 
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
