import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import { ArticleType } from 'commons/types/redux/article';

type GetArticleOutputType = ArticleType;

type GetArticlesInputType = {
  isHidden?: boolean;
  pageNumber: number;
}

type GetArticlesOutputType = {
  count: number;
  articles: ArticleType[];
}

type CreateArticleInputType = {
  website: string;
} & Partial<ArticleType>;

type CreateArticelOutputType = {}

type UpdateArticleInputType = {
  articleId: string;
} & Partial<ArticleType>;

type UpdateArticleOutputType = {}

export const ArticleSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getArticle: builder.query<GetArticleOutputType, { articleId: string }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'article', id: result.id }]
      ),
      query: ({ articleId }) => `fsm/article/${articleId}/`,
      transformResponse: (response: any): GetArticleOutputType => {
        return response;
      },
    }),

    getArticles: builder.query<GetArticlesOutputType, GetArticlesInputType>({
      providesTags: tagGenerationWithErrorCheck([{ type: 'Article', id: 'ALL' }]),
      query: ({ pageNumber = 1, isHidden }) => ({
        url: `fsm/article/`,
        params: {
          page: pageNumber,
          is_hidden: isHidden,
        },
      }),
      transformResponse: (response: any): GetArticlesOutputType => {
        return {
          count: response.count,
          articles: response.results,
        }
      },
    }),

    createArticle: builder.mutation<CreateArticelOutputType, CreateArticleInputType>({
      invalidatesTags: [{ type: 'Article', id: 'ALL' }],
      query: (body) => ({
        url: `/fsm/article/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): UpdateArticleOutputType => {
        return response;
      },
    }),

    updateArticle: builder.mutation<UpdateArticleOutputType, UpdateArticleInputType>({
      invalidatesTags: ['Article', { type: 'Article', id: 'ALL' }],
      query: ({ articleId, ...body }) => ({
        url: `/fsm/article/${articleId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateArticleOutputType => {
        return response;
      },
    }),

    softDeleteArticle: builder.mutation<any, { articleID: number }>({
      invalidatesTags: [{ type: 'Article', id: 'ALL' }],
      query: ({ articleID }) => `fsm/article/${articleID}/soft_delete/`
    }),

  })
});

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useSoftDeleteArticleMutation,
} = ArticleSlice;
