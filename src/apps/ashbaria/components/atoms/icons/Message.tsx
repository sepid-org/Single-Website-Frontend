import React from "react";
import message from "../../../assets/message-question.svg";
import { Box } from "@mui/material";

const MessageIcon = () => {
	return(
		<Box
			component="img"
			src={message}
			width={40}
			height={40}
			sx={{
				shadow: "0px 4px 4px 0px #00000040",
			}}
		/>
	);
}

export default MessageIcon;