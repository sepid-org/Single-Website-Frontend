import React, { useEffect, useRef, useState } from 'react';
import { WidgetModes } from '../../../../commons/components/organisms/Widget';
import { Box, Stack } from '@mui/material';
import ForwardAudio from '../molecules/buttons/ForwardAudio';
import PlayAudio from '../molecules/buttons/PlayAudio';
import BackwardAudio from '../molecules/buttons/BackwardAudio';


const HintAudioWidget = ({
  link,
  autoplay,
  mode,
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


  const [progress, setProgress] = useState(0);
  const pattern = [
    { height: 23 }, { height: 29 }, { height: 23 }, { height: 35 }
  ];

  const patternLength = 5 * pattern.length;

  useEffect(() => {
    const handleTimeUpdate = () => {
      const playedPercentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(playedPercentage);
    };

    const audio = audioRef.current;
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const calculateLineStyle = (index) => {
    const patternIndex = index % pattern.length;
    const progressPercentage = (index / patternLength) * 100;
    const isPlayed = progressPercentage >= (100 - progress);

    return {
      position: 'relative',
      height: pattern[patternIndex].height,
      width: 6,
      marginRight: 1,
      borderRadius: 4,
      background: '#00000066', // Default background color for "unplayed" state
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, #FE9C42 100%, #E25100 100%)',
        opacity: isPlayed ? 1 : 0, // Use opacity for smooth transition
        transition: 'opacity 0.2s ease-in-out', // Smooth transition for opacity
      },
    };
  };

  const handlePlayPauseClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    }
    else {
      audioRef.current.pause();
    }
  }

  const handleForwardClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Forward 10 seconds
    }
  };

  const handleBackwardClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10); // Backward 10 seconds, ensuring it doesn't go below 0
    }
  };

  return (
    <Stack
      alignItems={"center"}
      spacing={2}
    >
      <Stack
        flexDirection={"row"}
        alignItems={"end"}
        justifyContent={"space-between"}
        gap={3}
      >
        <ForwardAudio handleClick={handleForwardClick} />
        <PlayAudio handleClick={handlePlayPauseClick} />
        <BackwardAudio handleClick={handleBackwardClick} />
      </Stack>
      <Box sx={{ width: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
        <audio ref={audioRef} src={link} controls={false} />
        <Box sx={{ display: 'flex', alignItems: "center", width: '100%' }}>
          {Array.from({ length: patternLength - 1 }).map((_, index) => (
            <Box key={index} sx={calculateLineStyle(index)} />
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default HintAudioWidget;