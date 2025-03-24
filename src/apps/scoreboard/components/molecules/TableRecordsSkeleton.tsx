import { Stack } from "@mui/material";
import React from "react";
import TableRecordSkeleton from "../atoms/TableRecordSkeleton";

export default function TableRecordsSkeleton() {
	return (
		<Stack spacing={1} width={'100%'} alignItems={'center'} justifyContent={'center'}>
			<TableRecordSkeleton />
			<TableRecordSkeleton />
			<TableRecordSkeleton />
			<TableRecordSkeleton />
		</Stack>
	);
}