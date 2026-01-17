import React from 'react';
import './Loading.css';

const Loading = React.memo(() => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Manantena...</p>
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;
