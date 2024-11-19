import { Button } from "@mui/material";
import React from "react";
import Forward10SecondsIcon from "../../atoms/icons/Forward10Seconds";

const ForwardAudio = ({handleClick}) => {
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
			onClick={handleClick}
		>
			<Forward10SecondsIcon />
		</Button>
	);
}

export default ForwardAudio;