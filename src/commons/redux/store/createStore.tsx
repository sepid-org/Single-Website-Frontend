import { configureStore } from '@reduxjs/toolkit';
import { PartyManagementServiceApi } from 'apps/website-display/redux/features/ManagePartyServiceApiSlice'
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice'
import { WebsiteManagementServiceApi } from 'apps/website-display/redux/features/ManageWebsiteServiceApiSlice'
import { AshbariaApi } from 'apps/ashbaria/redux/AshbariaApiSlice';
import rootReducer from '../rootReducer';

const createStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(PartyManagementServiceApi.middleware)
        .concat(ContentManagementServiceApi.middleware)
        .concat(WebsiteManagementServiceApi.middleware)
        .concat(AshbariaApi.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
