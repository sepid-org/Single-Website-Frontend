import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { toPersianNumber } from 'commons/utils/translateNumber';
import { ScoreBoardItemType } from "commons/types/bank";
import VerifyIcon from "../atoms/icons/Verify";
import tempProfile from "../../assets/Profiles.svg";

const ScoreRecord: React.FC<ScoreBoardItemType> = ({ rank, first_name, last_name, score, currentUser, profileImg }) => {
	//const conditionalUserBackground = currentUser ? "linear-gradient(180deg, #BBD043 0%, #BBD043 100%)" : "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(153, 153, 153, 0.01) 100%)";
	const conditionalRankColor = rank === 1 ? "linear-gradient(180deg, #FFEC88 0%, #FFA95A 100%)" : "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(153, 153, 153, 0.01) 100%)";
	//const textColor = currentUser ? "black" : "white";
	return (
		<Stack
			width={'100%'}
			direction={'row'}
			alignItems={'center'}
			justifyContent={'center'}
			spacing={1}
		>
			<Stack
				alignItems={'center'}
				justifyContent={'center'}
				borderRadius={2}
				minWidth={60}
				height={60}
				sx={{
					background: conditionalRankColor,
					boxShadow: "0px 4px 10px 0px #00000026",
				}}
			>
				<Typography variant="body1" color='white' fontWeight='bold'>
					{toPersianNumber(rank) || '-'}
				</Typography>
			</Stack>
			<Stack
				direction={'row'}
				width={'100%'}
				height={60}
				alignItems={'center'}
				justifyContent={'space-between'}
				borderRadius={4}
				padding={2}
				sx={{
					background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(153, 153, 153, 0.01) 100%)",
				}}
			>
				<Box
					component="img"
					src={tempProfile} //replace with real profile image
					width={48}
					height={48}
				/>
				<Typography
					variant="body1"
					fontWeight={400}
					fontSize={18}
					sx={{
						flexGrow: 1,
						paddingLeft: 1,
						letterSpacing: "0.02em",
						color: "white",
						marginLeft: "10px",
					}}
				>
					{first_name + " " + last_name}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<Typography
						sx={{
							fontSize: "18px",
							fontWeight: "400",
							letterSpacing: "0.02em",
							color: "white",
							marginRight: "8px"
						}}
						variant="body1"
					>
						{toPersianNumber(score)}
					</Typography>
					<VerifyIcon />
				</Box>
			</Stack>
		</Stack>
	);
};

export default ScoreRecord;