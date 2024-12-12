import { useGetAnswerSheetByPlayerIdQuery } from 'apps/website-display/redux/features/responses/answers/AnswerSheetSlice';
import { useFSMContext } from './useFSMContext';
import { useAnswerSheetContext } from './useAnswerSheetContext';

const useAnswerSheet = () => {
  const { player } = useFSMContext();
  const { answerSheet: answerSheetByAnswerSheetId } = useAnswerSheetContext();
  const { data: answerSheetByPlayerId } = useGetAnswerSheetByPlayerIdQuery({ playerId: player?.id }, { skip: !Boolean(player) });
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
