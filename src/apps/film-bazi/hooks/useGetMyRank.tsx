import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FilmBaziApiUrl } from '../constants/Urls';

type GetRankResponseType = {
  rank: number;
}

const useGetMyRank = (currencyName = 'filmbazi-coin') => {
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

        const response = await fetch(`${FilmBaziApiUrl}scores/my-rank/?currency_name=${currencyName}`, {
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