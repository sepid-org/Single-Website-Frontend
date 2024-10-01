import React, { Fragment, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useGetScoreBoard from '../hooks/useGetScoreBoard';
import AppBarComponent from '../components/organisms/Appbar';
import useGetMyRank from '../hooks/useGetMyRank';
import { useSelector } from 'react-redux';
import CompetitionScores from '../components/organisms/CompetitionScores';
import { Box, Container } from '@mui/material';
import backgroundImg from "../assets/background.png";
import { Scoreboard } from '@mui/icons-material';
import { ScoreBoardItemType } from '../types';
import useGetMyBalances from '../hooks/useGetMyBalances';

interface scoreRecordsStateProp{
    winnerUsersInfo: ScoreBoardItemType[],
    winnerScoresInfo: {rank: number, score: number}[],
    currentUser: ScoreBoardItemType,
    currentUserExistsInWinners: boolean
}



const App: React.FC = () => {
	let { scoreBoard, loading: scoreBoardLoading } = useGetScoreBoard();
	const {rank: myRank, loading: myRankLoading, error: myRankError} = useGetMyRank();
	const {balances, loading: balancesLoading} = useGetMyBalances();
    const userAccount = useSelector((state: any) => state.account);
    const [winnerScores, setWinnerScores] = useState([]);
    const [scoreRecordsState, setScoreRecordsState] = useState<scoreRecordsStateProp>({winnerUsersInfo: [],winnerScoresInfo: [], currentUser: null, currentUserExistsInWinners: false});
    
	useEffect(() => {
		if (scoreBoard.length > 0) {
			const ranks = [];
			for(let i = 1; i < 4; i++){
				let rank = scoreBoard.find(record => record.rank === i);
				if(rank != null){
					ranks.push({rank: i, score: rank.score});
				}
			}
            setWinnerScores(ranks);
		}
	  }, [scoreBoardLoading]);


	useEffect(() => {
		if(!scoreBoardLoading && !myRankLoading && !balancesLoading){
            let newRecords = [...scoreBoard];
            for(let i = 0; i < newRecords.length; i++){
				Object.defineProperty(newRecords[i], "currentUser", {value: false, writable: true});
			}
            let exists = false;
            if(myRank.rank != null){
                let currentUserInRecords = (newRecords.find(record => (record.id === userAccount.userInfo.id )));
                if (currentUserInRecords != null){
                    currentUserInRecords.currentUser = true;
                    exists = true;
                }
            }
            setScoreRecordsState({...scoreRecordsState, 
                winnerUsersInfo: newRecords, 
                currentUser: {
                    first_name: userAccount.userInfo.first_name,
                    last_name: userAccount.userInfo.last_name,
                    rank: myRank.rank,
                    currentUser: true,
                    id: userAccount.userInfo.id,
                    score: balances["filmbazi-coin"]
                },
                currentUserExistsInWinners: exists
            });
		}
	}, [scoreBoardLoading, myRankLoading, balancesLoading])


	return (
		<Box
            sx = {{
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
			<CompetitionScores allScores={scoreRecordsState} winnerScores={winnerScores}/>
		</Box>
	);
};

export default App;


