import { useEffect, useState, useRef } from "react";
import { PaperSlice } from "apps/website-display/redux/features/paper/PaperSlice";
import useAnswerSheet from "commons/hooks/useAnswerSheet";
import { useFSMStateContext } from "commons/hooks/useFSMStateContext";
import { WidgetType } from "commons/types/widgets/widget";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useFSMState from "apps/fsm/hooks/useFSMState";

const AshbariaQuestionToast = ({ }) => {
  const { fsmStateId } = useFSMStateContext();
  const { fsmState } = useFSMState(parseInt(fsmStateId));
  const [allMultiChoiceQuestions, setAllMultiChoiceQuestions] = useState<WidgetType[]>([]);
  const dispatch = useDispatch();
  const hasToastBeenShown = useRef(false);

  useEffect(() => {
    const fetchAllMultiChoiceQuestions = async () => {
      if (fsmState?.papers) {
        const multiChoiceQuestions = [];
        // Loop over each paper ID and fetch data
        for (const paperId of fsmState.papers) {
          const result = await dispatch(
            (PaperSlice.endpoints.getPaper as any).initiate({ paperId })
          );
          if (result.data) {
            const multiChoiceWidgets = result.data.widgets.filter(
              widget => widget.widget_type === "MultiChoiceProblem"
            );
            multiChoiceQuestions.push(...multiChoiceWidgets);
          }
        }
        setAllMultiChoiceQuestions(multiChoiceQuestions);
      }
    };
    fetchAllMultiChoiceQuestions();
  }, [fsmState, dispatch]);

  const multiChoiceQuestion = allMultiChoiceQuestions?.[0];
  const { getQuestionAnswers } = useAnswerSheet();
  const questionAnswers = getQuestionAnswers(parseInt(multiChoiceQuestion?.id));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (questionAnswers?.length > 0 && !hasToastBeenShown.current) {
        toast.info('دادبستان عزیز! دادگاه ادامه داره. لطفاً ادله‌ی بیشتری بیار...', {
          autoClose: 5000,
        });
        hasToastBeenShown.current = true;
      }
    }, 500);

    // Clear the timer if the component unmounts before the delay is completed
    return () => clearTimeout(timer);
  }, [questionAnswers]);

  return null;
};

export default AshbariaQuestionToast;