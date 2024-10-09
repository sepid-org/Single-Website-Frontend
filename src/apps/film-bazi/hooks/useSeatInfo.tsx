import { useState, useCallback } from 'react';
import { FilmBaziApiUrl } from '../constants/Urls';
import { SeatType } from '../types';
import { useSelector } from 'react-redux';


export const useSeatInfo = () => {
  const [seatInfo, setSeatInfo] = useState<SeatType>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  const fetchSeatInfo = useCallback(async (seatName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${FilmBaziApiUrl}cinema-game/seat/?seat_name=${seatName}`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch seat info');
      }
      const data = await response.json();
      setSeatInfo(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { seatInfo, loading, error, fetchSeatInfo };
};

