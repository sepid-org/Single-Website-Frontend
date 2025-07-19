import { Box } from "@mui/material";
import React from "react";
import evidence from "../../../assets/evidence.svg";


const AccessableEvidenceIcon = () => {
	return (
		<Box
			component="img"
			src={evidence}
			width={28}
			height={28}
		/>
	);
}

export default AccessableEvidenceIcon;