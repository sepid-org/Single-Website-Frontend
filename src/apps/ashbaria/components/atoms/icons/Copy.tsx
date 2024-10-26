import { Box } from "@mui/material";
import React from "react";
import copyIcon from "../../../assets/copy.svg";

const CopyIcon = () => {
	return(
		<Box
			component="img"
			src={copyIcon}
			width={28}
			height={28}
		>
		</Box>
	);
}

export default CopyIcon;