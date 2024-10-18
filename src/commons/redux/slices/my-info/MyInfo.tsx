import { BankApi } from '../BankApi';

// Define the output type for balance API
type GetMyBalancesOutputType = {
  balance: string; // Adjust based on actual response structure
};

type GetMyRankOutputType = {
  rank: number;
};

type GetMyRankInputType = { currencyName: string };

export const MyInfoSlice = BankApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch user's balances
    getMyBalances: builder.query<GetMyBalancesOutputType, void>({
      query: () => 'my/balances/',  // Adjust the URL to match your API path
    }),

    // Fetch user's rank based on the currency
    getMyRank: builder.query<GetMyRankOutputType, GetMyRankInputType>({
      query: ({ currencyName }) => `my/rank/?currency_name=${currencyName}`,
    }),
  }),
});

export const {
  useGetMyBalancesQuery,
  useGetMyRankQuery,
} = MyInfoSlice;
