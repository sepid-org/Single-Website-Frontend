import { createSlice } from '@reduxjs/toolkit';
import { Apis } from 'commons/redux/utilities';
import { createAsyncThunkApi } from 'commons/redux/utilities/cerateApiAsyncThunk';
import {
  clearQuestionAnswerUrl,
  sendWidgetAnswerUrl,
} from 'apps/website-display/redux/constants/urls';

export type InitialStateType = {
  isFetching: boolean;
  answers: object;
}

const initialState: InitialStateType = {
  answers: {},
  isFetching: false,
}

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

/////////////////////////// SEND ANSWER ///////////////////////////

const _sendWidgetAnswerAction = createAsyncThunkApi(
  'widget/sendWidgetAnswerAction',
  Apis.POST,
  sendWidgetAnswerUrl,
  {
    defaultNotification: {
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const sendBigAnswerAction = ({ questionId, text, onSuccess, onFailure, player }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    text,
    player,
    answer_type: 'BigAnswer',
    onSuccess,
    onFailure,
  });

export const sendSmallAnswerAction = ({ questionId, text, onSuccess, onFailure, player }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    text,
    player,
    answer_type: 'SmallAnswer',
    onSuccess,
    onFailure,
  });

export const sendInviteeUsernameResponseAction = ({ questionId, username, onSuccess, onFailure, player }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    username,
    player,
    answer_type: 'InviteeUsernameResponse',
    onSuccess,
    onFailure,
  });

export const sendMultiChoiceAnswerAction = ({ questionId, selectedChoices, onSuccess, onFailure, player }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    choices: selectedChoices,
    player,
    answer_type: 'MultiChoiceAnswer',
    onSuccess,
    onFailure,
  });

export const sendUploadFileAnswerAction = ({ questionId, answerFile, onSuccess, onFailure, player }) =>
  _sendWidgetAnswerAction({
    question: questionId,
    answer_file: answerFile,
    player,
    answer_type: 'UploadFileAnswer',
    onSuccess,
    onFailure,
  });

export const clearQuestionAnswerAction = createAsyncThunkApi(
  'widget/clearQuestionAnswerAction',
  Apis.POST,
  clearQuestionAnswerUrl,
  {
    defaultNotification: {
      error: 'مشکلی در حذف‌کردن پاسخ وجود داشت.',
    },
  }
);

const AnswerSlice = createSlice({
  name: 'AnswerSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [_sendWidgetAnswerAction.pending.toString()]: isFetching,
    [_sendWidgetAnswerAction.fulfilled.toString()]: isNotFetching,
    [_sendWidgetAnswerAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: AnswerReducer } = AnswerSlice;
