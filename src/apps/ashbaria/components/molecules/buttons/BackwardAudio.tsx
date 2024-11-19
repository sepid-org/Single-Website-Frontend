import { Button } from "@mui/material";
import React from "react";
import Backward10SecondsIcon from "../../atoms/icons/Backward10Seconds";

const BackwardAudio = () => {
	return (
		<Button
			sx={{
				width: '45px',
				height: '45px',
				padding: '0',
				backgroundColor: "#00000066",
				border: '2px solid #FE9C42',
				borderRadius: '50%', 
				display: 'flex', 
				alignItems: 'center',
				justifyContent: 'center',
				minWidth: '0',
			}}
		>
			<Backward10SecondsIcon />
		</Button>
	);
}

export default BackwardAudio;