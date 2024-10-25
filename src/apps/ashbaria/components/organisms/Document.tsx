import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import archive from "../../assets/archive.svg";
import outlinedArchive from "../../assets/outlinedArchive.svg";
import Paper from "commons/template/Paper";
import Back from "../molecules/buttons/Back";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomDocumentPagination from "../molecules/CustomDocumentsPagination";

const Document = ({ pageIDs = [1, 2, 3] }) => {

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
				<Back />
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
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: 42,
							width: 42,
							borderRadius: "100%",
							backgroundClip: "padding-box",
							position: "relative",
							overflow: "hidden",
							background: "linear-gradient(to right, #FE9C42, #E25100)",
							visibility: (currentPage < pageIDs.length ? "visible" : "hidden"),
						}}
					>
						<Button
							sx={{
								height: 40,
								width: 40,
								borderRadius: "100%",
								backgroundColor: "#130e15",
								backgroundClip: "padding-box",
								color: "#FE9C42",
							}}
							onClick={() => setCurrentPage(currentPage + 1)}
						>
							<ArrowForwardIcon />
						</Button>
					</Box>
					<CustomDocumentPagination numberOfPages={3} currentPage={currentPage} setCurrentPage={setCurrentPage} />
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: 42,
							width: 42,
							borderRadius: "100%",
							backgroundClip: "padding-box",
							position: "relative",
							overflow: "hidden",
							background: "linear-gradient(to right, #FE9C42, #E25100)",
							visibility: (currentPage > 1 ? "visible" : "hidden"),
						}}
					>
						<Button
							sx={{
								height: 40,
								width: 40,
								borderRadius: "100%",
								backgroundColor: "#130e15",
								backgroundClip: "padding-box",
								color: "#FE9C42",
							}}
							onClick={() => setCurrentPage(currentPage - 1)}
						>
							<ArrowBackIcon />
						</Button>
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
}

export default Document;