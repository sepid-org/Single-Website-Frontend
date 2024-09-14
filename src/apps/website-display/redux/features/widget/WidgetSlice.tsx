import { WidgetTypes } from 'commons/components/organisms/Widget';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { WidgetType } from 'commons/types/widgets/widget';

type CreateWidgetInputType = {
  paperId: string;
  widgetType: WidgetTypes;
}

type UpdateWidgetInputType = {
  widgetId: string;
  paperId: string;
  widgetType: WidgetTypes;
}

type GetWidgetOutputType = WidgetType;

type GetWidgetsByIdsInputType = {
  ids: string[];
}

export const WidgetSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    createWidget: builder.mutation<void, CreateWidgetInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'paper', id: item.paperId }],
      query: ({ widgetType, paperId, ...props }) => ({
        url: `/widgets/widget/`,
        method: 'POST',
        body: {
          widget_type: widgetType,
          paper: paperId,
          ...props,
        }
      }),
    }),

    updateWidget: builder.mutation<void, UpdateWidgetInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'paper', id: item.paperId }],
      query: ({ widgetType, widgetId, paperId, ...props }) => ({
        url: `/widgets/widget/${widgetId}/`,
        method: 'PATCH',
        body: {
          widget_id: widgetId,
          widget_type: widgetType,
          paper: paperId,
          ...props,
        }
      }),
    }),

    getWidget: builder.query<GetWidgetOutputType, { widgetId: string }>({
      providesTags: (result, error, item) => [{ type: 'widget', id: item.widgetId }],
      query: ({ widgetId }) => `widgets/widget/${widgetId}/`,
      transformResponse: (response: any): GetWidgetOutputType => {
        return response;
      },
    }),

    deleteWidget: builder.mutation<void, { widgetId: string, paperId: string }>({
      invalidatesTags: (result, error, item) => [{ type: 'paper', id: item.paperId }],
      query: ({ widgetId }) => ({
        url: `/widgets/widget/${widgetId}/`,
        method: 'DELETE',
      }),
    }),

    getWidgetsByIds: builder.query<GetWidgetOutputType[], GetWidgetsByIdsInputType>({
      query: (args) => ({
        url: '/widgets/widget/get_widgets_by_ids/',
        method: 'POST',
        body: args,
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'widget' as const, id })),
            { type: 'widget', id: 'LIST' },
          ]
          : [{ type: 'widget', id: 'LIST' }],
      transformResponse: (response: any[]): GetWidgetOutputType[] => {
        return response;
      },
    }),
  })
});

export const {
  useCreateWidgetMutation,
  useUpdateWidgetMutation,
  useGetWidgetQuery,
  useDeleteWidgetMutation,
  useGetWidgetsByIdsQuery,
} = WidgetSlice;