import { PaperType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type GetPaperOutputType = PaperType;

export const PaperSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getPaper: builder.query<GetPaperOutputType, { paperId: string }>({
      providesTags: (result) => [{ type: 'paper', id: result?.id }],
      query: ({ paperId }) => `fsm/paper/${paperId}/`,
      transformResponse: (response: any): GetPaperOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetPaperQuery,
} = PaperSlice;
