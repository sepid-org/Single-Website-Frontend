import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import { HintType } from 'commons/types/global';

type DeleteFSMStateHintInputType = {
  fsmStateId: string;
  hintId: string;
};

type DeleteFSMStateHintOutputType = any;

type CreateFSMStateHintInputType = {
  fsmStateId: string;
};

type CreateFSMStateHintOutputType = HintType;

type GetFSMStateHintsInputType = {
  fsmStateId: string;
};

type GetFSMStateHintsOutputType = HintType[];

type CreateWidgetHintInputType = {
  widgetId: string;
};

type CreateWidgetHintOutputType = HintType;

type DeleteWidgetHintInputType = {
  hintId: string;
};

type DeleteWidgetHintOutputType = any;

type GetWidgetHintsInputType = {
  widgetId: string;
};

type GetWidgetHintsOutputType = HintType[];

export const HintSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({

    getFSMStateHints: builder.query<GetFSMStateHintsOutputType, GetFSMStateHintsInputType>({
      providesTags: tagGenerationWithErrorCheck((result, error, { fsmStateId }) => [
        { type: 'Hint', id: fsmStateId }
      ]),
      query: ({ fsmStateId }) => ({
        url: `/fsm/hint/by-fsm-state/`,
        method: 'GET',
        params: { fsm_state_id: fsmStateId },
      }),
      transformResponse: (response: any): GetFSMStateHintsOutputType => {
        return response;
      },
    }),

    createFSMStateHint: builder.mutation<CreateFSMStateHintOutputType, CreateFSMStateHintInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, { fsmStateId }) => [
        { type: 'Hint', id: fsmStateId }
      ]),
      query: ({ fsmStateId, ...body }) => ({
        url: `/fsm/hint/`,
        method: 'POST',
        body: {
          ...body,
          widgets: [],
          reference: fsmStateId,
        },
      }),
      transformResponse: (response: any): CreateFSMStateHintOutputType => {
        return response;
      },
    }),

    deleteFSMStateHint: builder.mutation<DeleteFSMStateHintOutputType, DeleteFSMStateHintInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, { fsmStateId }) => [
        { type: 'Hint', id: fsmStateId }
      ]),
      query: ({ hintId }) => ({
        url: `/fsm/hint/${hintId}/`,
        method: 'DELETE',
      }),
      transformResponse: (response: any): DeleteFSMStateHintOutputType => {
        return response;
      },
    }),

    getWidgetHints: builder.query<GetWidgetHintsOutputType, GetWidgetHintsInputType>({
      providesTags: tagGenerationWithErrorCheck((result, error, { widgetId }) => [
        { type: 'WidgetHint', id: widgetId }
      ]),
      query: ({ widgetId }) => ({
        url: `/widgets/widget-hint/by-widget/`,
        method: 'GET',
        params: { widget_id: widgetId },
      }),
      transformResponse: (response: any): GetWidgetHintsOutputType => {
        return response;
      },
    }),

    createWidgetHint: builder.mutation<CreateWidgetHintOutputType, CreateWidgetHintInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, { widgetId }) => [
        { type: 'WidgetHint', id: widgetId }
      ]),
      query: ({ widgetId, ...body }) => ({
        url: `/widgets/widget-hint/`,
        method: 'POST',
        body: {
          ...body,
          widgets: [],
          reference: widgetId,
        },
      }),
      transformResponse: (response: any): CreateWidgetHintOutputType => {
        return response;
      },
    }),

    deleteWidgetHint: builder.mutation<DeleteWidgetHintOutputType, DeleteWidgetHintInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, { widgetId }) => [
        { type: 'WidgetHint', id: widgetId }
      ]),
      query: ({ hintId }) => ({
        url: `/widgets/widget-hint/${hintId}/`,
        method: 'DELETE',
      }),
      transformResponse: (response: any): DeleteWidgetHintOutputType => {
        return response;
      },
    }),

  })
});

export const {
  useGetFSMStateHintsQuery,
  useCreateFSMStateHintMutation,
  useDeleteFSMStateHintMutation,
  useGetWidgetHintsQuery,
  useCreateWidgetHintMutation,
  useDeleteWidgetHintMutation,
} = HintSlice;
