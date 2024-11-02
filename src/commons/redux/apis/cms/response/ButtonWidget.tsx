import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { createInvalidationCallback } from 'commons/redux/utilities/createInvalidationCallback';
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
      onQueryStarted: createInvalidationCallback([
        { type: 'rank', id: 'MY' },
        { type: 'balances', id: 'MY' },
      ]),
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