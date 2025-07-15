import { MerchandiseType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type GetMerchandisesInputType = {
  programSlug: string;
  isActive?: boolean;
}

type GetMerchandisesOutputType = {
  count: number;
  previous: string;
  next: string;
  results: MerchandiseType[];
};

type GetMerchandiseInputType = {
  merchandiseId: number;
}

type GetMerchandiseOutputType = MerchandiseType;

type AddMerchandiseToProgramInputType = {
  programSlug: string;
} & Partial<MerchandiseType>

type AddMerchandiseToProgramOutputType = MerchandiseType;

type UpdateMerchandiseInputType = Partial<MerchandiseType>

type UpdateMerchandiseOutputType = MerchandiseType;

type SoftDeleteInputType = {
  merchandiseId: number;
}

type SoftDeleteOutputType = void;


export const MerchandiseSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getMerchandises: builder.query<GetMerchandisesOutputType, GetMerchandisesInputType>({
      providesTags: ['merchandises'],
      query: ({ programSlug, isActive }) => ({
        url: `sale/merchandise/`,
        params: {
          program__slug: programSlug,
          is_active: isActive,
        },
      }),
    }),

    getMerchandise: builder.query<GetMerchandiseOutputType, GetMerchandiseInputType>({
      providesTags: ['merchandise'],
      query: ({ merchandiseId }) => `sale/merchandise/${merchandiseId}/`,
      transformResponse: (response: any): GetMerchandiseOutputType => {
        return response;
      },
    }),

    createMerchandise: builder.mutation<AddMerchandiseToProgramOutputType, AddMerchandiseToProgramInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['merchandises']),
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
      invalidatesTags: tagGenerationWithErrorCheck(['merchandises', 'merchandise']),
      query: ({ id, ...body }) => ({
        url: `sale/merchandise/${id}/`,
        method: 'PATCH',
        body,
      }),
    }),

    softDeleteMerchandise: builder.mutation<SoftDeleteOutputType, SoftDeleteInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['merchandises', 'merchandise']),
      query: ({ merchandiseId }) => `sale/merchandise/${merchandiseId}/delete/`,
    }),

  })
});

export const {
  useGetMerchandisesQuery,
  useGetMerchandiseQuery,
  useCreateMerchandiseMutation,
  useUpdateMerchandiseMutation,
  useSoftDeleteMerchandiseMutation,
} = MerchandiseSlice;
