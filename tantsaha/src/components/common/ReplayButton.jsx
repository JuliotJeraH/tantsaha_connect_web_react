import React from 'react';
import './ReplayButton.css';

/**
 * Composant bouton replay pour recommencer un audio
 * @param {number} id - ID unique du conseil/audio
 * @param {string} audioPath - Chemin vers le fichier audio
 * @param {number} playingId - ID de l'audio actuellement en lecture
 * @param {function} onReplay - Callback pour relancer l'audio
 * @param {boolean} isDisabled - Désactiver le bouton
 */
const ReplayButton = ({
  id,
  audioPath,
  playingId,
  onReplay,
  isDisabled = false,
}) => {
  const handleClick = () => {
    onReplay(id, audioPath);
  };

  return (
    <button
      className="replay-button"
      onClick={handleClick}
      disabled={isDisabled}
      title="Recommencer"
    >
      <span className="icon">⟲</span>
      <span className="text">Averina</span>
    </button>
  );
};

export default ReplayButton;
