import React from "react";
import lockSVG from "../../../assets/lock.svg";
import { Box } from "@mui/material";

const LockIcon = ({ size = 28 }) => {
	return (
		<Box
			component="img"
			src={lockSVG}
			width={size}
			height={size}
		/>
	);
}

export default LockIcon;