import { BankApi } from '../BankApi';

type GetScoreboardOutputType = Array<{
  id: string;
  rank: number;
  score: string;
  first_name: string;
  last_name: string;
}>;

type GetScoreboardInputType = { currencyName: string };

export const ScoreboardSlice = BankApi.injectEndpoints({
  endpoints: (builder) => ({
    getScoreboard: builder.query<GetScoreboardOutputType, GetScoreboardInputType>({
      query: ({ currencyName }) => `scoreboard/?currency_name=${currencyName}`,
    }),
  }),
});

export const {
  useGetScoreboardQuery,
} = ScoreboardSlice;
