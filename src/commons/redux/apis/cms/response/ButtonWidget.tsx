import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type SubmitButtonInputType = {
  playerId: string;
  stateId?: string;
  clickedButtonId?: string;
};

export const ButtonWidgetSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({

    submitButton: builder.mutation<void, SubmitButtonInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['player']),
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: ({ playerId, stateId, clickedButtonId }) => ({
        url: '/response/submit-button/',
        method: 'POST',
        body: {
          player_id: playerId,
          state_id: stateId,
          button_id: clickedButtonId,
        },
      }),
    }),

  }),
});

export const {
  useSubmitButtonMutation,
} = ButtonWidgetSlice;