import React, { useEffect, useState } from 'react';
import AppBarComponent from '../components/organisms/Appbar';
import { useSelector } from 'react-redux';
import CompetitionScores from '../components/organisms/CompetitionScores';
import { Box } from '@mui/material';
import backgroundImg from "../assets/background.png";
import { useGetMyBalancesQuery, useGetMyRankQuery } from 'commons/redux/slices/bank/MyInfo';
import { FILMBAZI_COIN } from '../constants/game';
import { useGetScoreboardQuery } from 'commons/redux/slices/bank/scoreboard/Scoreboard';
import { ScoreBoardItemType } from 'commons/types/bank';

interface ScoreRecordsStateProp {
	winnerUsersInfo: ScoreBoardItemType[],
	winnerScoresInfo: { rank: number, score: number }[],
	currentUser: ScoreBoardItemType,
	currentUserExistsInWinners: boolean
}

const ScoreBoard: React.FC = () => {
	const { data: scoreBoard, isLoading: isScoreBoardLoading } = useGetScoreboardQuery({ currencyName: FILMBAZI_COIN });
	const { data: myRank, isLoading: isMyRankLoading } = useGetMyRankQuery({ currencyName: FILMBAZI_COIN });
	const { data: balances, isLoading: isBalancesLoading } = useGetMyBalancesQuery();
	const userAccount = useSelector((state: any) => state.account);
	const [winnerScores, setWinnerScores] = useState([]);
	const [scoreRecordsState, setScoreRecordsState] = useState<ScoreRecordsStateProp>({ winnerUsersInfo: [], winnerScoresInfo: [], currentUser: null, currentUserExistsInWinners: false });

	useEffect(() => {
		if (scoreBoard) {
			const ranks = [];
			for (let i = 1; i < 4; i++) {
				let rank = scoreBoard.find(record => record.rank === i);
				if (rank != null) {
					ranks.push({ rank: i, score: rank.score });
				}
			}
			setWinnerScores(ranks);
		}
	}, [isScoreBoardLoading]);

	useEffect(() => {
		if (!isScoreBoardLoading && !isMyRankLoading && !isBalancesLoading) {
			let newRecords = [...scoreBoard];
			for (let i = 0; i < newRecords.length; i++) {
				newRecords[i] = {
					...newRecords[i],
					currentUser: false,
				};
			}
			let exists = false;
			if (myRank?.rank != null) {
				let currentUserInRecords = (newRecords.find(record => (record.id === userAccount.userInfo.id)));
				if (currentUserInRecords != null) {
					currentUserInRecords.currentUser = true;
					exists = true;
				}
			}
			setScoreRecordsState({
				...scoreRecordsState,
				winnerUsersInfo: newRecords,
				currentUser: {
					first_name: userAccount.userInfo.first_name,
					last_name: userAccount.userInfo.last_name,
					rank: myRank?.rank,
					currentUser: true,
					id: userAccount.userInfo.id,
					score: balances[FILMBAZI_COIN]
				},
				currentUserExistsInWinners: exists
			});
		}
	}, [isScoreBoardLoading, isMyRankLoading, isBalancesLoading])

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