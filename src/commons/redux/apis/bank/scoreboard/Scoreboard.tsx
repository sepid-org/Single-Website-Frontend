import { ScoreBoardItemType } from 'commons/types/bank';
import { BankApi } from '../BankApi';

type GetScoreboardInputType = { currencyName: string };

type GetScoreboardOutputType = ScoreBoardItemType[];

export const ScoreboardSlice = BankApi.injectEndpoints({
  endpoints: (builder) => ({
    getScoreboard: builder.query<GetScoreboardOutputType, GetScoreboardInputType>({
      query: ({ currencyName }) => `counter/scoreboard/?currency_name=${currencyName}`,
    }),
  }),
});

export const {
  useGetScoreboardQuery,
} = ScoreboardSlice;
