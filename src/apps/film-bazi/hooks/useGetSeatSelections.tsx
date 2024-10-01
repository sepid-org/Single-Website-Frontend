import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { SeatSelectionType } from 'apps/film-bazi/types';
import { FilmBaziApiUrl } from '../constants/Urls';

const useGetSeatSelections = () => {
  const [seatSelections, setSeatSelections] = useState<SeatSelectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  const fetchSeatSelections = useCallback(async () => {
    if (!accessToken) {
      setError("No access token available");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const headers = new Headers();
      headers.append('Authorization', `JWT ${accessToken}`);

      const response = await fetch(`${FilmBaziApiUrl}cinema-game/seat-selections/`, {
        headers: headers,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: SeatSelectionType[] = await response.json();
      setSeatSelections(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchSeatSelections();
    }
  }, [accessToken, fetchSeatSelections]);

  const refetch = useCallback(() => {
    fetchSeatSelections();
  }, [fetchSeatSelections]);

  return { seatSelections, loading, error, refetch };
};

export default useGetSeatSelections;