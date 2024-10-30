import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import {
  useCreateWidgetMutation,
  useDeleteWidgetMutation,
  useUpdateWidgetMutation,
} from 'apps/website-display/redux/features/widget/WidgetSlice';

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
  const [deleteWidget] = useDeleteWidgetMutation();
  const [createWidget] = useCreateWidgetMutation();
  const [updateWidget] = useUpdateWidgetMutation();
  const { widgetRegistry } = useFSMStateContext();

  let onDelete, onMutate, onAnswerChange;

  const widgetToolkit = widgetRegistry[widgetType];
  const WidgetComponent = widgetToolkit?.WidgetComponent;
  const EditWidgetDialog = widgetToolkit?.EditWidgetDialog;
  const useSubmitAnswerMutation = widgetToolkit?.useSubmitAnswerMutation;

  onMutate =
    widgetId ?
      (props) => {
        updateWidget({ widgetId, widgetType, paperId, ...props });
      } :
      (props) => {
        createWidget({ widgetType, paperId, ...props });
      }

  onAnswerChange = collectAnswer ? collectAnswer : () => { };

  onDelete = (props) => deleteWidget(props);

  return {
    onDelete,
    onMutate,
    onAnswerChange,
    useSubmitAnswerMutation,
    WidgetComponent,
    EditWidgetDialog,
  };
}

export default useWidgetFactory;