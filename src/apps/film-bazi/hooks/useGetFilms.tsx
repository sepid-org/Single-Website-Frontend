import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FilmType } from 'apps/film-bazi/types';
import { FilmBaziApiUrl } from '../constants/Urls';

const useGetFilms = () => {
  const [films, setFilms] = useState<FilmType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const headers = new Headers();
        if (accessToken) {
          headers.append('Authorization', `JWT ${accessToken}`);
        }

        const response = await fetch(`${FilmBaziApiUrl}films/films/`, {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: FilmType[] = await response.json();
        setFilms(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchFilms();
    }
  }, [accessToken]);

  return { films, loading, error };
};

export default useGetFilms;