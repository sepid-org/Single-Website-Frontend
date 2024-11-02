import { Box } from "@mui/material";
import React from "react";
import heartIcon from "../../../assets/Heart Angle.svg";

const HeartIcon = () => {
	return (
		<Box
			component="img"
			src={heartIcon}
			width={30}
			height={30}
		/>
	);
}

export default HeartIcon;