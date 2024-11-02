import { Box } from "@mui/material";
import cup from "../../../assets/cup.svg";
import React from "react";

const CupIcon = () => {
	return(
		<Box
			component="img"
			src={cup}
			width={28}
			height={28}
		/>
	);
}

export default CupIcon;