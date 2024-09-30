import React, { Fragment, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useGetScoreBoard from '../hooks/useGetScoreBoard';
import AppBarComponent from '../components/organisms/Appbar';
import useGetMyRank from '../hooks/useGetMyRank';
import { useSelector } from 'react-redux';
import CompetitionScores from '../components/organisms/CompetitionScores';

interface ScoreRecord {
	rank: number;
	first_name: string;
	last_name: string;
	score: number;
	currentUser: boolean;
}

interface WinnerScore{
	rank: number,
	score: number
}


const App: React.FC = () => {
	let { scoreBoard, loading: scoreBoardLoading } = useGetScoreBoard();
	const {rank: myRank, loading: myRankLoading, error: myRankError} = useGetMyRank();
	
    const [winners, setWinners] = useState([]);
	const [scoreRecords, setScoreRecords] = useState([]);

	const userAccount = useSelector((state: any) => state.account);

	useEffect(() => {
		if (!scoreBoardLoading) {
		  const calculateWinners = () => {
			const ranks = [];
			for(let i = 1; i < 4; i++){
				let rank = scoreBoard.find(record => record.rank === i);
				if(rank != null){
					ranks.push({rank: i, score: rank.score});
				}
			}
			setWinners(ranks);
			for(let i = 0; i < scoreBoard.length; i++){
				Object.defineProperty(scoreBoard[i], "currentUser", {value: false, writable: true});
			}
			setScoreRecords(scoreBoard);
		  };
		  calculateWinners();
		}
	  }, [scoreBoardLoading]);

	useEffect(() => {
		if(!scoreBoardLoading && !myRankLoading && myRank!= null){
			let currentUser = (scoreBoard.find(record => (record.rank === myRank.rank && userAccount.userInfo.first_name === record.first_name && userAccount.userInfo.last_name === record.last_name)));
			if (currentUser != null){
				currentUser.currentUser = true;
				setScoreRecords(scoreBoard);
			}
		}
	}, [scoreBoardLoading, myRankLoading])


	return (
		<Fragment>
			<AppBarComponent />	
			<CompetitionScores winners={winners} allScores={scoreRecords} />
		</Fragment>
	);
};

export default App;


