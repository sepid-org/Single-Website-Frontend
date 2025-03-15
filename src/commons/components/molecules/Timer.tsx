import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClockIcon from "commons/components/atoms/icons/Clock";
import { toPersianNumber } from "commons/utils/translateNumber";

const Timer = ({ onTimeFinish, duration, startTime: initialStartTime }) => {
  const [time, setTime] = useState(null); // Convert duration to seconds
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
        onTimeFinish(); // Call onTimeFinish only once
      }
    };

    updateTimer(); // Initial update
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId); // Cleanup interval
  }, [duration, initialStartTime, onTimeFinish, hasFinished]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  };

  return (
    <Stack
      position="relative"
      direction="row"
      alignItems="center"
      justifyContent="center"
      padding={1}
      spacing={1}
      sx={{
        backgroundColor: "#00000080",
        borderRadius: 8,
        width: 90,
        height: 40,
      }}
    >
      <Stack alignItems={'center'} justifyContent={'center'} paddingRight={4}>
        {time !== null ? (
          <Typography textAlign="center" fontSize={16}>
            {toPersianNumber(formatTime(time))}
          </Typography>
        ) : (
          <Skeleton variant="rounded" width="50%" height={30} />
        )}
      </Stack>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          position: "absolute",
          right: 12,
        }}
      >
        <ClockIcon size={24} />
      </Stack>
    </Stack>
  );
};

export default Timer;
