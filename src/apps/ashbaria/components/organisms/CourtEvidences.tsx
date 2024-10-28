import { Box, Grid, Typography } from "@mui/material";
import AccessibleDocument from "../molecules/AccessibleDocument";
import React from "react";
import AccessableEvidenceIcon from "../atoms/icons/AccessableEvidence";
import UnaccessableEvidenceIcon from "../atoms/icons/UnaccessableEvidence";
import UnaccessibleDocument from "../molecules/UnaccessibleDocument";


interface CourtEvidencesProps {
	courtName: string,
	documents: number[],
	accessable: boolean,
}


const CourtEvidences: React.FC<CourtEvidencesProps> = ({ courtName, documents, accessable }) => {
	return (
		<Box
			sx={{
				minWidth: "100%",
				height: "auto",
				padding: "10px",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
				{accessable ?
					(<AccessableEvidenceIcon />) :
					(<UnaccessableEvidenceIcon />)
				}
				<Typography
					sx={{
						minWidth: "100%",
						fontSize: "16px",
						fontWeight: 700,
						lineHeight: "25.59px",
					}}
					style={{
						direction: "rtl",
						textAlign: "right"
					}}
				>
					{courtName}
				</Typography>
			</Box>
			<Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
				{documents.map((item) => {
					return (
						accessable ?
							(<AccessibleDocument />) :
							(<UnaccessibleDocument />)
					);
				})}
			</Grid>
		</Box >
	);
}

export default CourtEvidences;