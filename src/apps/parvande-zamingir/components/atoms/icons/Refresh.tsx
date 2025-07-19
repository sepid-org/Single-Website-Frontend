import React from "react";
import refresh from "../../../assets/refresh-2.svg";
import { Box } from "@mui/material";

const RefreshIcon = () => {
	return(
		<Box 
			component={"img"}
			src={refresh}
			width={20}
			height={20}
		/>
	);
}

export default RefreshIcon;