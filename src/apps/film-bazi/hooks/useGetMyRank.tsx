import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BankApiUrl } from '../constants/Urls';
import { GAME_CURRENCY_NAME } from '../constants/game';

type GetRankResponseType = {
  rank: number;
}

const useGetMyRank = (currencyName = GAME_CURRENCY_NAME) => {
  const [rank, setRank] = useState<GetRankResponseType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const headers = new Headers();
        if (accessToken) {
          headers.append('Authorization', `JWT ${accessToken}`);
        }

        const response = await fetch(`${BankApiUrl}counter/my-rank/?currency_name=${currencyName}`, {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: GetRankResponseType = await response.json();
        setRank(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchRank();
    }
  }, [accessToken]);

  return { rank, loading, error };
};

export default useGetMyRank;