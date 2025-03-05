import { UserInfoType } from 'commons/types/profile';
import { updateToken } from 'commons/configs/axios';
import createStore from './createStore';

export const getPersistedState = (): {
  userInfo: UserInfoType;
  accessToken: string;
  refreshToken: string;
} => {
  const state = localStorage.getItem('sepid-state');
  return state
    ? JSON.parse(state)
    : {
      userInfo: null,
      accessToken: '',
      refreshToken: ''
    };
}

const reduxStore = createStore(getPersistedState());

reduxStore.subscribe(() => {
  const state = reduxStore.getState();
  localStorage.setItem(
    'sepid-state',
    JSON.stringify({
      account: {
        userInfo: state.account.userInfo,
        accessToken: state.account.accessToken,
        refreshToken: state.account.refreshToken,
      },
      website: {
        website: state.website.website,
      },
      Intl: state.Intl,
    })
  );
  updateToken(state.account.accessToken);
});

export default reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
