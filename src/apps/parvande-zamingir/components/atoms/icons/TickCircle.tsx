import React from "react";
import tickCircle from "../../../assets/tick-circle.svg";
import { Box } from "@mui/material";

const TickCircleIcon = () => {
	return(
		<Box 
			component={"img"}
			src={tickCircle}
			width={40}
			height={40}
		/>
	);
}

export default TickCircleIcon;