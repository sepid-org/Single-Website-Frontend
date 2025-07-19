import { configureStore } from '@reduxjs/toolkit';
import { PartyManagementServiceApi } from 'apps/website-display/redux/features/ManagePartyServiceApiSlice'
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice'
import { WebsiteManagementServiceApi } from 'apps/website-display/redux/features/ManageWebsiteServiceApiSlice'
import rootReducer from '../rootReducer';
import { BankApi } from '../apis/bank/BankApi';
import { ReportingServiceSlice } from 'commons/redux/apis/reporting-service/ReportingServiceSlice';
import { AshbariaApi } from 'apps/ashbaria/redux/AshbariaApi';
import { FilmbaziApi } from 'apps/film-bazi/redux/FilmbaziApi';

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
        .concat(AshbariaApi.middleware)
        .concat(FilmbaziApi.middleware)
        .concat(BankApi.middleware)
        .concat(ReportingServiceSlice.middleware),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });
};

export default createStore;
