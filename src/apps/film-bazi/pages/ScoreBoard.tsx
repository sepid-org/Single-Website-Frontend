import AppBarComponent from '../components/organisms/Appbar';
import CompetitionScores from '../components/organisms/CompetitionScores';
import { Box } from '@mui/material';
import backgroundImg from "../assets/background.png";
import { useGetMyBalancesQuery, useGetMyRankQuery } from 'commons/redux/apis/bank/MyInfo';
import { FILMBAZI_COIN } from '../constants/game';
import { useGetScoreboardQuery } from 'commons/redux/apis/bank/scoreboard/Scoreboard';
import { ScoreBoardItemType } from 'commons/types/bank';
import useGetScoreBoardData from 'commons/hooks/useGetScoreboardData';
import React from 'react';

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
	} = useGetScoreBoardData(FILMBAZI_COIN);
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
			}}
		>
			<AppBarComponent />
			<CompetitionScores allScores={scoreRecordsState} winnerScores={winnerScores} />
		</Box>
	);
};

export default ScoreBoard;