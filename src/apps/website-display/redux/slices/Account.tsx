import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from 'commons/redux/apis/party/UserApi';

// Types
interface AccountState {
  accessToken: string;
  refreshToken: string;
}

interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

interface AccountPayload {
  access: string;
  refresh: string;
}

// Initial state
const initialState: AccountState = {
  accessToken: null,
  refreshToken: null,
};

// Helper function to handle common login success pattern
const handleLoginSuccess = (
  state: AccountState,
  payload: AccountPayload
): void => {
  state.accessToken = payload.access;
  state.refreshToken = payload.refresh;
};

// Login endpoints that need to be matched
const loginEndpoints = [
  'createAccount',
  'otpLogin',
  'uuidLogin',
  'simpleLogin',
  'googleLogin',
] as const;

const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
    refreshToken: (state, action: PayloadAction<TokenPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
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
export const { refreshToken, logout } = AccountSlice.actions;

// Export reducer
export const { reducer: AccountReducer } = AccountSlice;