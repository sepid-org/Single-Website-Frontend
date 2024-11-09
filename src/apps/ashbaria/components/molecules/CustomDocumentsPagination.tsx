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
				[...Array(currentPage)].map((_, index) => (
					<Box
						key={index}
						sx={{
							width: 10,
							height: 10,
							borderRadius: 10,
							backgroundColor: "#FFFFFF33",
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
				[...Array(numberOfPages - currentPage - 1)].map((_, index) => (
					<Box
						key={index}
						sx={{
							width: 10,
							height: 10,
							borderRadius: 10,
							backgroundColor: "#FFFFFF33",
						}}
					/>
				))
			}
		</Box>
	);
}

export default CustomDocumentPagination;