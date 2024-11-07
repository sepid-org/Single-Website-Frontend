import { BalancesType } from 'commons/types/bank';
import { BankApi } from './BankApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type GetMyBalancesOutputType = BalancesType;

type GetMyRankOutputType = {
  rank: number;
};

type GetMyRankInputType = { currencyName: string };

export const MyInfoSlice = BankApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBalances: builder.query<GetMyBalancesOutputType, void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'Balances', id: 'MY' }
      ]),
      query: () => 'counter/my-balances/',
    }),

    getMyRank: builder.query<GetMyRankOutputType, GetMyRankInputType>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'Balances', id: 'MY' }
      ]),
      query: ({ currencyName }) => `counter/my-rank/?currency_name=${currencyName}`,
    }),
  }),
});

export const {
  useGetMyBalancesQuery,
  useGetMyRankQuery,
} = MyInfoSlice;
