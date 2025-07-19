import React from "react";
import OutlinedArchive from "../../../assets/outlinedArchive.svg";
import { Box } from "@mui/material";

const OutlinedArchiveIcon = () => {
	return (
		<Box
			component="img"
			src={OutlinedArchive}
			width={28}
			height={28}
		/>
	);
}

export default OutlinedArchiveIcon;