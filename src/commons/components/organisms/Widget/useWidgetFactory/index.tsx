import { useDispatch } from 'react-redux';
import WIDGET_TYPE_MAPPER from './WidgetTypeMapper';
import { useCreateWidgetMutation, useDeleteWidgetMutation, useUpdateWidgetMutation } from 'apps/website-display/redux/features/widget/WidgetSlice';
import { runConfetti } from 'commons/components/molecules/confetti'
import { toast } from 'react-toastify';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';

type WidgetFactoryType = {
  widgetId?: string;
  paperId?: string;
  widgetType?: string;
  collectAnswer?: any;
}

const useWidgetFactory = ({
  widgetId,
  paperId,
  widgetType,
  collectAnswer,
}: WidgetFactoryType) => {
  const dispatcher = useDispatch();
  const { playerId } = useFSMStateContext();
  const [deleteWidget] = useDeleteWidgetMutation();
  const [createWidget] = useCreateWidgetMutation();
  const [updateWidget] = useUpdateWidgetMutation();

  let onDelete, onMutate, onAnswerChange, onQuery, onAnswerSubmit;

  if (!widgetType) {
    return null;
  }

  const {
    WidgetComponent,
    EditWidgetDialog,
    submitAnswerAction,
  } = WIDGET_TYPE_MAPPER[widgetType];

  onMutate =
    widgetId ?
      (props) => {
        updateWidget({ widgetId, widgetType, paperId, playerId, ...props });
      } :
      (props) => {
        createWidget({ widgetType, paperId, playerId, ...props });
      }

  onAnswerChange = collectAnswer ? collectAnswer : () => { };

  // todo refactor: this peace of code should be extracted as a separate method
  onAnswerSubmit = (props) =>
    dispatcher(
      submitAnswerAction({
        ...props,
        player: playerId,
      }))
      .then((response) => {
        const CORRECTNESS_THRESHOLD = 50;
        if (response.error) return;
        if (response.payload?.response?.score >= 0) {
          if (response.payload.response.score > CORRECTNESS_THRESHOLD) {
            runConfetti();
            toast.success('آفرین! پاسخ شما درست بود.')
          } else {
            toast.error(response.payload.response.feedback)
          }
        } else {
          toast.success('پاسخ شما با موفقیت ثبت شد.');
        }
      });

  onDelete = (props) => deleteWidget(props);

  return {
    onDelete,
    onMutate,
    onAnswerChange,
    onQuery,
    onAnswerSubmit,
    WidgetComponent,
    EditWidgetDialog,
  };
}

export default useWidgetFactory;