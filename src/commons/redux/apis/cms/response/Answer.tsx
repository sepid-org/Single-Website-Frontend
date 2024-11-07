import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { createInvalidationCallback } from 'commons/redux/utilities/createInvalidationCallback';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

// Answer Types
type AnswerType = 'SmallAnswer' | 'BigAnswer' | 'MultiChoiceAnswer' | 'UploadFileAnswer';

interface BaseAnswer {
  questionId: string;
  playerId?: string;
  answerType: AnswerType;
}

interface SmallAnswer extends BaseAnswer {
  answerType: 'SmallAnswer';
  text: string;
}

interface BigAnswer extends BaseAnswer {
  answerType: 'BigAnswer';
  text: string;
}

interface MultiChoiceAnswer extends BaseAnswer {
  answerType: 'MultiChoiceAnswer';
  selectedChoices: string[];
}

interface FileAnswer extends BaseAnswer {
  answerType: 'UploadFileAnswer';
  answerFile: File;
}

type Answer = SmallAnswer | BigAnswer | MultiChoiceAnswer | FileAnswer;

// Helper Functions
const DEFAULT_INVALIDATION_TAGS = [
  { type: 'Balances' as const, id: 'MY' },
];

const createAnswerBody = (answer: Answer) => {
  const base = {
    question: answer.questionId,
    player_id: answer.playerId,
    answer_type: answer.answerType,
  };

  switch (answer.answerType) {
    case 'SmallAnswer':
    case 'BigAnswer':
      return { ...base, text: answer.text };
    case 'MultiChoiceAnswer':
      return { ...base, choices: answer.selectedChoices };
    case 'UploadFileAnswer':
      return { ...base, answer_file: answer.answerFile };
  }
};

// API Slice
export const AnswerSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    submitAnswer: builder.mutation<void, Answer>({
      invalidatesTags: tagGenerationWithErrorCheck(['player']),
      onQueryStarted: createInvalidationCallback(DEFAULT_INVALIDATION_TAGS),
      query: (answer) => ({
        url: '/response/answers/submit-answer/',
        method: 'POST',
        body: createAnswerBody(answer),
      }),
    }),

    clearQuestionAnswer: builder.mutation<void, { questionId: string }>({
      query: ({ questionId }) => ({
        url: '/response/answers/clear_question_answer/',
        method: 'POST',
        body: { question: questionId },
      }),
    }),
  }),
});

// Custom hooks with type safety
export const useSubmitShortAnswerMutation = () => {
  const [submitAnswer, submitAnswerResult] = AnswerSlice.useSubmitAnswerMutation();
  return [
    (answer: Omit<SmallAnswer, 'answerType'>) =>
      submitAnswer({ ...answer, answerType: 'SmallAnswer' }),
    submitAnswerResult
  ] as const;
};

export const useSubmitLongAnswerMutation = () => {
  const [submitAnswer, submitAnswerResult] = AnswerSlice.useSubmitAnswerMutation();
  return [
    (answer: Omit<BigAnswer, 'answerType'>) =>
      submitAnswer({ ...answer, answerType: 'BigAnswer' }),
    submitAnswerResult
  ] as const;
};

export const useSubmitMultiChoiceAnswerMutation = () => {
  const [submitAnswer, submitAnswerResult] = AnswerSlice.useSubmitAnswerMutation();
  return [
    (answer: Omit<MultiChoiceAnswer, 'answerType'>) =>
      submitAnswer({ ...answer, answerType: 'MultiChoiceAnswer' }),
    submitAnswerResult
  ] as const;
};

export const useSubmitUploadFileAnswerMutation = () => {
  const [submitAnswer, submitAnswerResult] = AnswerSlice.useSubmitAnswerMutation();
  return [
    (answer: Omit<FileAnswer, 'answerType'>) =>
      submitAnswer({ ...answer, answerType: 'UploadFileAnswer' }),
    submitAnswerResult
  ] as const;
};

export const {
  useClearQuestionAnswerMutation,
} = AnswerSlice;