import { Stack } from "@mui/material";
import React from "react";
import SingleWinnerCardSkeleton from "../atoms/SingleWinnerCardSkeleton";

export default function WinnerCardsSkeleton() {
	return (
		<Stack direction={'row'} spacing={1}>
			<SingleWinnerCardSkeleton />
			<SingleWinnerCardSkeleton />
			<SingleWinnerCardSkeleton />
		</Stack>
	);
}