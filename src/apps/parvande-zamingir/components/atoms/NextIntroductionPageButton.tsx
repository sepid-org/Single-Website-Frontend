import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from "react";

const NextIntroductionPageButton = ({handleClick}) => {
	return (
		<Button
			variant="outlined"
			sx={{
				backgroundColor: "#130e15",
			}}
			onClick={handleClick}
		>
			{"بعدی"}
			<ArrowBackIcon />
		</Button>
	);
}

export default NextIntroductionPageButton;