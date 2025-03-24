import { Box, Stack } from "@mui/material";
import React from "react";
import WinnerCardSkeleton from "../atoms/WinnerCardSkeleton";

export default function WinnerCardsSkeleton() {
	return (
		<Stack direction={'row'} spacing={1} marginBottom={1}>
			<WinnerCardSkeleton />
			<WinnerCardSkeleton />
			<WinnerCardSkeleton />
		</Stack>
	);
}