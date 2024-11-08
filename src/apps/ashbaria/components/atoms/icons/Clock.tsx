import { Box } from "@mui/material";
import clock from "../../../assets/clock.svg";
import React from "react";

const ClockIcon = () => {
	return(
		<Box 
			component="img"
			src={clock}
			width={40}
			height={40}
		/>
	);
}

export default ClockIcon;