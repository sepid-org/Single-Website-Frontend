import { Box } from "@mui/material";
import React from "react";
import play from "../../../assets/playIcon.svg";

const OrangePlayIcon = () => {
	return(
		<Box
			component={"img"}
			src={play}
			height={55}
			width={55}
		/>
	);
}

export default OrangePlayIcon;