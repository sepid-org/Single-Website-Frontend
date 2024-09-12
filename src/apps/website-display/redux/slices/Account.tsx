import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSlice } from 'apps/website-display/redux/features/user/UserSlice';
import { UserInfoType } from 'commons/types/profile';
import { toast } from 'react-toastify';

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
  account: Partial<UserInfoType>;
  access: string;
  refresh: string;
}

const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: () => {
      toast.info('خدا به همراهتان👋');
      return initialState;
    },
    refreshToken: (state, action: PayloadAction<TokenPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      window.location.reload();
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      UserSlice.endpoints.createAccount.matchFulfilled,
      (state, { payload }: PayloadAction<AccountPayload>) => {
        state.userInfo = { ...state.userInfo, ...payload.account };
        state.id = payload.account.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
      }
    );

    builder.addMatcher(
      UserSlice.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<AccountPayload>) => {
        state.userInfo = { ...state.userInfo, ...payload.account };
        state.id = payload.account.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
      }
    );

    builder.addMatcher(
      UserSlice.endpoints.loginGoogleUser.matchFulfilled,
      (state, { payload }: PayloadAction<AccountPayload>) => {
        state.userInfo = { ...state.userInfo, ...payload.account };
        state.id = payload.account.id;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
      }
    );
  }
});

export const { logout: logoutAction } = AccountSlice.actions;

export const { reducer: AccountReducer } = AccountSlice;