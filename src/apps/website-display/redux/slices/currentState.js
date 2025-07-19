import { createSlice } from '@reduxjs/toolkit'

const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: {
    openChatRoom: false,
    isFetching: false,
    state: {
      widgets: [],
      hints: []
    },
    scores: [],
    totalScore: 0
  },
  reducers: {
    changeOpenChatRoom: (state, actions) => {
      state.openChatRoom = !state.openChatRoom
    }
  },
  extraReducers: {}
})

export const { changeOpenChatRoom: changeOpenChatRoomAction } =
  currentStateSlice.actions

export const { reducer: currentStateReducer } = currentStateSlice
