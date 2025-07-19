import { Stack } from "@mui/material";
import React from "react";
import SingleScoreRecordSkeleton from "../atoms/SingleScoreRecordSkeleton";

export default function ScoreRecordSkeleton() {
	return (
		<Stack width={'100%'} spacing={2}>
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
			<SingleScoreRecordSkeleton />
		</Stack>
	);
}