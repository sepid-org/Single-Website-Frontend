import React from 'react';
import ScoresTable from '../components/ScoresTable';
import useGetScoreBoardData from '../hooks/useGetScoreboardData';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from 'commons/template/Layout';

const ScoreBoardPage: React.FC = () => {
	const { programSlug } = useParams();
	const [searchParams] = useSearchParams();
	const currency = searchParams.get('currency') || `${programSlug}-coin`;

	const {
		winnerScores,
		scoreRecordsState,
		isWinnerScoresLoading,
		isScoreRecordsLoading,
	} = useGetScoreBoardData(currency);

	return (
		<Layout appbarMode='PROGRAM_SUBSECTION'>
			<ScoresTable allScores={scoreRecordsState} winnerScores={winnerScores} />
		</Layout>
	);
};

export default ScoreBoardPage;