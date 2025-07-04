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

type CreateArticleInputType = Partial<ArticleType>;

type CreateArticleOutputType = {}

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
      query: ({ articleId }) => ({
        url: `fsm/article/${articleId}/`,
        isSimpleRequest: true,
      }),
    }),

    getArticles: builder.query<GetArticlesOutputType, GetArticlesInputType>({
      providesTags: tagGenerationWithErrorCheck([{ type: 'Article', id: 'ALL' }]),
      query: ({ pageNumber = 1, isHidden }) => ({
        url: `fsm/article/`,
        params: {
          page: pageNumber,
          is_hidden: isHidden,
        },
        isSimpleRequest: true,
      }),
      transformResponse: (response: any): GetArticlesOutputType => {
        return {
          count: response.count,
          articles: response.results,
        }
      },
    }),

    createArticle: builder.mutation<CreateArticleOutputType, CreateArticleInputType>({
      invalidatesTags: [{ type: 'Article', id: 'ALL' }],
      query: (body) => ({
        url: `/fsm/article/`,
        method: 'POST',
        body,
      }),
    }),

    updateArticle: builder.mutation<UpdateArticleOutputType, UpdateArticleInputType>({
      invalidatesTags: ['Article', { type: 'Article', id: 'ALL' }],
      query: ({ articleId, ...body }) => ({
        url: `/fsm/article/${articleId}/`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteArticle: builder.mutation<any, { articleId: string }>({
      invalidatesTags: [{ type: 'Article', id: 'ALL' }],
      query: ({ articleId }) => ({
        url: `/fsm/article/${articleId}/`,
        method: 'DELETE',
      }),
    }),

  })
});

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = ArticleSlice;
