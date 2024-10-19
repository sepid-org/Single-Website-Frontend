import React, { Fragment } from "react";
import { DashboardTabType } from 'commons/types/global';
import UserInfo from "../template/UserInfo";
import { Box } from "@mui/material";
import Dashboard from "commons/components/organisms/Dashboard";
import backgroundImg from "../assets/profileBackgroun.svg"

export default function Profile() {

	return (
		<Fragment>
			<Box
				sx={{
					minHeight: "100vh",
					minWidth: "100vw",
					display: "flex",
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
		</Fragment>
	);
}