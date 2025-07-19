import React from "react";
import PlaySVG from "../../../assets/play.svg";
import { Box } from "@mui/material";

const PlayIcon = ({ width = 30 }) => {
	return (
		<Box
			component="img"
			src={PlaySVG}
			width={width}
		/>
	);
}

export default PlayIcon;