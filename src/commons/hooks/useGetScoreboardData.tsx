import { useEffect, useState } from 'react';
import { useGetScoreboardQuery } from 'commons/redux/slices/bank/scoreboard/Scoreboard';
import { useGetMyRankQuery } from 'commons/redux/slices/bank/MyInfo';
import { useGetMyBalancesQuery } from 'commons/redux/slices/bank/MyInfo';
import useUserProfile from './useUserProfile';
import { Scoreboard } from '@mui/icons-material';

const useGetScoreBoardData = (currencyName) => {
  // Fetch data from API
  const { data: scoreBoard = [], isLoading: isScoreBoardLoading } = useGetScoreboardQuery({ currencyName });
  const { data: myRank, isLoading: isMyRankLoading } = useGetMyRankQuery({ currencyName });
  const { data: balances, isLoading: isBalancesLoading } = useGetMyBalancesQuery();
  const { data: userProfile } = useUserProfile();
  //console.log(scoreBoard);

  // State for results
  const [winnerScores, setWinnerScores] = useState([]);
  const [scoreRecordsState, setScoreRecordsState] = useState({
    winnerUsersInfo: [],
    winnerScoresInfo: [],
    currentUser: null,
    currentUserExistsInWinners: false,
  });

  // Loading states
  const isLoading = isScoreBoardLoading || isMyRankLoading || isBalancesLoading;

  // Set winner scores
  useEffect(() => {
    if (scoreBoard) {
      const ranks = [];
      for (let i = 0; i < 3; i++) {
        const rank = scoreBoard.find(record => record.rank === i + 1);
        if (rank != null) {
          ranks.push(rank);
        }
      }
      setWinnerScores(ranks);
    }
  }, [isScoreBoardLoading]);

  // Set score records state
  useEffect(() => {
    if (isLoading) return;

    const newRecords = scoreBoard
      .filter(item => item.score >= 0)
      .map(item => ({ ...item, currentUser: false }));

    let exists = false;
    if (myRank?.rank) {
      const currentUserInRecords = newRecords.find(record => record.id === userProfile?.id);
      if (currentUserInRecords != null) {
        currentUserInRecords.currentUser = true;
        exists = true;
      }
    }
    
    setScoreRecordsState({
      winnerUsersInfo: newRecords,
      winnerScoresInfo: winnerScores,
      currentUser: {
        first_name: userProfile?.first_name,
        last_name: userProfile?.last_name,
        profileImg: "nothing!", //replace later
        rank: myRank?.rank,
        currentUser: true,
        id: userProfile?.id,
        score: balances?.[currencyName] || 0,
      },
      currentUserExistsInWinners: exists,
    });
  }, [isLoading]);

  return { winnerScores, scoreRecordsState, isWinnerScoresLoading: isScoreBoardLoading, isScoreRecordsLoading: isLoading };
};

export default useGetScoreBoardData;