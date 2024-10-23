import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type AnswerBaseType = {
  questionId: string;
  playerId?: string;
};

type LongAnswerType = AnswerBaseType & {
  text: string;
};

type ShortAnswerType = AnswerBaseType & {
  text: string;
};

type MultiChoiceAnswerType = AnswerBaseType & {
  selectedChoices: string[];
};

type UploadFileAnswerType = AnswerBaseType & {
  answerFile: File;
};

type ClearAnswerType = {
  questionId: string;
};

export const AnswerSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({

    submitShortAnswer: builder.mutation<void, ShortAnswerType>({
      invalidatesTags: tagGenerationWithErrorCheck(['player']),
      query: ({ questionId, text, playerId }) => ({
        url: '/response/answers/submit_answer/',
        method: 'POST',
        body: {
          question: questionId,
          text,
          player: playerId,
          answer_type: 'SmallAnswer',
        },
      }),
    }),

    submitLongAnswer: builder.mutation<void, LongAnswerType>({
      invalidatesTags: tagGenerationWithErrorCheck(['player']),
      query: ({ questionId, text, playerId }) => ({
        url: '/response/answers/submit_answer/',
        method: 'POST',
        body: {
          question: questionId,
          text,
          player: playerId,
          answer_type: 'BigAnswer',
        },
      }),
    }),

    submitMultiChoiceAnswer: builder.mutation<void, MultiChoiceAnswerType>({
      invalidatesTags: tagGenerationWithErrorCheck(['player']),
      query: ({ questionId, selectedChoices, playerId }) => ({
        url: '/response/answers/submit_answer/',
        method: 'POST',
        body: {
          question: questionId,
          choices: selectedChoices,
          player: playerId,
          answer_type: 'MultiChoiceAnswer',
        },
      }),
    }),

    submitUploadFileAnswer: builder.mutation<void, UploadFileAnswerType>({
      invalidatesTags: tagGenerationWithErrorCheck(['player']),
      query: ({ questionId, answerFile, playerId }) => ({
        url: '/response/answers/submit_answer/',
        method: 'POST',
        body: {
          question: questionId,
          answer_file: answerFile,
          player: playerId,
          answer_type: 'UploadFileAnswer',
        },
      }),
    }),

    clearQuestionAnswer: builder.mutation<void, ClearAnswerType>({
      query: ({ questionId }) => ({
        url: '/response/answers/clear_question_answer/',
        method: 'POST',
        body: {
          question: questionId,
        },
      }),
    }),

  }),
});

export const {
  useSubmitShortAnswerMutation,
  useSubmitLongAnswerMutation,
  useSubmitMultiChoiceAnswerMutation,
  useSubmitUploadFileAnswerMutation,
  useClearQuestionAnswerMutation,
} = AnswerSlice;