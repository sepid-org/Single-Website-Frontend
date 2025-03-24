import { UserRecordType } from 'apps/scoreboard/types';
import { BankApi } from 'commons/redux/apis/bank/BankApi';

type GetScoreboardInputType = { currencyName: string };

type GetScoreboardOutputType = UserRecordType[];

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
