import { Box } from "@mui/material";
import React from "react";
import SingleWinnerCardSkeleton from "../atoms/SingleWinnerCardSkeleton";

export default function WinnerCardsSkeleton() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row"
			}}
		>
			<SingleWinnerCardSkeleton />
			<SingleWinnerCardSkeleton />
			<SingleWinnerCardSkeleton />
		</Box>
	);
}