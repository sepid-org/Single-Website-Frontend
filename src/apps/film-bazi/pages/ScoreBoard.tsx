import CompetitionScores from '../components/organisms/CompetitionScores';
import { FILMBAZI_COIN } from '../constants/game';
import React from 'react';
import FilmbaziLayout from '../components/molecules/Layout';
import useGetScoreBoardData from '../hooks/useGetScoreboardData';
import { MediaUrls } from '../constants/mediaUrls';

const ScoreBoard: React.FC = () => {
	const {
		winnerScores,
		scoreRecordsState,
		isWinnerScoresLoading,
		isScoreRecordsLoading,
	} = useGetScoreBoardData(FILMBAZI_COIN);

	return (
		<FilmbaziLayout backgroundImage={MediaUrls.SCOREBOARD_BACKGROUND}>
			<CompetitionScores allScores={scoreRecordsState} winnerScores={winnerScores} />
		</FilmbaziLayout>
	);
};

export default ScoreBoard;