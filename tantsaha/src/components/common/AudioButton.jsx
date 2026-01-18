import React from 'react';
import './AudioButton.css';

/**
 * Composant bouton réutilisable pour lecture audio
 * @param {number} id - ID unique du conseil/audio
 * @param {string} audioPath - Chemin vers le fichier audio
 * @param {number} playingId - ID de l'audio actuellement en lecture
 * @param {function} onPlay - Callback pour gérer la lecture
 * @param {boolean} isDisabled - Désactiver le bouton
 */
const AudioButton = ({
  id,
  audioPath,
  playingId,
  onPlay,
  isDisabled = false,
}) => {
  const isPlaying = playingId === id;

  const handleClick = () => {
    onPlay(id, audioPath);
  };

  return (
    <button
      className={`audio-button ${isPlaying ? 'playing' : 'stopped'}`}
      onClick={handleClick}
      disabled={isDisabled}
      title={isPlaying ? 'Pause' : 'Écouter'}
    >
      <span className="icon">
        {isPlaying ? '⏸' : '▶'}
      </span>
      <span className="text">
        {isPlaying ? 'Atsaharo' : 'Henoy'}
      </span>
    </button>
  );
};

export default AudioButton;
