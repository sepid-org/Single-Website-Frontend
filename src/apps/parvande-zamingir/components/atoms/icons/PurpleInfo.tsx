import { Box } from "@mui/material";
import React from "react";
import PurpleInfoSVG from "../../../assets/purple-info.svg";

const PurpleInfoIcon = ({ size = 30 }) => {
	return (
		<Box
			component="img"
			src={PurpleInfoSVG}
			width={size}
			height={size}
		/>
	);
}

export default PurpleInfoIcon;