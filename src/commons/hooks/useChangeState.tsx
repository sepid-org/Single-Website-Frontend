import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  useGoForwardMutation,
  useMentorMoveForwardMutation,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useFSMStateContext } from './useFSMStateContext';

const useChangeState = () => {
  const t = useTranslate();
  const { isMentor } = useFSMStateContext();
  const [goForward, { isLoading: isGoForwardLoading }] = useGoForwardMutation();
  const [mentorMoveForward, { isLoading: isMentorMoveForwardLoading }] = useMentorMoveForwardMutation();

  const changeState = (edge) => {
    if (isMentor) {
      mentorMoveForward({
        edgeId: edge.id,
      });
    } else {
      goForward({
        edgeId: edge.id,
      });
    }
  };

  return {
    changeState,
  };
}

export default useChangeState;