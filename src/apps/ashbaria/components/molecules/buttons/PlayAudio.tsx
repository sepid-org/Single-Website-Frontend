import { Button } from "@mui/material";
import React from "react";
import OrangePlayIcon from "../../atoms/icons/OrangePlay";

const PlayAudio = ({handleClick}) => {
	return (
		<Button
			sx={{
				width: '75px',
				height: '75px',
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
			<OrangePlayIcon />
		</Button>
	);
}

export default PlayAudio;