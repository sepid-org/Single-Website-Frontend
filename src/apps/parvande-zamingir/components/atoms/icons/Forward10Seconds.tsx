import { Box } from "@mui/material";
import React from "react";
import forward from "../../../assets/forward-10-seconds.svg";

const Forward10SecondsIcon = () => {
	return(
		<Box
			component={"img"}
			src={forward}
			height={24}
			width={24}
		/>
	);
}

export default Forward10SecondsIcon;