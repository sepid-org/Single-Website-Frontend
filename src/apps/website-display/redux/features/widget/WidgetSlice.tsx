import { WidgetTypes } from 'commons/components/organisms/Widget';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import { WidgetType } from 'commons/types/widgets/widget';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

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

export const WidgetSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    createWidget: builder.mutation<void, CreateWidgetInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [{ type: 'paper', id: item.paperId }]),
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
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [{ type: 'paper', id: item.paperId }]),
      query: ({ widgetType, widgetId, paperId, ...props }) => ({
        url: `/widgets/widget/${widgetId}/`,
        method: 'PATCH',
        body: {
          widget_type: widgetType,
          paper: paperId,
          ...props,
        }
      }),
    }),

    getWidget: builder.query<GetWidgetOutputType, { widgetId: string }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [{ type: 'widget', id: item.widgetId }]),
      query: ({ widgetId }) => `widgets/widget/${widgetId}/`,
      transformResponse: (response: any): GetWidgetOutputType => {
        return response;
      },
    }),

    deleteWidget: builder.mutation<void, { widgetId: string, paperId: string }>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [{ type: 'paper', id: item.paperId }]),
      query: ({ widgetId }) => ({
        url: `/widgets/widget/${widgetId}/`,
        method: 'DELETE',
      }),
    }),

    getWidgetsByIds: builder.query<GetWidgetOutputType[], GetWidgetsByIdsInputType>({
      providesTags: tagGenerationWithErrorCheck((result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'widget' as const, id })),
            { type: 'widget', id: 'LIST' },
          ]
          : [{ type: 'widget', id: 'LIST' }]
      ),
      query: (args) => ({
        url: '/widgets/widget/get_widgets_by_ids/',
        method: 'POST',
        body: args,
      }),
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