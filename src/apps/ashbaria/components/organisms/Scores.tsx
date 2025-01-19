import React, { Fragment, useEffect, useRef } from "react";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ScoreRecord from "../molecules/ScoreRecord";
import ScoreRecordSkeleton from "../molecules/ScoreRecordsSkeleton";
import WinnerCardsSkeleton from "../molecules/WinnerCardsSkeleton";
import BackButton from "../molecules/buttons/Back";
import SearchIcon from "../atoms/icons/Search";
import CupIcon from "../atoms/icons/Cup";
import rankings from "../../assets/rankings.svg";
import { ASHBARIA_COIN } from '../../constants/game-info';
import useGetScoreBoardData from "apps/ashbaria/hooks/useGetScoreboardData";
import WinnerRecord from "../molecules/WinnerRecord";
import { toPersianNumber } from "commons/utils/translateNumber";
import hashStringToNumber from "commons/utils/hashStringToNumber";

export default function Scores() {
	const {
		winnerScores,
		scoreRecordsState,
		isWinnerScoresLoading,
		isScoreRecordsLoading,
	} = useGetScoreBoardData(ASHBARIA_COIN);

	const getDisplayName = (user_id: string, first_name: string, last_name: string) => {
		if (first_name && last_name) {
			return `${first_name} ${last_name}`;
		}

		const hashCode = hashStringToNumber(user_id);
		return `دادبستان ${toPersianNumber(hashCode.toString().padStart(4, '0'))}`;
	}

	const currentUserScoreRecord = useRef(null);
	useEffect(() => {
		if (currentUserScoreRecord.current) {
			currentUserScoreRecord.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest'
			})
		}
	}, [currentUserScoreRecord.current]);

	return (
		<Stack alignItems={'center'} justifyContent={'center'} padding={2} spacing={2} position={'relative'}>
			<Stack direction={'row'}>
				<Box position={'absolute'} left={4} top={4}>
					<BackButton />
				</Box>
				<Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
					<CupIcon size={32} />
					<Typography fontSize={24} fontWeight={800}>
						{'شاخ‌ترین‌ها'}
					</Typography>
				</Stack>
				{/* <Box position={'absolute'} right={8} top={6}>
					<IconButton>
						<SearchIcon size={32} />
					</IconButton>
				</Box> */}
			</Stack>

			<Typography variant="h5" padding={4}>
				{'جدول امتیازات پنهان شده است :)'}
			</Typography>

		</Stack>
	);
}