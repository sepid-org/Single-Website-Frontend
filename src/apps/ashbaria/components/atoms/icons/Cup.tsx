import { Box } from "@mui/material";
import cup from "../../../assets/cup.svg";
import React from "react";

const CupIcon = ({ size = 28 }) => {
	return (
		<Box
			component="img"
			src={cup}
			width={size}
			height={size}
		/>
	);
}

export default CupIcon;