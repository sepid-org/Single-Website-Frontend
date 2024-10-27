import { Box, Button } from "@mui/material";
import React, { MouseEventHandler } from "react";


interface CustomButtonProps{
	minWidth: number,
	handleClick: MouseEventHandler,
	buttonText: string,
	fullWidth: boolean
}
 
const CustomOutlinedButton: React.FC<CustomButtonProps> = ({ minWidth, handleClick, buttonText, fullWidth }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: 44,
				minWidth: minWidth + 2,
				width: (fullWidth ? "100%" : minWidth + 2),
				borderRadius: 100,
				backgroundClip: "padding-box",
				position: "relative",
				overflow: "hidden",
				background: "linear-gradient(to right, #FE9C42, #E25100)",
			}}
		>
			<Button
				sx={{
					height: 42,
					minWidth: minWidth,
					width: (fullWidth ? "100%" : minWidth),
					borderRadius: 100,
					backgroundColor: "#130e15",
					color: "#FE9C42",
					'&:hover': {
            backgroundColor: "#130e15",
          },
				}}
				onClick={handleClick}
			>
				{buttonText}
			</Button>
		</Box>
	);
}

export default CustomOutlinedButton;