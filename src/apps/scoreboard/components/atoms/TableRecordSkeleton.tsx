import React from "react";
import { Skeleton, Stack } from "@mui/material";

const TableRecordSkeleton = () => {
	return (
		<Stack spacing={1} direction="row" width="100%" alignItems="center">
			{/* Circular Skeleton with fixed size and anti-shrink */}
			<Skeleton
				variant="circular"
				width={60}
				height={60}
				sx={{
					flexShrink: 0,
					minWidth: 60 // Optional: ensures minimum width is respected
				}}
			/>

			{/* Rectangular Skeleton that takes remaining space */}
			<Skeleton
				variant="rounded"
				height={60}
				sx={{
					flexGrow: 1,
					width: 'auto' // Override default width
				}}
			/>
		</Stack>
	);
};

export default TableRecordSkeleton;