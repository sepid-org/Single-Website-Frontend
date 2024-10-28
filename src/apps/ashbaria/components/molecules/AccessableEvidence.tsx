import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import evidence from "../../assets/evidence.svg";
import Paper from "commons/template/Paper";


const AccessableEvidenceDocument = () => {
	return (
		<Grid
			item
			xs={2}
			sx={{
				display: "flex",
				justifyContent: "center",
				height: "148px",
				minWidth: "80px",
			}}
			onClick={() => {}}
		>
			<Box
				sx={{
					width: "100%",
					minHeight: "100%",
					maxWidth: "124px",
					padding: "12px 4px 12px 4px",
					gap: "4px",
					borderRadius: "12px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					boxShadow: "0px 2px 6px 0px #0000001A",
					backgroundColor: "#00000066"
				}}
			>
				<Box
					component="img"
					src={evidence}
					width="69px"
					height="69px"
				/>
				<Typography
					sx={{
						color: "#FFA800",
						fontSize: "16px",
						fontWeight: 400,
						lineHeight: "23.86px",
						textAlign: "center",
					}}
				>
					مکالمات چپق‌فروشان
				</Typography>
			</Box>
		</Grid>
	);
}

export default AccessableEvidenceDocument;