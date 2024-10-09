import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FilmBaziApiUrl } from '../constants/Urls';
import { DiscountCodeType } from '../types';

const useGetDiscountCode = () => {
  const [discountCode, setDiscountCode] = useState<DiscountCodeType>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  type GetDiscountCodePropsType = {
    filmId: number;
  }

  const getDiscountCode = async ({ filmId }: GetDiscountCodePropsType) => {
    setLoading(true);
    setError(null);

    try {
      const headers = new Headers();
      if (accessToken) {
        headers.append('Authorization', `JWT ${accessToken}`);
      }

      const response = await fetch(`${FilmBaziApiUrl}films/discount-codes/get_discount_code/?film=${filmId}`, {
        headers: headers,
      });

      const data: DiscountCodeType = await response.json();

      if (!response.ok) {
        throw new Error(data['error'] || 'Failed to fetch discount code');
      }

      setDiscountCode(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { getDiscountCode, discountCode, loading, error };
};

export default useGetDiscountCode;