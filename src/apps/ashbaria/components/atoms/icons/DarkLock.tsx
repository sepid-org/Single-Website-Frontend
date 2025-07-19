import React from "react";
import DarkLockSVG from "../../../assets/dark-lock.svg";
import { Box } from "@mui/material";

const DarkLockIcon = ({ size = 28 }) => {
	return (
		<Box
			component="img"
			src={DarkLockSVG}
			width={size}
			height={size}
		/>
	);
}

export default DarkLockIcon;