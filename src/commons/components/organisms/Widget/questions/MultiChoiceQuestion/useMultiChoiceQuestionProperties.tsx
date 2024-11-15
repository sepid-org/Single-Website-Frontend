import { useEffect, useMemo, useState } from 'react';
import { WidgetModes } from 'commons/components/organisms/Widget';
import MultiChoiceQuestionEditWidget from './edit';
import { ChoiceType } from 'commons/types/widgets';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import useAnswerSheet from 'commons/hooks/useAnswerSheet';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { useFSMContext } from 'commons/hooks/useFSMContext';
export { MultiChoiceQuestionEditWidget };

// Add this utility function at the top of the file or in a separate utils file
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
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [_submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const { player } = useFSMContext();
  const { getQuestionAnswers } = useAnswerSheet({})
  const questionAnswers = getQuestionAnswers(questionId);
  const wholeSelectedChoices = questionAnswers?.flatMap(answer => answer.choices);

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

  const _handleSetSelectedChoices = (newSelectedChoices) => {
    onAnswerChange({ choices: newSelectedChoices });
    setSelectedChoices(newSelectedChoices);
  }

  const onChoiceSelect = (choice) => {
    if (mode === WidgetModes.Edit || mode === WidgetModes.Disable) {
      return;
    }
    if (maxSelections === 1) {
      _handleSetSelectedChoices([choice])
      if (mode === WidgetModes.View) {
        submitAnswer([choice]);
      }
    } else {
      const choiceIndex = selectedChoices.findIndex(selectedChoice => selectedChoice.id === choice.id);
      if (choiceIndex === -1) {
        _handleSetSelectedChoices([
          ...selectedChoices,
          choice,
        ]);
      } else {
        const selectedChoicesCopy = [...selectedChoices]
        selectedChoicesCopy.splice(choiceIndex, 1);
        _handleSetSelectedChoices(selectedChoicesCopy);
      }
    }
  }

  const submitAnswer = (selectedChoices) => {
    if (mode === WidgetModes.View) {
      _submitAnswer({
        questionId,
        playerId: player.id,
        selectedChoices: selectedChoices.map(selectedChoice => selectedChoice.id),
      });
    }
  }

  let errorMessage = '';
  if (selectedChoices?.length < minSelections) {
    errorMessage = `باید حداقل ${toPersianNumber(minSelections)} گزینه را انتخاب کنید.`;
  }
  if (selectedChoices?.length > maxSelections) {
    errorMessage = `حداکثر ${toPersianNumber(maxSelections)} گزینه را می‌توانید انتخاب کنید.`;
  }
  if (disableAfterAnswer && questionAnswers?.some(questionAnswer => haveSameElements(selectedChoices.map(choice => choice.id), questionAnswer.choices))) {
    errorMessage = 'شما این پاسخ را قبل‌تر ثبت کرده‌اید';
  }

  /*useEffect(() => {
    if (wholeSelectedChoices && wholeSelectedChoices.length > 0) {
      console.log(wholeSelectedChoices);
      setSelectedChoices([wholeSelectedChoices[wholeSelectedChoices.length - 1]])
    }
  }, [questionAnswers]);*/

  return {
    selectedChoices,
    displayChoices,
    errorMessage,

    onChoiceSelect,
    submitAnswer,
    submitAnswerResult,
  };
};

export default useMultiChoiceQuestionProperties;