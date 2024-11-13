import { Box } from "@mui/material";
import React from "react";
import cup from "../../../assets/white-cup.svg";

const WhiteCupIcon = () => {
	return(
		<Box 
			component={"img"}
			src={cup}
			width={40}
			height={40}
		/>
	);
}

export default WhiteCupIcon;