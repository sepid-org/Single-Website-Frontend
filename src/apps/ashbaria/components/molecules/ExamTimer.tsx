import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClockIcon from "../atoms/icons/Clock";

const ExamTimer = ({ handleTimeFinish, duration, started_at }) => {

  const [time, setTime] = useState(duration);
  const startTime = new Date(started_at).getTime();
  const durationInMilliseconds = duration * 60 * 1000;
  const deadline = startTime + durationInMilliseconds;

  console.log(duration);
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
  
    if (currentTime < deadline) {
      setTime(prevTime => prevTime - 1);
    } else {
      clearInterval(intervalId);
      handleTimeFinish();
    }
  }, 1000);


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  };

  return (
    <Stack
      spacing={1}
      sx={{
        backgroundColor: "#00000080",
        borderRadius: 12,
        width: 100, // Adjusted width to accommodate padding and fixed size
        height: 50, // Adjusted height to accommodate padding and icon size
        padding: '8px', // Added padding for spacing from borders
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Changed to space-between for better layout
      }}
    >
      <Typography width={"50%"} textAlign="center" variant="h6">
        {formatTime(time)}
      </Typography>
      <Stack width={"30%"} display="flex" alignItems="center">
        <ClockIcon />
      </Stack>
    </Stack>
  );
}

export default ExamTimer;