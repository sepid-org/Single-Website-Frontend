import { useState, useCallback } from 'react';
import { FilmBaziApiUrl } from '../constants/Urls';


export const useSelectSeat = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectSeat = useCallback(async (seatName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${FilmBaziApiUrl}cinema-game/select-seat/?seat_name=${seatName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the auth token in localStorage
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to select seat');
      }
      const data = await response.json();
      setSelectedSeat(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { selectedSeat, loading, error, selectSeat };
};

