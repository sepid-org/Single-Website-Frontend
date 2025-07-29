import { AshbariaApi } from 'apps/ashbaria/redux/AshbariaApi';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const RewardCodeSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    submitRewardCode: builder.mutation<void, { rewardCode: string }>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'RewardCode', id: 'MY' }]
      ),
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: ({ rewardCode }) => ({
        url: '/friendship-network/reward-code/submit/',
        method: 'POST',
        body: {
          code: rewardCode,
        }
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useSubmitRewardCodeMutation,
} = RewardCodeSlice;