import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import { ArticleType } from 'commons/types/redux/article';

type GetArticleOutputType = ArticleType;

type GetArticlesInputType = {
  pageNumber: number;
}

type GetArticlesOutputType = {
  count: number;
  articles: ArticleType[];
}

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
      providesTags: tagGenerationWithErrorCheck(['articles']),
      query: ({ pageNumber }) => `fsm/article/?page=${pageNumber}`,
      transformResponse: (response: any): GetArticlesOutputType => {
        return {
          count: response.count,
          articles: response.results,
        }
      },
    })
  })
});

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
} = ArticleSlice;
