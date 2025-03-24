import React from 'react';
import { Stack } from '@mui/material';

import { FILMBAZI_COIN } from '../constants/game';
import FilmbaziLayout from '../components/molecules/Layout';
import useGetScoreBoardData from 'apps/scoreboard/hooks/useGetScoreboardData';
import { MediaUrls } from '../constants/mediaUrls';
import Table from 'apps/scoreboard/components/organisms/Table';
import TopThree from 'apps/scoreboard/components/organisms/TopThree';

const ScoreBoard: React.FC = () => {
	const {
		winnerScores,
		scoreRecordsState,
		isWinnerScoresLoading,
		isScoreRecordsLoading,
	} = useGetScoreBoardData(FILMBAZI_COIN);

	return (
		<FilmbaziLayout backgroundImage={MediaUrls.SCOREBOARD_BACKGROUND}>
			<Stack justifySelf={'center'} maxWidth={'sm'} width={'100%'} alignItems={'center'} paddingY={2}>
				<TopThree winnerScores={winnerScores} />
				<Table allScores={scoreRecordsState} />
			</Stack>
		</FilmbaziLayout>
	);
};

export default ScoreBoard;