import { useGetAnswerSheetByPlayerIdQuery } from 'apps/website-display/redux/features/responses/answers/AnswerSheetSlice';
import { useFSMContext } from './useFSMContext';
import { useAnswerSheetContext } from './useAnswerSheetContext';

const useAnswerSheet = () => {
  const { answerSheet: answerSheetByAnswerSheetId } = useAnswerSheetContext();
  const { player } = useFSMContext();
  const { data: answerSheetByPlayerId, isLoading: isGetAnswerSheetByPlayerIdLoading } = useGetAnswerSheetByPlayerIdQuery({ playerId: player?.id }, { skip: !Boolean(player) });
  const answerSheet = answerSheetByAnswerSheetId || answerSheetByPlayerId;

  const getQuestionAnswers = (questionId: number) => {
    if (!questionId) return [];
    return answerSheet?.answers?.filter(answer => answer.problem === questionId);
  }

  // const isLoading = isGetAnswerSheetByPlayerIdLoading || !answerSheet;
  const isLoading = isGetAnswerSheetByPlayerIdLoading;

  return {
    isLoading,
    answerSheet,
    getQuestionAnswers,
  };
};

export default useAnswerSheet;
