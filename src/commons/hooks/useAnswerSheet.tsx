import { useGetAnswerSheetByPlayerIdQuery, useGetAnswerSheetQuery } from 'apps/website-display/redux/features/responses/answers/AnswerSheetSlice';
import { useFSMStateContext } from './useFSMStateContext';

type PropsType = {
  answerSheetId?: string;
}

const useAnswerSheet = ({
  answerSheetId,
}: PropsType) => {
  const { playerId } = useFSMStateContext();
  const { data: answerSheetByAnswerSheetId } = useGetAnswerSheetQuery({ answerSheetId }, { skip: Boolean(playerId) || !Boolean(answerSheetId) });
  const { data: answerSheetByPlayerId } = useGetAnswerSheetByPlayerIdQuery({ playerId }, { skip: !Boolean(playerId) });
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
