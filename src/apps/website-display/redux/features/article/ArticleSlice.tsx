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

type UpdateArticelOutputType = {}

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
      transformResponse: (response: any): UpdateArticelOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
  useCreateArticleMutation,
} = ArticleSlice;
