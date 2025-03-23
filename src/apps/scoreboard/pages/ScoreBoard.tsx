import React from 'react';
import CompetitionScores from '../components/CompetitionScores';
import useGetScoreBoardData from '../hooks/useGetScoreboardData';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from 'commons/template/Layout';

const ScoreBoard: React.FC = () => {
	const { programSlug } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const currency = searchParams.get('currency') || `${programSlug}-coin`;

	const {
		winnerScores,
		scoreRecordsState,
		isWinnerScoresLoading,
		isScoreRecordsLoading,
	} = useGetScoreBoardData(currency);

	return (
		<Layout appbarMode='PROGRAM_SECTION'>
			<CompetitionScores allScores={scoreRecordsState} winnerScores={winnerScores} />
		</Layout>
	);
};

export default ScoreBoard;