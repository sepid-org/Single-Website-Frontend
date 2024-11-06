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
		/>
	);
}

export default MessageIcon;