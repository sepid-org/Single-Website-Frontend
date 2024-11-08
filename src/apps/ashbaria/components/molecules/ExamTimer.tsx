import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClockIcon from "../atoms/icons/Clock";

const ExamTimer = () => {

	const [time, setTime] = useState(60);
	useEffect(() => {
		if (time > 0) {
			const intervalId = setInterval(() => {
				setTime(prevTime => prevTime - 1);
			}, 1000);
			return () => clearInterval(intervalId);
		}
	}, [time]);

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
        position: 'fixed', // Fixed position
        top: '20px', // Adjust as needed
        right: '20px', // Adjust as needed
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