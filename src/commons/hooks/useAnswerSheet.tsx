import { useGetAnswerSheetByPlayerIdQuery, useGetAnswerSheetQuery } from 'apps/website-display/redux/features/responses/answers/AnswerSheetSlice';
import { useFSMContext } from './useFSMContext';

type PropsType = {
  answerSheetId?: string;
}

const useAnswerSheet = ({
  answerSheetId,
}: PropsType) => {
  const { player } = useFSMContext();
  const { data: answerSheetByAnswerSheetId } = useGetAnswerSheetQuery({ answerSheetId }, { skip: Boolean(player) || !Boolean(answerSheetId) });
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
