import { Box } from "@mui/material";
import React from "react";
import RankingSVG from "../../../assets/ranking.svg";

const RankingIcon = ({ size = 30 }) => {
	return (
		<Box
			component="img"
			src={RankingSVG}
			width={size}
			height={size}
		/>
	);
}

export default RankingIcon;