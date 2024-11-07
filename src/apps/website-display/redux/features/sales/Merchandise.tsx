import { MerchandiseType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type GetProgramMerchandisesInputType = {
  programSlug: string;
}

type GetProgramMerchandisesOutputType = MerchandiseType[];

type GetMerchandiseInputType = {
  merchandiseId: string;
}

type GetMerchandiseOutputType = MerchandiseType;

type AddMerchandiseToProgramInputType = {
  programSlug: string;
} & Partial<MerchandiseType>

type AddMerchandiseToProgramOutputType = MerchandiseType;

type UpdateMerchandiseInputType = Partial<MerchandiseType>

type UpdateMerchandiseOutputType = MerchandiseType;

type SoftDeleteInputType = {
  merchandiseId: string;
}

type SoftDeleteOutputType = void;


export const MerchandiseSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getProgramMerchandises: builder.query<GetProgramMerchandisesOutputType, GetProgramMerchandisesInputType>({
      providesTags: ['merchandises'],
      query: ({ programSlug }) => `sale/merchandise/program_merchandises/?program=${programSlug}`,
      transformResponse: (response: any): GetProgramMerchandisesOutputType => {
        return response;
      },
    }),

    getMerchandise: builder.query<GetMerchandiseOutputType, GetMerchandiseInputType>({
      providesTags: ['merchandise'],
      query: ({ merchandiseId }) => `sale/merchandise/${merchandiseId}/`,
      transformResponse: (response: any): GetMerchandiseOutputType => {
        return response;
      },
    }),

    createMerchandise: builder.mutation<AddMerchandiseToProgramOutputType, AddMerchandiseToProgramInputType>({
      invalidatesTags: ['merchandises', { type: 'Program', id: 'ALL' }],
      query: ({ programSlug, ...body }) => ({
        url: `sale/merchandise/`,
        method: 'POST',
        body: {
          program: programSlug,
          ...body,
        }
      }),
    }),

    updateMerchandise: builder.mutation<UpdateMerchandiseOutputType, UpdateMerchandiseInputType>({
      invalidatesTags: ['merchandises', 'merchandise', { type: 'Program', id: 'ALL' }],
      query: ({ id, ...body }) => ({
        url: `sale/merchandise/${id}/`,
        method: 'PATCH',
        body,
      }),
    }),

    softDeleteMerchandise: builder.mutation<SoftDeleteOutputType, SoftDeleteInputType>({
      invalidatesTags: ['merchandises', 'merchandise', { type: 'Program', id: 'ALL' }],
      query: ({ merchandiseId }) => `sale/merchandise/${merchandiseId}/soft_delete/`,
    }),

  })
});

export const {
  useGetProgramMerchandisesQuery,
  useGetMerchandiseQuery,
  useCreateMerchandiseMutation,
  useUpdateMerchandiseMutation,
  useSoftDeleteMerchandiseMutation,
} = MerchandiseSlice;
