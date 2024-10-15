import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  useGoForwardMutation,
  useMentorMoveForwardMutation,
  useTransitToStateMutation,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useFSMStateContext } from './useFSMStateContext';
import { EdgeType } from 'commons/types/models';

const useChangeState = () => {
  const t = useTranslate();
  const { isMentor } = useFSMStateContext();
  const [goForward, { isLoading: isGoForwardLoading }] = useGoForwardMutation();
  const [mentorMoveForward, { isLoading: isMentorMoveForwardLoading }] = useMentorMoveForwardMutation();
  const [transitToState, result] = useTransitToStateMutation();

  const changePlayerState = (stateId: string) => {
    transitToState({
      stateId,
    })
  }

  const changeState = (edge: EdgeType) => {
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
    changePlayerState,
  };
}

export default useChangeState;