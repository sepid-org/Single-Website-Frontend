import { useState, useCallback } from 'react';
import { FilmBaziApiUrl } from '../constants/Urls';
import { SeatType } from '../types';
import { useSelector } from 'react-redux';


export const useSelectSeat = () => {
  const [selectedSeat, setSelectedSeat] = useState<SeatType>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  const selectSeat = useCallback(async (seatName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${FilmBaziApiUrl}cinema-game/select-seat/?seat_name=${seatName}`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${accessToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to select seat');
      }
      const data: SeatType = await response.json();
      setSelectedSeat(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { selectedSeat, loading, error, selectSeat };
};

