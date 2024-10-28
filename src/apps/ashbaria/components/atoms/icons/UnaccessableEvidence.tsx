import React from "react";
import evidenc from "../../../assets/unaccessableEvidence.svg";
import { Box } from "@mui/material";

const UnaccessableEvidenceIcon = () => {
	return (
		<Box
			component="img"
			src={evidenc}
			width="28px"
			height="28px"
		/>
	);
}

export default UnaccessableEvidenceIcon;