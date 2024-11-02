import { useMemo, useState } from 'react';

import { WidgetModes } from 'commons/components/organisms/Widget';
import MultiChoiceQuestionEditWidget from './edit';
import { ChoiceType, DisplayChoiceType } from 'commons/types/widgets';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
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

type PropsType = {
  questionId: string;
  useSubmitAnswerMutation: any;
  onAnswerChange: any;
  id: number;
  choices: ChoiceType[];
  mode: WidgetModes;
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
  maxSelections,
  randomizeChoices,
}: PropsType) => {
  const [selectedChoices, _setSelectedChoices] = useState<ChoiceType[]>([]);
  const [_submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const { playerId } = useFSMStateContext();

  // Create deterministic random ordering based on playerId and questionId
  const displayChoices: ChoiceType[] = useMemo(() => {
    if (randomizeChoices && mode === WidgetModes.View && playerId) {
      const seed = `${playerId}-${questionId}`;
      const random = seededRandom(seed);

      return [...questionChoices]
        .map(choice => ({ choice, sort: random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ choice }) => choice);
    }
    return questionChoices;
  }, [questionChoices, randomizeChoices, mode, playerId, questionId]);

  const _handleSetSelectedChoices = (newSelectedChoices) => {
    onAnswerChange({ choices: newSelectedChoices });
    _setSelectedChoices(newSelectedChoices);
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
      const choiceIndex = selectedChoices.indexOf(choice);
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
      _submitAnswer({ questionId, selectedChoices, playerId });
    }
  }

  return {
    selectedChoices,
    displayChoices,

    onChoiceSelect,
    submitAnswer,
    submitAnswerResult,
  };
};

export default useMultiChoiceQuestionProperties;
