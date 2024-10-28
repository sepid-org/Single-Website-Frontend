import {
  useMentorMoveForwardMutation,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useFSMStateContext } from './useFSMStateContext';
import { useSubmitButtonMutation } from 'commons/redux/slices/cms/response/ButtonWidget';

const useChangeState = () => {
  const { isMentor } = useFSMStateContext();
  const [submitButton, submitButtonResult] = useSubmitButtonMutation();
  const [mentorMoveForward, mentorMoveForwardResult] = useMentorMoveForwardMutation();

  const changeState = ({ stateId, widgetId = null }) => {
    if (isMentor) {
      // todo:
      // mentorMoveForward({
      //   edgeId: edge.id,
      // });
    } else {
      submitButton({
        stateId,
        widgetId,
      });
    }
  };

  return {
    changeState,
    result: submitButtonResult,
  };
}

export default useChangeState;