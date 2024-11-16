import React, { useEffect, useRef, useState } from 'react';
import AudioEditWidget from './edit';
import { WidgetModes } from '../..';
export { AudioEditWidget };

const AudioWidget = ({
  link,
  autoplay,
  mode = WidgetModes.View,
  repeat = false,
  volume = 100,
  hidden = false,
}) => {
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Handle user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
      // Remove event listeners after first interaction
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Handle volume and autoplay setup
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(Math.max(volume, 0), 100) / 100;
    }

    // Only start the retry interval if autoplay is true and we're in view mode
    if (autoplay && mode === WidgetModes.View && hasUserInteracted) {
      const tryPlayAudio = async () => {
        try {
          await audioRef.current?.play();
          // If successful, clear the interval
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        } catch (e) {
          // console.error("Auto-play prevented or an error occurred:", e);
        }
      };

      // Try immediately after user interaction
      tryPlayAudio();

      // Set up interval for retrying
      intervalRef.current = setInterval(tryPlayAudio, 500);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoplay, volume, mode, hasUserInteracted]);

  return (
    <audio
      ref={audioRef}
      controls={!hidden}
      loop={repeat}
      style={{
        width: '100%',
        display: hidden ? 'none' : 'block'
      }}
      src={link}
      preload="auto"
    />
  );
};

export default AudioWidget;