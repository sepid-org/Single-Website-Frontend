import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { DetailedGeneralHint, PublicGeneralHint } from 'commons/types/models';

type GeneralHintListResponse = PublicGeneralHint[];

interface CreateGeneralHintRequest {
  target_object: number;
  hint_content: number;
}

export const GeneralHintSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({

    getGeneralHintById: builder.query<DetailedGeneralHint, number>({
      query: (id) => `/fsm/general-hint/${id}/`,
      providesTags: (result, error, id) => [{ type: 'GeneralHint', id }],
    }),

    createGeneralHint: builder.mutation<void, CreateGeneralHintRequest>({
      query: (newHint) => ({
        url: '/fsm/general-hint/',
        method: 'POST',
        body: newHint,
      }),
      invalidatesTags: ['GeneralHint'],
    }),

    deleteGeneralHint: builder.mutation<void, number>({
      query: (id) => ({
        url: `/fsm/general-hint/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'GeneralHint', id: 'LIST' }],
    }),

    getHintsByObjectId: builder.query<GeneralHintListResponse, number>({
      providesTags: (result, error, arg) => [
        { type: 'GeneralHint', id: 'LIST' },
        { type: 'Treasury', id: 'MY' },
      ],
      query: (objectId) => `/fsm/general-hint/by-object/?object_id=${objectId}`,
    }),
  }),
});

export const {
  useGetGeneralHintByIdQuery,
  useCreateGeneralHintMutation,
  useDeleteGeneralHintMutation,
  useGetHintsByObjectIdQuery,
} = GeneralHintSlice;
