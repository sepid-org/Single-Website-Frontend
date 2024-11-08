import { Box } from "@mui/material";
import React from "react";


const CustomDocumentPagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				gap: 1,
			}}
		>
			{
				[...Array(currentPage - 1)].map((_, index) => (
					<Box
						sx={{
							width: 10,
							height: 10,
							borderRadius: 10,
							backgroundColor: "#FFFFFF33",
						}}
						onClick={() => {
							setCurrentPage(currentPage - (currentPage - 1 - index));
						}}
					/>
				))
			}
			<Box
				sx={{
					width: 24,
					height: 10,
					borderRadius: 10,
					backgroundColor: "#FFA800",
				}}
			/>
			{
				[...Array(numberOfPages - currentPage)].map((_, index) => (
					<Box
						sx={{
							width: 10,
							height: 10,
							borderRadius: 10,
							backgroundColor: "#FFFFFF33",
						}}
						onClick={() => {
							setCurrentPage(currentPage + index + 1);
						}}
					/>
				))
			}
		</Box>
	);
}

export default CustomDocumentPagination;