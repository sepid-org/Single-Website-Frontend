import { Box, Typography } from "@mui/material";
import React from "react";
import VerifyIcon from "../atoms/icons/Verify";


const CodingMission = ({ requiredFollows, rewardScore }) => {
	return (
		<Box
			sx={{
				bgcolor: 'rgba(0, 0, 0, 0.4)',
				heigh: "110px",
				minWidth: "80px",
				borderRadius: "12px",
				marginLeft: "10px",
				marginRight: "10px",
				flexShrink: 0
			}}
		>
			<Typography
				align="center"
				sx={{
					color: "rgba(255, 168, 0, 1)",
					fontSize: "22px",
					fontWeight: 800,
					lineHeight: "36.27px",
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
					textAlign: "center"
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

export default CodingMission;