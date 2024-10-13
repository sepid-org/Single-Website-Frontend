import { QuestionType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApiSlice';

export const QuestionsSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all questions
    getQuestions: builder.query<QuestionType[], void>({
      query: () => '/game-logic/questions/',
    }),

    // Fetch a single question by id
    getQuestionById: builder.query<QuestionType, number>({
      query: (id) => `/game-logic/questions/${id}/`,
    }),

    // Create a new question
    createQuestion: builder.mutation<QuestionType, Omit<QuestionType, 'id'>>({
      query: (newQuestion) => ({
        url: '/game-logic/questions/',
        method: 'POST',
        body: newQuestion,
      }),
    }),

    // Update an existing question
    updateQuestion: builder.mutation<QuestionType, { id: number; updatedQuestion: Omit<QuestionType, 'id'> }>({
      query: ({ id, updatedQuestion }) => ({
        url: `/game-logic/questions/${id}/`,
        method: 'PUT',
        body: updatedQuestion,
      }),
    }),

    // Delete a question
    deleteQuestion: builder.mutation<void, number>({
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
