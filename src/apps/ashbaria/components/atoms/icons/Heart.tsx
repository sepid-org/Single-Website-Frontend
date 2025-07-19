import { Box } from "@mui/material";
import React from "react";
import heartIcon from "../../../assets/Heart Angle.svg";

const HeartIcon = ({ size = 30 }) => {
	return (
		<Box
			component="img"
			src={heartIcon}
			width={size}
			height={size}
		/>
	);
}

export default HeartIcon;