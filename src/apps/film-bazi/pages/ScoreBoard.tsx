import AppBarComponent from '../components/organisms/Appbar';
import CompetitionScores from '../components/organisms/CompetitionScores';
import { Box } from '@mui/material';
import backgroundImg from "../assets/background.png";
import { FILMBAZI_COIN } from '../constants/game';
import useGetScoreBoardData from '../hooks/useGetScoreboardData';
import React from 'react';
import FilmbaziLayout from '../components/molecules/Layout';

const ScoreBoard: React.FC = () => {
	const {
		winnerScores,
		scoreRecordsState,
		isWinnerScoresLoading,
		isScoreRecordsLoading,
	} = useGetScoreBoardData(FILMBAZI_COIN);

	return (
		<FilmbaziLayout backgroundImage={backgroundImg}>
			<CompetitionScores allScores={scoreRecordsState} winnerScores={winnerScores} />
		</FilmbaziLayout>
	);
};

export default ScoreBoard;