import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Apis } from 'commons/redux/utilities';
import { createAsyncThunkApi } from 'commons/redux/utilities/cerateApiAsyncThunk';
import {
  getCertificateUrl,
  registerUsersViaCSVUrl,
  getPlayerFromTeamUrl,
} from '../constants/urls';
import { InitialState } from 'commons/types/redux/program'

const initialState: InitialState = {
  isFetching: false,
  workshops: [],
  workshopsCount: 0,
  programs: [],
  program: null,
  myInvitations: [],
  teamInvitations: [],
  allRegistrationReceipts: [],
  registrationReceipt: null,
  widgets: [],
  allProgramTeams: [],
  teamsRequests: null,
  myWorkshops: [],
  registrationForm: null,
  merchandise: null,
  discountedPrice: 0,
  team: null,
  certificateLink: '',
  playerId: {},
  teamCurrentState: null,
};

export const getCertificateAction = createAsyncThunkApi(
  'programs/getCertificate',
  Apis.GET,
  getCertificateUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت گواهی حضور وجود داشت.',
    },
  }
);

export const registerUsersViaCSVAction = createAsyncThunkApi(
  'programs/registerUsersViaCSVAction',
  Apis.POST_FORM_DATA,
  registerUsersViaCSVUrl,
  {
    defaultNotification: {
      success: 'کاربران در دست افزودن قرار گرفتند...',
      error: 'اشکالی در افزودن کاربران وجود داشت.'
    },
  }
);

export const getPlayerFromTeamAction = createAsyncThunkApi(
  'programs/getPlayerFromTeamAction',
  Apis.POST,
  getPlayerFromTeamUrl,
  {
    bodyCreator: ({ teamId }) => ({
      team: teamId,
    }),
  }
);

// end of mentor programs

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const programSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    createRequestMentor: (state, { payload: { playerId, teamId, fsmId } }) => {
      state.teamsRequests[teamId + '.' + fsmId] = playerId;
    },
    removeRequestMentor: (state, { payload: { teamId, fsmId } }) => {
      delete state.teamsRequests[teamId + '.' + fsmId];
    },
    createNewTeamState: (state, { payload: { uuid, paperId, currentStateName, teamEnterTimeToState } }) => {
      state.teamCurrentState = { uuid, paperId, currentStateName, teamEnterTimeToState };
    },
    updateNewTeamState: (state, { payload: { uuid, paperId, currentStateName, teamEnterTimeToState } }) => {
      state.teamCurrentState = { uuid, paperId, currentStateName, teamEnterTimeToState };
    },
  },
  extraReducers: {

    [getCertificateAction.pending.toString()]: isFetching,
    [getCertificateAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.certificateLink = response.certificate;
      state.isFetching = false;
    },
    [getCertificateAction.rejected.toString()]: isNotFetching,

    // mentor slices
    [getPlayerFromTeamAction.fulfilled.toString()]: (state, { payload, meta }) => {
      const newPlayerId = { ...state.playerId };
      newPlayerId[meta.arg.teamId] = payload.response.id;
      state.playerId = newPlayerId;
      // window.open(
      //   `https://kamva.academy/join/${payload?.response?.id}/${meta?.arg?.accessToken}/`
      // );
    },

    [registerUsersViaCSVAction.pending.toString()]: isFetching,
    [registerUsersViaCSVAction.fulfilled.toString()]: isNotFetching,
    [registerUsersViaCSVAction.rejected.toString()]: isNotFetching,
  },
});

export const {
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
} = programSlice.actions;

export const { reducer: programsReducer } = programSlice;
