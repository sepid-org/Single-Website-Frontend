import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BalancesType } from 'apps/film-bazi/types';
import { FilmBaziBackendURL } from '../constants/Urls';

const useGetUserBalances = () => {
  const [balances, setBalances] = useState<BalancesType>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const headers = new Headers();
        if (accessToken) {
          headers.append('Authorization', `JWT ${accessToken}`);
        }

        const response = await fetch(`${FilmBaziBackendURL}scores/user-balance/`, {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: BalancesType = await response.json();
        setBalances(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchBalances();
    }
  }, [accessToken]);

  return { balances, loading, error };
};

export default useGetUserBalances;