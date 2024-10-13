import { QuestionType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApiSlice';

export const QuestionsSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all questions
    getQuestions: builder.query<QuestionType[], void>({
      providesTags: ['questions'],
      query: () => '/game-logic/questions/',
    }),

    // Fetch a single question by id
    getQuestionById: builder.query<QuestionType, number>({
      providesTags: (result, error, item) => [
        { type: 'question', id: item }
      ],
      query: (id) => `/game-logic/questions/${id}/`,
    }),

    // Create a new question
    createQuestion: builder.mutation<QuestionType, Omit<QuestionType, 'id'>>({
      invalidatesTags: (result, error, item) => [
        'questions',
        { type: 'question', id: result.id }
      ],
      query: (newQuestion) => ({
        url: '/game-logic/questions/',
        method: 'POST',
        body: newQuestion,
      }),
    }),

    // Update an existing question
    updateQuestion: builder.mutation<QuestionType, { id: number; updatedQuestion: Omit<QuestionType, 'id'> }>({
      invalidatesTags: (result, error, item) => [
        'questions',
        { type: 'question', id: item.id }
      ],
      query: ({ id, updatedQuestion }) => ({
        url: `/game-logic/questions/${id}/`,
        method: 'PUT',
        body: updatedQuestion,
      }),
    }),

    // Delete a question
    deleteQuestion: builder.mutation<void, number>({
      invalidatesTags: ['questions'],
      query: (id) => ({
        url: `/game-logic/questions/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = QuestionsSlice;
