import { Box, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import BackButton from "../atoms/BackButton";
import archive from "../../assets/archive.svg";
import outlinedArchive from "../../assets/outlinedArchive.svg";
import Paper from "commons/template/Paper";


const EvidenceContent = ({ pageIDs = [1, 2, 3] }) => {

	const [currentPage, setCurrentPage] = useState(1);

	return (
		<Dialog
			open
			sx={{
				minWidth: "90%",
				minHeight: "90%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box
				sx={{
					minWidth: "100%",
					height: "auto",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					margin: "10px",
				}}
			>
				<BackButton />
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Box
						component="img"
						src={archive}
						width="28px"
						height="28px"
					/>
					<Typography
						variant="h6"
						sx={{ fontSize: "18px", fontWeight: 800, color: "white" }}
					>
						نام سند
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Box
						component="img"
						src={outlinedArchive}
						width="28px"
						height="28px"
					/>
					<Typography
						variant="h6"
						sx={{ fontSize: "18px", fontWeight: 800, color: "white" }}
					>
						بایگانی
					</Typography>
				</Box>
			</Box>
			<Box 
				sx={{
					margin: "15px",
					fontSize: "12px",
					fontWeight: 600,
					lineHeight: "18.69px",
					textAlign: "left",
					minWidth: "100%"
				}}
			>
				<Paper mode="general" paperId="6775" /> {/*change id value to pageIDs[currentPage].toString() */}
			</Box>
		</Dialog>
	);
}

export default EvidenceContent;