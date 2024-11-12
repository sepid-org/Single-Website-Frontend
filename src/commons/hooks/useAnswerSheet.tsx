import { useGetAnswerSheetByPlayerIdQuery, useGetAnswerSheetByIdQuery, useGetAnswerSheetsByFormIdQuery } from 'apps/website-display/redux/features/responses/answers/AnswerSheetSlice';
import { useFSMContext } from './useFSMContext';
import { useFormContext } from './useFormContext';

type PropsType = {
  answerSheetId?: string;
}

const useAnswerSheet = ({
  answerSheetId,
}: PropsType) => {
  const { player } = useFSMContext();
  const { formId } = useFormContext();
  const { data: answerSheetByAnswerSheetId } = useGetAnswerSheetByIdQuery({ answerSheetId }, { skip: Boolean(formId) || Boolean(player) || !Boolean(answerSheetId) });
  const { data: answerSheetsByFormId } = useGetAnswerSheetsByFormIdQuery({ formId }, { skip: Boolean(player) || Boolean(answerSheetId) || !Boolean(formId) });
  const { data: answerSheetByPlayerId } = useGetAnswerSheetByPlayerIdQuery({ playerId: player?.id }, { skip: Boolean(answerSheetId) || Boolean(formId) || !Boolean(player) });
  const answerSheet = answerSheetByAnswerSheetId || answerSheetByPlayerId;

  const getQuestionAnswers = (questionId: number) => {
    if (!questionId) return [];
    return answerSheet?.answers?.filter(answer => answer.problem === questionId);
  }

  return {
    answerSheet,
    getQuestionAnswers,
  };
};

export default useAnswerSheet;
