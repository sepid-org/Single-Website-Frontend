import { useGetAnswerSheetByPlayerIdQuery, useGetAnswerSheetQuery } from 'apps/website-display/redux/features/responses/answers/AnswerSheetSlice';
import { useFSMStateContext } from './useFSMStateContext';

type PropsType = {
  answerSheetId?: string;
}

const useAnswerSheet = ({
  answerSheetId,
}: PropsType) => {
  const { player } = useFSMStateContext();
  const { data: answerSheetByAnswerSheetId } = useGetAnswerSheetQuery({ answerSheetId }, { skip: Boolean(player) || !Boolean(answerSheetId) });
  const { data: answerSheetByPlayerId } = useGetAnswerSheetByPlayerIdQuery({ playerId: player?.id }, { skip: !Boolean(player) });
  const answerSheet = answerSheetByAnswerSheetId || answerSheetByPlayerId;

  const getQuestionAnswers = (questionId: number) => {
    return answerSheet?.answers?.filter(answer => answer.problem === questionId);
  }

  return {
    answerSheet,
    getQuestionAnswers,
  };
};

export default useAnswerSheet;
