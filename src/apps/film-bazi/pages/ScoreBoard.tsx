import AppBarComponent from '../components/organisms/Appbar';
import CompetitionScores from '../components/organisms/CompetitionScores';
import { Box } from '@mui/material';
import backgroundImg from "../assets/background.png";
import { FILMBAZI_COIN } from '../constants/game';
import useGetScoreBoardData from '../hooks/useGetScoreboardData';
import React from 'react';

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