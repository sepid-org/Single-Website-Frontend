import { useState } from 'react';

import { WidgetModes } from 'commons/components/organisms/Widget';
import useAnswerSheet from 'commons/hooks/useAnswerSheet';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type PropsType = {
  questionId: number;
  useSubmitAnswerMutation: any;
  onAnswerChange: any;
  mode: WidgetModes;
}

const useSmallAnswerQuestionProperties = ({
  useSubmitAnswerMutation,
  onAnswerChange,
  questionId,
  mode,
}: PropsType) => {
  const [answer, setAnswer] = useState<string>('');
  const [submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const { player } = useFSMContext();
  const { getQuestionAnswers } = useAnswerSheet({})
  const questionAnswers = getQuestionAnswers(questionId);

  const submitAnswerWrapper = () => {
    if (!answer) {
      return;
    }
    if (mode === WidgetModes.View) {
      submitAnswer({
        playerId: player.id,
        questionId,
        text: answer,
      });
    }
  }

  const onAnswerChangeWrapper = (e) => {
    if (mode === WidgetModes.InForm) {
      onAnswerChange({ text: e.target.value });
    }
    setAnswer(e.target.value);
  }

  let errorMessage = '';

  return {
    answer,
    errorMessage,
    submitAnswer: submitAnswerWrapper,
    submitAnswerResult,
    onAnswerChange: onAnswerChangeWrapper,
  };
};

export default useSmallAnswerQuestionProperties;
