import React, { useEffect, useState } from 'react';
import AppBarComponent from '../components/organisms/Appbar';
import CompetitionScores from '../components/organisms/CompetitionScores';
import { Box } from '@mui/material';
import backgroundImg from "../assets/background.png";
import { useGetMyBalancesQuery, useGetMyRankQuery } from 'commons/redux/slices/bank/MyInfo';
import { FILMBAZI_COIN } from '../constants/game';
import { useGetScoreboardQuery } from 'commons/redux/slices/bank/scoreboard/Scoreboard';
import { ScoreBoardItemType } from 'commons/types/bank';
import useUserProfile from 'commons/hooks/useUserProfile';

interface ScoreRecordsStateProp {
	winnerUsersInfo: ScoreBoardItemType[],
	winnerScoresInfo: { rank: number, score: number }[],
	currentUser: ScoreBoardItemType,
	currentUserExistsInWinners: boolean
}

const ScoreBoard: React.FC = () => {
	const { data: scoreBoard = [], isLoading: isScoreBoardLoading } = useGetScoreboardQuery({ currencyName: FILMBAZI_COIN });
	const { data: myRank, isLoading: isMyRankLoading } = useGetMyRankQuery({ currencyName: FILMBAZI_COIN });
	const { data: balances, isLoading: isBalancesLoading } = useGetMyBalancesQuery();
	const { data: userProfile } = useUserProfile();
	const [winnerScores, setWinnerScores] = useState([]);
	const [scoreRecordsState, setScoreRecordsState] = useState<ScoreRecordsStateProp>({
		winnerUsersInfo: [],
		winnerScoresInfo: [],
		currentUser: null,
		currentUserExistsInWinners: false,
	});

	useEffect(() => {
		if (scoreBoard) {
			const ranks = [];
			for (let i = 0; i < 3; i++) {
				let rank = scoreBoard.find(record => record.rank === i + 1);
				if (rank != null) {
					ranks.push({ rank: i + 1, score: rank.score });
				}
			}
			setWinnerScores(ranks);
		}
	}, [isScoreBoardLoading]);

	useEffect(() => {
		if (isScoreBoardLoading || isMyRankLoading || isBalancesLoading) {
			return;
		}

		const newRecords = scoreBoard
			.filter(item => item.score >= 0)
			.map(item => ({
				...item,
				currentUser: false
			}));

		let exists = false;
		if (myRank?.rank) {
			let currentUserInRecords = (newRecords.find(record => (record.id == userProfile?.id)));
			if (currentUserInRecords != null) {
				currentUserInRecords.currentUser = true;
				exists = true;
			}
		}
		setScoreRecordsState({
			...scoreRecordsState,
			winnerUsersInfo: newRecords,
			currentUser: {
				first_name: userProfile?.first_name,
				last_name: userProfile?.last_name,
				rank: myRank?.rank,
				currentUser: true,
				id: userProfile?.id,
				score: balances?.[FILMBAZI_COIN] || 0,
			},
			currentUserExistsInWinners: exists
		});
	}, [isScoreBoardLoading, isMyRankLoading, isBalancesLoading, userProfile])

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