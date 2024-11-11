import { Box } from "@mui/material";
import search from "../../../assets/search-normal.svg";
import React from "react";

const SearchIcon = ({ size = 40 }) => {
	return (
		<Box
			component="img"
			src={search}
			width={size}
			height={size}
		/>
	);
}

export default SearchIcon;