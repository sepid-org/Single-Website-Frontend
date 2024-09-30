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
    
    const [scoreRecordsState, setScoreRecordsState] = useState<scoreRecordsStateProp>({winnerUsersInfo: [],winnerScoresInfo: [],currentUser: null, currentUserExistsInWinners: false});
    
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
            setScoreRecordsState({...scoreRecordsState, winnerScoresInfo: ranks});
			console.log(ranks);
			for(let i = 0; i < scoreBoard.length; i++){
				Object.defineProperty(scoreBoard[i], "currentUser", {value: false, writable: true});
			}
		  };
		  calculateWinners();
		}
	  }, [scoreBoardLoading]);

	useEffect(() => {
		if(!scoreBoardLoading && !myRankLoading && !balancesLoading){
            setScoreRecordsState({
                ...scoreRecordsState,
                currentUser: {
                first_name: userAccount.userInfo.first_name,
                last_name: userAccount.userInfo.last_name,
                rank: myRank.rank,
                currentUser: true,
                score: balances.filmbazi_coin
                },
                currentUserExistsInWinners: true,
            });
            let newRecords = [...scoreBoard];
            if(myRank.rank != null){
                let currentUserInRecords = (newRecords.find(record => (record.rank === myRank.rank && userAccount.userInfo.first_name === record.first_name && userAccount.userInfo.last_name === record.last_name)));
                if (currentUserInRecords != null){
                    currentUserInRecords.currentUser = true;
                }
            }
            setScoreRecordsState({...scoreRecordsState, winnerUsersInfo: newRecords});
            
		}
	}, [scoreBoardLoading, myRankLoading, balancesLoading])


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
			<CompetitionScores allScores={scoreRecordsState} />
		</Container>
	);
};

export default App;


