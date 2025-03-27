import { AccountReducer } from './Account';
import { currentStateReducer } from './currentState';
import { programsReducer } from './programs';
import { translatorReducer } from './translator';
import { whiteboardReducer } from './whiteboard';
import { workshopReducer } from './workshop';
import { assessmentReducer } from './assessment';
import { WebsiteReducer } from './Website';
import { FSMReducer } from './FSM';
import { websocketReducer } from 'apps/chat/redux/websocket';

const allReducers = {
  account: AccountReducer,
  websocket: websocketReducer,
  website: WebsiteReducer,
  fsm: FSMReducer,
  currentState: currentStateReducer,
  whiteboard: whiteboardReducer,
  programs: programsReducer,
  workshop: workshopReducer,
  Intl: translatorReducer,
  scoring: assessmentReducer,
};

export default allReducers;
