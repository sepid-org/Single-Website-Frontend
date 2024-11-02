import { Box } from "@mui/material";
import search from "../../../assets/search-normal.svg";
import React from "react";

const SearchIcon = () => {
	return(
		<Box 
			component="img"
			src={search}
			width={28}
			height={28}
		/>
	);
}

export default SearchIcon;