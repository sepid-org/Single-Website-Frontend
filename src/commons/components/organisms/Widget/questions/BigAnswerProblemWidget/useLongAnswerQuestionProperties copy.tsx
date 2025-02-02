import { useEffect, useMemo, useRef, useState } from 'react';
import { WidgetModes } from 'commons/components/organisms/Widget';
import useAnswerSheet from 'commons/hooks/useAnswerSheet';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import { toast } from 'react-toastify';

type PropsType = {
  useSubmitAnswerMutation: any;
  onAnswerChange: any;
  questionId: number;
  mode: WidgetModes;
}

const useLongAnswerQuestionProperties = ({
  useSubmitAnswerMutation,
  onAnswerChange,
  questionId,
  mode,
}: PropsType) => {
  const { player } = useFSMContext();
  const [_submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const [answer, _setAnswer] = useState<string>(null);
  const { getQuestionAnswers, isLoading: isAnswerSheetLoading } = useAnswerSheet();

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

  const changeAnswer = (val: string) => {
    if (mode === WidgetModes.InForm) {
      onAnswerChange({ text: val });
    };
    _setAnswer(val);
  }

  const submitAnswer = (e) => {
    if (!answer) {
      toast.info('چیزی بنویس!');
      return;
    }
    _submitAnswer({ questionId, text: answer, playerId: player.id })
  }

  const isQuestionLoading = submitAnswerResult.isLoading || isAnswerSheetLoading;

  const errorMessage = '';

  return {
    answer,
    changeAnswer,
    submitAnswer,
    isQuestionLoading,
    errorMessage,
  };
};

export default useLongAnswerQuestionProperties;