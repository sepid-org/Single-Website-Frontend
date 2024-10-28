import { Box, Typography } from "@mui/material";
import React from "react";
import VerifyIcon from "../atoms/icons/Verify";
import TwoPeopleIcon from "../atoms/icons/TwoPeople";

interface FriendshipNetworkPointProps {
	points: string,
	numberOfFriends: string
}

const FriendshipNetworkPoints: React.FC<FriendshipNetworkPointProps> = ({
	points,
	numberOfFriends,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: "space-around",
				flexDirection: "row",
				height: 36,
				minWidth: 120,
				borderRadius: 20,
				backgroundColor: "#0000004D",
				border: 0,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					fontSize={16}
					fontWeight={800}
					sx={{
						textAlign: "right"
					}}
				>
					{points}
				</Typography>
				<VerifyIcon />
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					fontSize={16}
					fontWeight={800}
					sx={{
						textAlign: "right"
					}}
				>
					{numberOfFriends}
				</Typography>
				<TwoPeopleIcon />
			</Box>
		</Box>
	);
}

export default FriendshipNetworkPoints;