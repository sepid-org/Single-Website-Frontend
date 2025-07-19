import { Box } from "@mui/material";
import React from "react";
import backward from "../../../assets/backward-10-seconds.svg";

const Backward10SecondsIcon = () => {
	return(
		<Box
			component={"img"}
			src={backward}
			height={24}
			width={24}
		/>
	);
}

export default Backward10SecondsIcon;