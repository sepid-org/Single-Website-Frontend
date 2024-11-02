import React, { useEffect, useState } from 'react';
import CompetitionScores from '../components/organisms/CompetitionScores';
import { Box, Container, Grid, Paper } from '@mui/material';
import backgroundImg from "../assets/image6.svg";
import { useGetMyBalancesQuery, useGetMyRankQuery } from 'commons/redux/slices/bank/MyInfo';
import { useGetScoreboardQuery } from 'commons/redux/slices/bank/scoreboard/Scoreboard';
import { ScoreBoardItemType } from 'commons/types/bank';
import useUserProfile from 'commons/hooks/useUserProfile';
import { ASHBARIA_COIN } from '../constants/game-info';
import useGetScoreBoardData from 'commons/hooks/useGetScoreboardData';

interface ScoreRecordsStateProp {
	winnerUsersInfo: ScoreBoardItemType[],
	winnerScoresInfo: { rank: number, score: number }[],
	currentUser: ScoreBoardItemType,
	currentUserExistsInWinners: boolean
}

const ScoreBoard: React.FC = () => {
	const {
		winnerScores,
		scoreRecordsState,
		isWinnerScoresLoading,
		isScoreRecordsLoading,
	} = useGetScoreBoardData(ASHBARIA_COIN);

	return (
		<Box
			sx={{
				backgroundImage: `url(${backgroundImg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
				minHeight: '100vh',
				minWidth: "100vw",
				width: "100vw",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Container maxWidth='md' component={Paper}>
				<CompetitionScores allScores={scoreRecordsState} winnerScores={winnerScores} />
			</Container>
		</Box>
	);
};

export default ScoreBoard;