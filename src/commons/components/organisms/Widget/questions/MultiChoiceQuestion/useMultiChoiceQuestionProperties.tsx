import { useEffect, useMemo, useState } from 'react';
import { WidgetModes } from 'commons/components/organisms/Widget';
import MultiChoiceQuestionEditWidget from './edit';
import { ChoiceType } from 'commons/types/widgets';
import useAnswerSheet from 'commons/hooks/useAnswerSheet';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { useFSMContext } from 'commons/hooks/useFSMContext';
export { MultiChoiceQuestionEditWidget };

const seededRandom = (seed: string) => {
  // Create a simple hash from the seed string
  let hash = Array.from(seed).reduce((acc, char) => {
    const code = char.charCodeAt(0);
    return ((acc << 5) - acc) + code | 0;
  }, 0);

  // Return a function that generates consistent random numbers for this seed
  return () => {
    hash = (hash * 16807) % 2147483647;
    return (hash - 1) / 2147483646;
  };
};

const haveSameElements = (list1, list2) =>
  list1.length === list2.length && [...list1].sort().every((item, index) => item === [...list2].sort()[index]);

type PropsType = {
  questionId: string;
  useSubmitAnswerMutation: any;
  onAnswerChange: any;
  id: number;
  choices: ChoiceType[];
  mode: WidgetModes;
  minSelections: number;
  maxSelections: number;
  randomizeChoices: boolean;
  disableAfterAnswer: boolean;
}

const useMultiChoiceQuestionProperties = ({
  useSubmitAnswerMutation,
  onAnswerChange,
  id: questionId,
  choices: questionChoices,
  mode,
  minSelections,
  maxSelections,
  randomizeChoices,
  disableAfterAnswer,
}: PropsType) => {
  const [selectedChoiceIds, _setSelectedChoiceIds] = useState<number[]>([]);
  const [submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const { player } = useFSMContext();
  const { getQuestionAnswers } = useAnswerSheet();
  const allQuestionAnswers = getQuestionAnswers(questionId);
  const wholeSelectedChoices = allQuestionAnswers?.flatMap(answer => answer.choices);

  useEffect(() => {
    const latestAnswer = allQuestionAnswers?.find(answer => answer.is_final_answer)
    if (latestAnswer) {
      handleSetSelectedChoices(latestAnswer.choices);
    }
  }, [allQuestionAnswers]);

  const randomizedChoices: ChoiceType[] = useMemo(() => {
    if (randomizeChoices && mode === WidgetModes.View && player?.id) {
      const seed = `${player.id}-${questionId}`;
      const random = seededRandom(seed);

      return [...questionChoices]
        .map(choice => ({ choice, sort: random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ choice }) => choice);
    }
    return questionChoices;
  }, [questionChoices, randomizeChoices, mode, player, questionId]);

  const displayChoices = randomizedChoices?.map(choice => ({
    ...choice,
    disabled: disableAfterAnswer && maxSelections === 1 && wholeSelectedChoices?.includes(choice.id)
  }))

  const handleSetSelectedChoices = (newSelectedChoices: number[]) => {
    onAnswerChange({ choices: newSelectedChoices });
    _setSelectedChoiceIds(newSelectedChoices);
  }

  const onChoiceSelect = (choice: ChoiceType) => {
    const selectedChoiceId = choice.id;
    if (mode === WidgetModes.Edit || mode === WidgetModes.Disable) {
      return;
    }
    if (maxSelections === 1) {
      handleSetSelectedChoices([selectedChoiceId])
      if (mode === WidgetModes.View) {
        submitAnswerWrapper([selectedChoiceId]);
      }
    } else {
      const selectedChoiceIndex = selectedChoiceIds.findIndex(choiceId => choiceId === selectedChoiceId);
      if (selectedChoiceIndex === -1) {
        handleSetSelectedChoices([
          ...selectedChoiceIds,
          selectedChoiceId,
        ]);
      } else {
        const selectedChoiceIdsCopy = [...selectedChoiceIds]
        selectedChoiceIdsCopy.splice(selectedChoiceIndex, 1);
        handleSetSelectedChoices(selectedChoiceIdsCopy);
      }
    }
  }

  const submitAnswerWrapper = (selectedChoiceIds: number[]) => {
    if (mode === WidgetModes.View) {
      submitAnswer({
        questionId,
        playerId: player.id,
        selectedChoices: selectedChoiceIds,
      });
    }
  }

  let errorMessage = '';
  if (selectedChoiceIds?.length < minSelections) {
    errorMessage = `باید حداقل ${toPersianNumber(minSelections)} گزینه را انتخاب کنید.`;
  }
  if (selectedChoiceIds?.length > maxSelections) {
    errorMessage = `حداکثر ${toPersianNumber(maxSelections)} گزینه را می‌توانید انتخاب کنید.`;
  }
  if (disableAfterAnswer && allQuestionAnswers?.some(questionAnswer => haveSameElements(selectedChoiceIds, questionAnswer.choices))) {
    errorMessage = 'شما این پاسخ را قبل‌تر ثبت کرده‌اید';
  }

  return {
    selectedChoiceIds,
    displayChoices,
    errorMessage,

    onChoiceSelect,
    submitAnswer: submitAnswerWrapper,
    submitAnswerResult,
  };
};

export default useMultiChoiceQuestionProperties;