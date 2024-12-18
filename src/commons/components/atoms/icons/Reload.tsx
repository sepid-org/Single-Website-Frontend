import { Box } from "@mui/material";
import icon from "./reload.png";
import React from "react";

const ReloadIcon = () => {
	return(
		<Box 
			component="img"
			src={icon}
			width={20}
			height={20}
		/>
	);
}

export default ReloadIcon;