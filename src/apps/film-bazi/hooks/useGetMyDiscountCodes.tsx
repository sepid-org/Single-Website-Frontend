import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DiscountCodeType, FilmType } from 'apps/film-bazi/types';
import { FilmBaziApiUrl } from '../constants/Urls';

const useGetMyDiscountCodes = () => {
  const [discountCodes, setDiscountCodes] = useState<DiscountCodeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  useEffect(() => {
    const getMyDiscountCodes = async () => {
      try {
        const headers = new Headers();
        if (accessToken) {
          headers.append('Authorization', `JWT ${accessToken}`);
        }

        const response = await fetch(`${FilmBaziApiUrl}films/discount-codes/get_my_discount_codes/`, {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: DiscountCodeType[] = await response.json();
        setDiscountCodes(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };
    if (accessToken) {
      getMyDiscountCodes();
    }
  }, [accessToken]);

  return { discountCodes, loading, error };
};

export default useGetMyDiscountCodes;