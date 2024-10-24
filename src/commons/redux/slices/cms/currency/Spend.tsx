import { BalancesType } from 'commons/types/bank';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';

type SpendFundsOnObjectInputType = {
  objectId: string;
  funds: BalancesType;
};

type SpendFundsOnObjectOutputType = {

}

export const SpendSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    spendFundsOnObject: builder.mutation<SpendFundsOnObjectOutputType, SpendFundsOnObjectInputType>({
      invalidatesTags: (result, error, item) => [],
      query: ({ objectId, funds }) => ({
        url: '/currency/spend-on-object/',
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
