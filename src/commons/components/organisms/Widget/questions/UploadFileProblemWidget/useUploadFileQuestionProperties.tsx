import { useEffect, useMemo, useRef, useState } from 'react';
import { WidgetModes } from 'commons/components/organisms/Widget';
import useAnswerSheet from 'commons/hooks/useAnswerSheet';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useClearQuestionAnswerMutation } from 'commons/redux/apis/cms/response/Answer';

type PropsType = {
  useSubmitAnswerMutation: any;
  onAnswerChange: any;
  questionId: number;
  mode: WidgetModes;
}

const useMultiChoiceQuestionProperties = ({
  useSubmitAnswerMutation,
  onAnswerChange,
  questionId,
  mode,
}: PropsType) => {
  const { player } = useFSMContext();
  const [clearQuestionAnswer, clearQuestionAnswerResult] = useClearQuestionAnswerMutation()
  const [submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const [uploadedFileLink, _setUploadedFileLink] = useState<string>(null);
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
        _setUploadedFileLink(latestAnswer.answer_file);
        hasInitialized.current = true;
      }
    }
  }, [allQuestionAnswers, _setUploadedFileLink]);

  const clearFile = (e) => {
    e.preventDefault();
    clearQuestionAnswer({ questionId });
  }

  useEffect(() => {
    if (clearQuestionAnswerResult.isSuccess) {
      _setUploadedFileLink('');
      onAnswerChange({ answer_file: '' });
    }
  }, [clearQuestionAnswerResult.isSuccess])

  const setUploadedFileLink = (link) => {
    _setUploadedFileLink(link);
    onAnswerChange({ answer_file: link });
    if (mode === WidgetModes.View) {
      submitAnswer({
        playerId: player.id,
        questionId,
        answerFile: link,
      })
    }
  }

  const isQuestionLoading = submitAnswerResult.isLoading || isAnswerSheetLoading;

  const errorMessage = '';

  return {
    uploadedFileLink,
    setUploadedFileLink,
    clearFile,
    errorMessage,
    isQuestionLoading,
  };
};

export default useMultiChoiceQuestionProperties;