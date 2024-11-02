import React, { useEffect, useRef } from 'react';
import AudioEditWidget from './edit';
import { WidgetModes } from '../..';
export { AudioEditWidget };

const AudioWidget = ({
  link,
  autoplay,
  mode,
}) => {
  const audioRef = useRef(null);

  // Automatically start playback after the component appears if `start_after_appearance` is true
  useEffect(() => {
    if (autoplay && audioRef.current && mode === WidgetModes.View) {
      audioRef.current.play().catch((e) => {
        // console.error("Auto-play prevented or an error occurred:", e);
      });
    }
  }, [autoplay]);

  return (
    <audio
      ref={audioRef}
      controls
      style={{ width: '100%' }}
      src={link}
      preload="auto"
    />
  );
};

export default AudioWidget;
