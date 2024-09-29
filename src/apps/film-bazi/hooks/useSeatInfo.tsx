import { useState, useCallback } from 'react';
import { FilmBaziApiUrl } from '../constants/Urls';


export const useSeatInfo = () => {
  const [seatInfo, setSeatInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSeatInfo = useCallback(async (seatName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${FilmBaziApiUrl}cinema-game/seat/?seat_name=${seatName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch seat info');
      }
      const data = await response.json();
      setSeatInfo(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { seatInfo, loading, error, fetchSeatInfo };
};

