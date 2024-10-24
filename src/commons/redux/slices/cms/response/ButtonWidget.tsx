import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type SubmitButtonInputType = {
  stateId?: string;
  widgetId: string;
};

export const ButtonWidgetSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({

    submitButton: builder.mutation<void, SubmitButtonInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['player']),
      query: ({ stateId, widgetId }) => ({
        url: '/response/submit-button/',
        method: 'POST',
        body: {
          state: stateId,
          button: widgetId,
        },
      }),
    }),

  }),
});

export const {
  useSubmitButtonMutation,
} = ButtonWidgetSlice;