import { createSlice } from '@reduxjs/toolkit';
import { FSMSlice } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { FSMType } from 'commons/types/models';

type FSMSliceInitialStateType = {
  fsm: FSMType;
};

const initialState: FSMSliceInitialStateType = {
  fsm: null,
};

const Slice = createSlice({
  name: 'fsm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addMatcher(
      FSMSlice.endpoints.getFSM.matchFulfilled,
      (state, { payload }) => {
        state.fsm = payload;
      }
    );

  },
});

export const { reducer: FSMReducer } = Slice;
