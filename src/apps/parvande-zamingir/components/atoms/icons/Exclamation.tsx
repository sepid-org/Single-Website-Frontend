import { Box } from "@mui/material";
import React from "react";
import exclamationMark from "../../../assets/Buttons.svg";

const ExclamationIcon = () => {
	return (
		<Box
			component="img"
			src={exclamationMark}
			width={52}
			height={52}
		/>
	);
}

export default ExclamationIcon;