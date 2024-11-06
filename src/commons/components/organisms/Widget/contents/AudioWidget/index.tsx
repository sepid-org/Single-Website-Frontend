import React, { useEffect, useRef } from 'react';
import AudioEditWidget from './edit';
import { WidgetModes } from '../..';
export { AudioEditWidget };

const AudioWidget = ({
  link,
  autoplay,
  mode,
  repeat = false,
  volume = 100,
}) => {
  const audioRef = useRef(null);

  // Automatically start playback after the component appears if `autoplay` is true
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(Math.max(volume, 0), 100) / 100; // set volume between 0 and 1
    }

    if (autoplay && audioRef.current && mode === WidgetModes.View) {
      audioRef.current.play().catch((e) => {
        // console.error("Auto-play prevented or an error occurred:", e);
      });
    }
  }, [autoplay, volume]);

  return (
    <audio
      ref={audioRef}
      controls
      loop={repeat}
      style={{ width: '100%' }}
      src={link}
      preload="auto"
    />
  );
};

export default AudioWidget;
