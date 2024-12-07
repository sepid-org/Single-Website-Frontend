import React, { useEffect, useRef, useState } from 'react';
import { WidgetModes } from '../..';
import AudioEditWidget from './edit';
export { AudioEditWidget };

const AudioWidget = ({
  link,
  autoplay = false,
  mode = WidgetModes.View,
  repeat = false,
  volume = 100,
  hidden = false,
}) => {
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  // Detect user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);

      // Remove event listeners after the first interaction
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // Handle volume setup
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(Math.max(volume, 0), 100) / 100;
    }
  }, [volume]);

  // Handle autoplay setup
  useEffect(() => {
    const tryPlayAudio = async () => {
      try {
        if (!hasPlayedOnce) {
          await audioRef.current?.play();

          // Mark audio as played once
          setHasPlayedOnce(true);

          // If successful, clear the interval
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } catch (e) {
        // console.error("Auto-play prevented or an error occurred:", e);
      }
    };

    // Only start the retry interval if autoplay is true and we're in view mode
    if (autoplay && mode === WidgetModes.View && !hasPlayedOnce) {
      // Try immediately after user interaction
      tryPlayAudio();

      // Set up interval for retrying
      intervalRef.current = setInterval(tryPlayAudio, 2000);
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();  // Stop audio on unmount
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoplay, mode, hasUserInteracted, hasPlayedOnce]);

  return (
    <audio
      ref={audioRef}
      controls={!hidden}
      loop={repeat}
      style={{
        width: '100%',
        display: hidden ? 'none' : 'block',
      }}
      src={link}
      preload="none"
    />
  );
};

export default AudioWidget;