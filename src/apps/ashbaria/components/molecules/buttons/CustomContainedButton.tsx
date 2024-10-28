import { Button } from "@mui/material";
import React, { MouseEventHandler } from "react";

interface CustomButtonProps {
	minWidth?: number,
	handleClick: MouseEventHandler,
	label: string,
	fullWidth?: boolean
}

const CustomContainedButton: React.FC<CustomButtonProps> = ({
	minWidth,
	handleClick,
	label,
	fullWidth = true,
}) => {
	return (
		<Button
			sx={{
				height: 44,
				minWidth: minWidth,
				width: (fullWidth ? "100%" : minWidth),
				borderRadius: 100,
				backgroundColor: "#130e15",
				color: "black",
				background: "linear-gradient(to right, #FE9C42, #E25100)",
			}}
			onClick={handleClick}
		>
			{label}
		</Button>
	);
}

export default CustomContainedButton;