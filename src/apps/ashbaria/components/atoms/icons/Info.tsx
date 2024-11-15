import { Box } from "@mui/material";
import React from "react";
import InfoSVG from "../../../assets/info.svg";

const InfoIcon = ({ size = 30 }) => {
	return (
		<Box
			component="img"
			src={InfoSVG}
			width={size}
			height={size}
		/>
	);
}

export default InfoIcon;