import React from "react";
import CheloSVG from "../../../assets/chelo.svg";
import { Box } from "@mui/material";

const CheloIcon = () => {
	return (
		<Box
			component="img"
			src={CheloSVG}
			width={86}
			height={86}
		/>
	);
}

export default CheloIcon;