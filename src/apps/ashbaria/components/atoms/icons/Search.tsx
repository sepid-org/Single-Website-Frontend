import { Box } from "@mui/material";
import search from "../../../assets/search-normal.svg";
import React from "react";

const SearchIcon = () => {
	return(
		<Box 
			component="img"
			src={search}
			width={40}
			height={40}
		/>
	);
}

export default SearchIcon;