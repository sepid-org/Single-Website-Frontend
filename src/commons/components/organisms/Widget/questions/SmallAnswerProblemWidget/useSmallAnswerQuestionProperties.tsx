import { useEffect, useMemo, useRef, useState } from 'react';
import { WidgetModes } from 'commons/components/organisms/Widget';
import useAnswerSheet from 'commons/hooks/useAnswerSheet';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type PropsType = {
  useSubmitAnswerMutation: any;
  onAnswerChange: any;
  questionId: number;
  mode: WidgetModes;
}

const useSmallAnswerQuestionProperties = ({
  useSubmitAnswerMutation,
  onAnswerChange,
  questionId,
  mode,
}: PropsType) => {
  const { player } = useFSMContext();
  const [_submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const [answer, _setAnswer] = useState<string>(null);
  const { getQuestionAnswers, isLoading: isAnswerSheetLoading } = useAnswerSheet();
  const [hasAnswered, setHasAnswered] = useState(false);
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);

  const allQuestionAnswers = useMemo(
    () => getQuestionAnswers(questionId),
    [getQuestionAnswers]
  );

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current) {
      const latestAnswer = allQuestionAnswers?.find(answer => answer.is_final_answer);
      if (latestAnswer) {
        _setAnswer(latestAnswer.text);
        hasInitialized.current = true;
      }
    }
  }, [allQuestionAnswers, _setAnswer]);

  const changeText = (e) => {
    if (mode === WidgetModes.InForm) {
      onAnswerChange({ text: e.target.value });
    }
    _setAnswer(e.target.value);
  }

  const submitAnswer = () => {
    if (!answer) {
      return;
    }
    _submitAnswer({
      playerId: player.id,
      questionId,
      text: answer,
    });
  }


















  const isQuestionLoading = submitAnswerResult.isLoading || isAnswerSheetLoading;

  const errorMessage = '';

  return {
    answer,
    hasAnsweredCorrectly,
    hasAnswered,
    changeText,
    submitAnswer,
    isQuestionLoading,
    errorMessage,
  };
};

export default useSmallAnswerQuestionProperties;