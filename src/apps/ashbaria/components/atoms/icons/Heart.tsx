import { Box } from "@mui/material";
import React from "react";
import heartIcon from "../../../assets/Heart Angle.svg";

const HeartIcon = () => {
	return (
		<Box
			component="img"
			src={heartIcon}
			width={24}
			height={24}
		/>
	);
}

export default HeartIcon;