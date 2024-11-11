import React from "react";
import { Skeleton, Stack } from "@mui/material";

export default function SingleScoreRecordSkeleton() {
	return (
		<Stack width={'100%'} direction={'row'} spacing={1}>
			<Skeleton variant="rounded" width="70px" height="60px" />
			<Skeleton variant="rounded" width={'100%'} height="60px" />
		</Stack>
	);
}