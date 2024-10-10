import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  useGoForwardMutation,
  useMentorMoveForwardMutation,
} from 'apps/website-display/redux/features/program/PlayerSlice';
import { useFSMContext } from './useFSMContext';

const useChangeState = () => {
  const t = useTranslate();
  const { isMentor } = useFSMContext();
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