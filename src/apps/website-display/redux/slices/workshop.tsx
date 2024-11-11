import { createSlice } from '@reduxjs/toolkit';

import { Apis } from 'commons/redux/utilities';
import { createAsyncThunkApi } from 'commons/redux/utilities/cerateApiAsyncThunk';
import {
  reviewAnswersUrl,
  getFSMPlayersUrl,
} from 'apps/website-display/redux/constants/urls';

type FSMInitialStateType = any;

const initialState: FSMInitialStateType = {
  currentState: {
    widgets: [],
  },
  isFetching: false,
  allStates: [],
  allWorkshopEdges: [],
  workshop: null,
  answers: [],
  players: null,
};

export const getAnswersForReviewAction = createAsyncThunkApi(
  'workshop/reviewAnswerAction',
  Apis.GET,
  reviewAnswersUrl
);

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

// for mentors
export const getFSMPlayersAction = createAsyncThunkApi(
  'workshop/getFSMPlayersAction',
  Apis.GET,
  getFSMPlayersUrl,
)

const IndexSlice = createSlice({
  name: 'workshop',
  initialState,
  reducers: {},
  extraReducers: {

    [getAnswersForReviewAction.pending.toString()]: isFetching,
    [getAnswersForReviewAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.answers = response;
      state.isFetching = false;
    },
    [getAnswersForReviewAction.rejected.toString()]: isNotFetching,

    [getFSMPlayersAction.pending.toString()]: isFetching,
    [getFSMPlayersAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.players = response;
      state.isFetching = false;
    },
    [getFSMPlayersAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: workshopReducer } = IndexSlice;
