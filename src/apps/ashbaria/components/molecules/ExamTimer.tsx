import { Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClockIcon from "../atoms/icons/Clock";

const ExamTimer = ({ handleTimeFinish, duration, startTime: initialStartTime }) => {
  const [time, setTime] = useState(duration * 60); // Convert duration to seconds
  const [hasFinished, setHasFinished] = useState(false); // Track if handleTimeFinish was called

  useEffect(() => {
    const startTime = new Date(initialStartTime).getTime();
    const durationInMilliseconds = duration * 60 * 1000;
    const deadline = startTime + durationInMilliseconds;

    const updateTimer = () => {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, Math.floor((deadline - currentTime) / 1000)); // Calculate remaining time in seconds
      setTime(remainingTime);

      if (remainingTime <= 0 && !hasFinished) {
        setHasFinished(true);
        handleTimeFinish(); // Call handleTimeFinish only once
      }
    };

    updateTimer(); // Initial update
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId); // Cleanup interval
  }, [duration, initialStartTime, handleTimeFinish, hasFinished]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  };

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={1}
      sx={{
        backgroundColor: "#00000080",
        borderRadius: 12,
        width: 120,
        height: 50,
      }}
    >
      {time ?
        <Typography width={"50%"} textAlign="center" variant="h6">
          {formatTime(time)}
        </Typography> :
        <Skeleton variant='rounded' width={'50%'} height={40} />
      }
      <Stack width={"30%"} display="flex" alignItems="center">
        <ClockIcon />
      </Stack>
    </Stack>
  );
};

export default ExamTimer;
