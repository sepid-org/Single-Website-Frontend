import { Box } from "@mui/material";
import React from "react";
import SingleScoreRecordSkeleton from "../atoms/SingleScoreRecordSkeleton";

export default function ScoreRecordSkeleton() {
	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
		</Box>
	);
}