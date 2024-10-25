import React from "react";
import UserInfo from "../template/UserInfo";
import { Box } from "@mui/material";
import backgroundImg from "../assets/profileBackground.svg"


export default function Profile() {

	return (
		<Box
			sx={{
				minHeight: "100vh",
				minWidth: "100vw",
				padding: 4,
				justifyContent: "center",
				alignItems: "center",
				backgroundImage: `url(${backgroundImg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
			}}
		>
			<UserInfo />
		</Box>
	);
}