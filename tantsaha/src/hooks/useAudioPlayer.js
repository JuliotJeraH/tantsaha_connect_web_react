import React, { useState, useRef, useCallback } from 'react';

/**
 * Hook personnalisé pour gérer la lecture audio avec play/pause
 * - Clic autre audio: arrête l'actuel et lance le nouveau
 * - Clic même audio: toggle play/pause
 */
const audioPlayer = new Audio();

export const useAudioPlayer = () => {
  const [playingId, setPlayingId] = useState(null);
  const currentIdRef = useRef(null);

  const handlePlayAudio = useCallback((id, audioPath) => {
    console.log('Clic ID:', id, 'CurrentId:', currentIdRef.current, 'Paused:', audioPlayer.paused);

    // Cas 1: ID différent -> Arrêter ancien et démarrer nouveau
    if (currentIdRef.current !== id) {
      console.log('Action: Changer vers ID', id);
      audioPlayer.currentTime = 0;
      audioPlayer.src = audioPath;
      currentIdRef.current = id;
      
      audioPlayer.play()
        .then(() => {
          console.log('Nouveau audio jouant');
          setPlayingId(id);
        })
        .catch(err => {
          console.error('Erreur play:', err);
          setPlayingId(null);
          currentIdRef.current = null;
        });
    } 
    // Cas 2: Même ID ET en pause -> Play
    else if (audioPlayer.paused) {
      console.log('Action: PLAY (même audio, en pause)');
      audioPlayer.play()
        .then(() => {
          setPlayingId(id);
        })
        .catch(err => {
          console.error('Erreur play:', err);
          setPlayingId(null);
        });
    } 
    // Cas 3: Même ID ET en lecture -> Pause
    else {
      console.log('Action: PAUSE (même audio, en lecture)');
      audioPlayer.pause();
      setPlayingId(null);
    }
  }, []);

  // Événement: audio terminé
  React.useEffect(() => {
    const handleEnded = () => {
      console.log('Audio terminé');
      setPlayingId(null);
      currentIdRef.current = null;
    };

    audioPlayer.addEventListener('ended', handleEnded);
    return () => audioPlayer.removeEventListener('ended', handleEnded);
  }, []);

  const handleReplay = useCallback((id, audioPath) => {
    console.log('Replay ID:', id);
    audioPlayer.currentTime = 0;
    audioPlayer.src = audioPath;
    currentIdRef.current = id;
    
    audioPlayer.play()
      .then(() => {
        console.log('Replay en cours');
        setPlayingId(id);
      })
      .catch(err => {
        console.error('Erreur replay:', err);
        setPlayingId(null);
        currentIdRef.current = null;
      });
  }, []);

  return {
    playingId,
    handlePlayAudio,
    handleReplay,
  };
};

export default useAudioPlayer;

