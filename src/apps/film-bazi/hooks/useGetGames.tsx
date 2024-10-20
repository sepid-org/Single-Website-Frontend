import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GameType } from 'apps/film-bazi/types';
import { FilmBaziApiUrl } from '../constants/Urls';

const useGetGames = () => {
  const [games, setGames] = useState<GameType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const headers = new Headers();
        if (accessToken) {
          headers.append('Authorization', `JWT ${accessToken}`);
        }

        const response = await fetch(`${FilmBaziApiUrl}games/games/`, {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: GameType[] = await response.json();
        setGames(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchGames();
    }
  }, [accessToken]);

  return { games, loading, error };
};

export default useGetGames;