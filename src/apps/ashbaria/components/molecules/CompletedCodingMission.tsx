import { Box, Typography } from "@mui/material";
import React from "react";
import VerifyIcon from "../atoms/icons/Verify";


const CompletedCodingMission = ({ requiredFollows, rewardScore }) => {
	return (
		<Box
			sx={{
				background: "linear-gradient(180deg, #FFEC88 0%, #FFA95A 100%)",
				heigh: "110px",
				minWidth: "80px",
				marginLeft: "10px",
				marginRight: "10px",
				flexShrink: 0,
				borderRadius: "12px",
			}}
		>
			<Typography
				align="center"
				sx={{
					color: "black",
					fontSize: "22px",
					fontWeight: 800,
					textAlign: "center",
				}}
			>
				{requiredFollows}
			</Typography>
			<Typography
				align="center"
				sx={{
					fontSize: "16px",
					fontWeight: 400,
					lineHeight: "23.86px",
					textAlign: "center",
					color: "#2B1A42",
				}}
			>
				{"ثبت موفق"}
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginLeft: "8px",
					marginRight: "5px",
					marginTop: "5px",
					marginBottom: "5px",
					backdropFilter: "blur(4px)",
					boxShadow: "0px 4px 4px 0px #00000040",
					backgroundColor: "#00000080",
					borderRadius: "20px",
				}}
			>
				<Typography
					fontSize={16}
					fontWeight={800}
					sx={{
						textAlign: "right"
					}}
				>
					{rewardScore}
				</Typography>
				<VerifyIcon />
			</Box>
		</Box>
	);
}

export default CompletedCodingMission;