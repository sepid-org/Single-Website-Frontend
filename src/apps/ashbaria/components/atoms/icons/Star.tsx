import React from "react";
import star from "../../../assets/filledStarIcon.svg";
import { Box } from "@mui/material";

const StarIcon = () => {
	return(
		<Box 
			component={"img"}
			src={star}
			width={40}
			height={40}
		/>
	);
}

export default StarIcon;