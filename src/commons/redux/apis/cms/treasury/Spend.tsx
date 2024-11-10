import { BalancesType } from 'commons/types/bank';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';

type SpendFundsOnObjectInputType = {
  objectId: number;
  funds: BalancesType;
};

type SpendFundsOnObjectOutputType = {

}

export const SpendSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    spendFundsOnObject: builder.mutation<SpendFundsOnObjectOutputType, SpendFundsOnObjectInputType>({
      invalidatesTags: (result, error, item) => [],
      onQueryStarted: invalidateMyTagsForTypes(['Treasury']),
      query: ({ objectId, funds }) => ({
        url: '/treasury/spend-on-object/',
        method: 'POST',
        body: {
          object_id: objectId,
          funds,
        },
      }),
    }),
  }),
});

export const {
  useSpendFundsOnObjectMutation,
} = SpendSlice;
