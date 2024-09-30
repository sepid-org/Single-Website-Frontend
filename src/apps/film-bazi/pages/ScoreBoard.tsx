import React, { Fragment, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useGetScoreBoard from '../hooks/useGetScoreBoard';
import AppBarComponent from '../components/organisms/Appbar';
import useGetMyRank from '../hooks/useGetMyRank';
import { useSelector } from 'react-redux';
import CompetitionScores from '../components/organisms/CompetitionScores';
import { Container } from '@mui/material';
import backgroundImg from "../assets/background.png";
import { Scoreboard } from '@mui/icons-material';
import { ScoreBoardItemType } from '../types';

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
    const [currentUser, setCurrentUser] = useState<ScoreBoardItemType>(null);

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
		  };
		  calculateWinners();
		}
	  }, [scoreBoardLoading]);

	useEffect(() => {
		if(!scoreBoardLoading && !myRankLoading && myRank!= null){
            setCurrentUser({
                first_name: userAccount.userInfo.first_name,
                last_name: userAccount.userInfo.last_name,
                rank: myRank.rank,
                currentUser: true,
                score: 0
            });
            let newRecords = [...scoreBoard];
			let currentUserInRecords = (newRecords.find(record => (record.rank === myRank.rank && userAccount.userInfo.first_name === record.first_name && userAccount.userInfo.last_name === record.last_name)));
            if (currentUserInRecords != null){
				currentUserInRecords.currentUser = true;
			}
            setScoreRecords(newRecords);
		}
	}, [scoreBoardLoading, myRankLoading])


	return (
		<Container
            sx = {{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
                height: '100vh',
                minWidth: "100vw",
                width: "100vw",
            }}
        >
			<AppBarComponent />	
			<CompetitionScores winners={winners} allScores={scoreRecords} currentUser={currentUser} />
		</Container>
	);
};

export default App;


