import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export type SubmitButtonApiInputType = {
  playerId: string;
  destinationStateId?: string;
  clickedButtonId?: string;
};

export const ButtonWidgetSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({

    submitButton: builder.mutation<void, SubmitButtonApiInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['player']),
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: ({ playerId, destinationStateId, clickedButtonId }) => ({
        url: '/response/submit-button/',
        method: 'POST',
        body: {
          player_id: playerId,
          state_id: destinationStateId,
          button_id: clickedButtonId,
        },
      }),
    }),

  }),
});

export const {
  useSubmitButtonMutation,
} = ButtonWidgetSlice;