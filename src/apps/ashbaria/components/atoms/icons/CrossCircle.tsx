import React from "react";
import crossCircle from "../../../assets/cross-circle.svg";
import { Box } from "@mui/material";

const CrossCircleIcon = () => {
	return(
		<Box 
			component={"img"}
			src={crossCircle}
			width={40}
			height={40}
		/>
	);
}

export default CrossCircleIcon;