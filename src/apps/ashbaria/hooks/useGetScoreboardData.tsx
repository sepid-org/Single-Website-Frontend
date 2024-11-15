import { useEffect, useMemo, useState } from 'react';
import { useGetScoreboardQuery } from 'commons/redux/apis/bank/scoreboard/Scoreboard';
import { useGetMyRankQuery } from 'commons/redux/apis/bank/MyInfo';
import { useGetMyBalancesQuery } from 'commons/redux/apis/bank/MyInfo';
import useUserProfile from 'commons/hooks/useUserProfile';
import useGetUsersNames from './useGetUsersNames';

const useGetScoreBoardData = (currencyName) => {
  // Fetch data from API
  const { data: scoreRecords = [], isLoading: isScoreBoardLoading } = useGetScoreboardQuery({ currencyName });
  const { data: myRank, isLoading: isMyRankLoading } = useGetMyRankQuery({ currencyName });
  const { data: balances, isLoading: isBalancesLoading } = useGetMyBalancesQuery();
  const { data: userProfile } = useUserProfile();
  const userIds = useMemo(() => scoreRecords.map(user => user.user_id), [scoreRecords]);
  const { data: usersInfo, loading: isUserListLoading, error: userListError } = useGetUsersNames(userIds);

  // State for results
  const [winnerScores, setWinnerScores] = useState([]);
  const [scoreRecordsState, setScoreRecordsState] = useState({
    winnerUsersInfo: [],
    currentUserExistsInWinners: false,
  });

  // Loading states
  const isLoading = isScoreBoardLoading || isMyRankLoading || isBalancesLoading || isUserListLoading;

  // Set winner scores
  useEffect(() => {
    if (scoreRecordsState.winnerUsersInfo.length > 0) {
      setWinnerScores(scoreRecordsState.winnerUsersInfo.slice(0, 3));
    }
  }, [scoreRecordsState]);

  // Set score records state
  useEffect(() => {
    if (usersInfo && scoreRecords) {

      const newScoreRecords = scoreRecords
        .map(scoreRecord => {
          const userInfo = usersInfo.profiles.find(userInfo => userInfo.user_id === scoreRecord.user_id);
          return userInfo ? { ...userInfo, ...scoreRecord } : null;
        })
        .filter(record => record !== null);

      let exists = false;
      if (myRank?.rank) {
        const currentUserInRecords = newScoreRecords.find(record => record.user_id === userProfile?.id);
        if (currentUserInRecords != null) {
          currentUserInRecords.currentUser = true;
          exists = true;
        }
      }

      setScoreRecordsState({
        winnerUsersInfo: newScoreRecords,
        currentUserExistsInWinners: exists,
      });
    }
  }, [isLoading]);

  return { winnerScores, scoreRecordsState, isWinnerScoresLoading: isScoreBoardLoading, isScoreRecordsLoading: isLoading };
};

export default useGetScoreBoardData;