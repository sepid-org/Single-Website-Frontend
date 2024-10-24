import { Button } from "@mui/material";
import React, { MouseEventHandler } from "react";

interface CustomButtonProps{
	minWidth: number,
	handleClick: MouseEventHandler,
	buttonText: string,
	fullWidth: boolean
}

const CustomContainedButton:React.FC<CustomButtonProps> = ({ minWidth, handleClick, buttonText, fullWidth }) => {
	return (
		<Button
			fullWidth={fullWidth}
			sx={{
				height: 44,
				minWidth: minWidth,
				borderRadius: 100,
				backgroundColor: "#130e15",
				color: "black",
				background: "linear-gradient(to right, #FE9C42, #E25100)",
			}}
			onClick={handleClick}
		>
			{buttonText}
		</Button>
	);
}

export default CustomContainedButton;