import { AshbariaApi } from 'apps/ashbaria/redux/AshbariaApi';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const RewardCodeSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    submitRewardCode: builder.mutation<void, { rewardCode: string; giftCodeName?: string; }>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'RewardCode', id: 'MY' }]
      ),
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: ({ rewardCode, giftCodeName }) => ({
        url: '/friendship-network/reward-codes/submit/',
        method: 'POST',
        body: {
          code: rewardCode,
          gift_code_name: giftCodeName,
        }
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useSubmitRewardCodeMutation,
} = RewardCodeSlice;