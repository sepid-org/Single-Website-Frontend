import React from "react";
import { Skeleton, Stack } from "@mui/material";

const WinnerCardSkeleton = () => {
	return (
		<Stack alignItems={'center'}>
			<Skeleton variant="circular" width={60} height={60} />
			<Skeleton variant="text" width={60} height={60} />
			<Skeleton
				variant="rounded"
				height={180}
				sx={{
					width: {
						md: 120,
						xs: 100,
					},
				}}
			/>
		</Stack>
	);
}

export default WinnerCardSkeleton;