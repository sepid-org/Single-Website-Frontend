import React from "react";
import smsSvg from "../../../assets/sms.svg";
import { Box } from "@mui/material";

const SMSIcon = () => {
	return (
		<Box
			component="img"
			src={smsSvg}
			width={24}
			height={24}
		/>
	);
}

export default SMSIcon;