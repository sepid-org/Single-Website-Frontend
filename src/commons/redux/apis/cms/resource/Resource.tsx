import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { ResourceType, PublicResourceType } from 'commons/types/models';

type PublicResourceListResponse = PublicResourceType[];

type ResourceListResponse = ResourceType[];

interface CreateResourceRequest {
  target_object: number;
  type: string;
  content: number;
}

interface GetResourcesByObjectIdRequest {
  objectId: number;
  type?: string;
}

interface GetResourcesByTypeRequest {
  objectId?: number;
  type: string;
}

export const ResourceApiSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({

    getResourceById: builder.query<ResourceType, { resourceId: number }>({
      query: ({ resourceId }) => `/fsm/resources/${resourceId}/`,
      providesTags: (result, error, id) => [{ type: 'Resource', id }],
    }),

    createResource: builder.mutation<void, CreateResourceRequest>({
      query: (newHint) => ({
        url: '/fsm/resources/',
        method: 'POST',
        body: newHint,
      }),
      invalidatesTags: ['Resource'],
    }),

    deleteResource: builder.mutation<void, number>({
      query: (id) => ({
        url: `/fsm/resources/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Resource', id: 'LIST' }],
    }),

    getResourcesByObjectId: builder.query<PublicResourceListResponse, GetResourcesByObjectIdRequest>({
      providesTags: (result, error, arg) => [
        { type: 'Resource', id: 'LIST' },
        { type: 'Treasury', id: 'MY' },
      ],
      query: ({ objectId, type }) => ({
        url: `/fsm/resources/by-object/`,
        params: {
          object_id: objectId,
          type,
        },
      }),
    }),

    getResourcesByType: builder.query<ResourceListResponse, GetResourcesByTypeRequest>({
      providesTags: (result, error, { type }) => [
        { type: 'Resource', id: type },
      ],
      query: ({ objectId, type }) => ({
        url: `/fsm/resources/by-type/`,
        params: {
          object_id: objectId,
          type,
        },
      }),
    }),
  }),
});

export const {
  useGetResourceByIdQuery,
  useCreateResourceMutation,
  useDeleteResourceMutation,
  useGetResourcesByObjectIdQuery,
  useGetResourcesByTypeQuery,
} = ResourceApiSlice;
