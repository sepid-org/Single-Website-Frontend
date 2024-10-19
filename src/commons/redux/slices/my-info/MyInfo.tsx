import { BalancesType } from 'commons/types/bank';
import { BankApi } from '../BankApi';

type GetMyBalancesOutputType = BalancesType;

type GetMyRankOutputType = {
  rank: number;
};

type GetMyRankInputType = { currencyName: string };

export const MyInfoSlice = BankApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBalances: builder.query<GetMyBalancesOutputType, void>({
      query: () => 'counter/my-balance/',
    }),

    getMyRank: builder.query<GetMyRankOutputType, GetMyRankInputType>({
      query: ({ currencyName }) => `counter/my-rank/?currency_name=${currencyName}`,
    }),
  }),
});

export const {
  useGetMyBalancesQuery,
  useGetMyRankQuery,
} = MyInfoSlice;
