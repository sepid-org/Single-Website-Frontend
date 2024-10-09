import { FC, useContext } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { StatePageContext } from 'apps/website-display/pages/FSM';
import {
  useGoForwardMutation,
  useMentorMoveForwardMutation,
} from 'apps/website-display/redux/features/program/PlayerSlice';

const useChangeState = () => {
  const t = useTranslate();
  const { isMentor } = useContext(StatePageContext);
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