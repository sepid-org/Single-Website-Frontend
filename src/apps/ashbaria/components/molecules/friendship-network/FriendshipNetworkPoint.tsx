import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import VerifyIcon from "../../atoms/icons/Verify";
import TwoPeopleIcon from "../../atoms/icons/TwoPeople";

interface FriendshipNetworkPointProps {
	points: number,
	numberOfFriends: number
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
			<Stack spacing={0.5} direction={'row'} alignItems={'center'} justifyContent={'center'}>
				<Typography
					fontSize={16}
					fontWeight={800}
					sx={{
						textAlign: "right"
					}}
				>
					{points}
				</Typography>
				<VerifyIcon size={28} />
			</Stack>
			<Stack spacing={0.5} direction={'row'} alignItems={'center'} justifyContent={'center'}>
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
			</Stack>
		</Box>
	);
}

export default FriendshipNetworkPoints;