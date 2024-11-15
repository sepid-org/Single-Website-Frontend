import { Stack, Typography } from "@mui/material";
import React from "react";
import VerifyIcon from "../../atoms/icons/Verify";


const CompletedMission = ({ requiredFollows, rewardScore }) => {
	return (
		<Stack
			alignItems={'center'}
			justifyContent={'space-between'}
			borderRadius={2}
			sx={{ background: "linear-gradient(180deg, #FFEC88 100%, #FFA95A 100%)" }}
			padding={1}
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
			<Stack
				direction={'row'}
				alignItems={'center'}
				justifyContent={'center'}
				marginTop={1}
				borderRadius={4}
				padding={0.5}
				paddingX={1}
				sx={{
					boxShadow: "0px 4px 4px 0px #00000040",
					backgroundColor: "#00000080",
				}}
				spacing={0.5}
			>
				<Typography fontSize={16} fontWeight={800}>
					{rewardScore}
				</Typography>
				<VerifyIcon size={28} />
			</Stack>
		</Stack >
	);
}

export default CompletedMission;