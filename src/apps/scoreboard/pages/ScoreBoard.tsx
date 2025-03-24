import React from 'react';
import Table from '../components/organisms/Table';
import useGetScoreBoardData from '../hooks/useGetScoreboardData';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from 'commons/template/Layout';
import TopThree from '../components/organisms/TopThree';
import { Stack } from '@mui/material';

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
			<Stack maxWidth={'sm'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
				<TopThree winnerScores={winnerScores} />
				<Table allScores={scoreRecordsState} />
			</Stack>
		</Layout>
	);
};

export default ScoreBoardPage;