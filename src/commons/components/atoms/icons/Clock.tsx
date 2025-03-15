import { Box } from "@mui/material";
import clock from "./clock.svg";
import React from "react";

const ClockIcon = ({ size = 32 }) => {
	return (
		<Box
			component="img"
			src={clock}
			width={size}
			height={size}
		/>
	);
}

export default ClockIcon;