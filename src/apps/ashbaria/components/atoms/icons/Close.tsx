import React from "react";
import closeButtonIcon from "../../../assets/close-circle.svg";
import { Box } from "@mui/material";

const CloseIcon = () => {
	return (
		<Box
			component="img"
			src={closeButtonIcon}
			width={28}
			height={28}
		/>
	);
}

export default CloseIcon;