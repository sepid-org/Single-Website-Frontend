import React from "react";
import CheloSVG from "../../../assets/chelo.svg";
import { Box } from "@mui/material";

const CheloIcon = ({ size = 90 }) => {
	return (
		<Box
			component="img"
			src={CheloSVG}
			width={size}
			height={size}
		/>
	);
}

export default CheloIcon;