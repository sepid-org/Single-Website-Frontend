import { Box } from "@mui/material";
import React from "react";
import twoUsers from "../../../assets/profile-2user.svg";

const TwoPeopleIcon = () => {
	return (
		<Box
			component="img"
			src={twoUsers}
			width="28px"
			height="28px"
		/>
	);
}

export default TwoPeopleIcon;