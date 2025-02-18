import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from 'commons/redux/apis/party/UserApi';
import { UserInfoType } from 'commons/types/profile';

// Types
interface AccountState {
  id: string | null;
  userInfo: UserInfoType | null;
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
};

// Helper function to handle common login success pattern
const handleLoginSuccess = (
  state: AccountState,
  payload: AccountPayload
): void => {
  state.userInfo = { ...state.userInfo, ...payload.user };
  state.id = payload.user.id;
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
export const { logout } = AccountSlice.actions;

// Export reducer
export const { reducer: AccountReducer } = AccountSlice;