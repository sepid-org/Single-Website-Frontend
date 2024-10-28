import React from "react";
import archive from "../../../assets/archive.svg";
import { Box } from "@mui/material";

const ArchiveIcon = () => {
	return (
		<Box
			component="img"
			src={archive}
			width={28}
			height={28}
		/>
	);
}

export default ArchiveIcon;