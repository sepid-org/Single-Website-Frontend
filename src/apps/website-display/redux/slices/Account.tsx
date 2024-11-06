import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from 'commons/redux/apis/party/UserApi';
import { UserInfoType } from 'commons/types/profile';

// Types
interface AccountState {
  id: string | null;
  userInfo: UserInfoType | null;
  accessToken: string;
  refreshToken: string;
}

interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

interface AccountPayload {
  user: Partial<UserInfoType>;
  access: string;
  refresh: string;
}

// Initial state
const initialState: AccountState = {
  id: null,
  userInfo: null,
  accessToken: '',
  refreshToken: '',
};

// Helper function to handle common login success pattern
const handleLoginSuccess = (
  state: AccountState,
  payload: AccountPayload
): void => {
  state.userInfo = { ...state.userInfo, ...payload.user };
  state.id = payload.user.id;
  state.accessToken = payload.access;
  state.refreshToken = payload.refresh;
};

// Login endpoints that need to be matched
const loginEndpoints = [
  'createAccount',
  'otpLogin',
  'simpleLogin',
  'googleLogin',
] as const;

const AccountSlice = createSlice({
  name: 'account',
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
    // Dynamically add matchers for all login endpoints
    loginEndpoints.forEach((endpoint) => {
      builder.addMatcher(
        UserApi.endpoints[endpoint].matchFulfilled,
        (state, { payload }: PayloadAction<AccountPayload>) => {
          handleLoginSuccess(state, payload);
        }
      );
    });
  },
});

// Export actions
export const { logout: logoutAction, refreshToken } = AccountSlice.actions;

// Export reducer
export const { reducer: AccountReducer } = AccountSlice;