import { UserInfoType } from 'commons/types/profile';
import createStore from './createStore';

export const getPersistedState = (): { userInfo?: UserInfoType } => {
  return localStorage.getItem('sepid-state')
    ? JSON.parse(localStorage.getItem('sepid-state'))
    : {};
}

const reduxStore = createStore(getPersistedState());

reduxStore.subscribe(() => {
  const state = reduxStore.getState();
  localStorage.setItem(
    'sepid-state',
    JSON.stringify({
      account: {
        userInfo: state.account.userInfo,
      },
      website: {
        website: state.website.website,
      },
      Intl: state.Intl,
    })
  );
});

export default reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
