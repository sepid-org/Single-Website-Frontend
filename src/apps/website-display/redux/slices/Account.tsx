import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from 'commons/redux/slices/party/UserApi';
import { UserInfoType } from 'commons/types/profile';

interface AccountState {
  id: string;
  userInfo: UserInfoType;
  accessToken: string;
  refreshToken: string;
}

const initialState: AccountState = {
  id: null,
  userInfo: null,
  accessToken: '',
  refreshToken: '',
};

interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

interface AccountPayload {
  user: Partial<UserInfoType>;
  access: string;
  refresh: string;
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    refreshToken: (state, action: PayloadAction<TokenPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      window.location.reload();
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      UserApi.endpoints.createAccount.matchFulfilled,
      (state, { payload }: PayloadAction<AccountPayload>) => {
        state.userInfo = { ...state.userInfo, ...payload.user };
        state.id = payload.user.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
      }
    );

    builder.addMatcher(
      UserApi.endpoints.otpLogin.matchFulfilled,
      (state, { payload }: PayloadAction<AccountPayload>) => {
        state.userInfo = { ...state.userInfo, ...payload.user };
        state.id = payload.user.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
      }
    );

    builder.addMatcher(
      UserApi.endpoints.simpleLogin.matchFulfilled,
      (state, { payload }: PayloadAction<AccountPayload>) => {
        state.userInfo = { ...state.userInfo, ...payload.user };
        state.id = payload.user.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
      }
    );

    builder.addMatcher(
      UserApi.endpoints.googleLogin.matchFulfilled,
      (state, { payload }: PayloadAction<AccountPayload>) => {
        state.userInfo = { ...state.userInfo, ...payload.user };
        state.id = payload.user.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
      }
    );
  }
});

export const { logout: logoutAction } = UserSlice.actions;

export const { reducer: AccountReducer } = UserSlice;