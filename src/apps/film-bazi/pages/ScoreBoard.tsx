import CompetitionScores from '../components/organisms/CompetitionScores';
import backgroundImg from "../assets/background.png";
import { FILMBAZI_COIN } from '../constants/game';
import React from 'react';
import FilmbaziLayout from '../components/molecules/Layout';
import useGetScoreBoardData from '../hooks/useGetScoreboardData';

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