import { combineReducers } from '@reduxjs/toolkit';
import allReducers from 'apps/website-display/redux/slices/allReducers';
import { PartyManagementServiceApi } from 'apps/website-display/redux/features/ManagePartyServiceApiSlice'
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice'
import { WebsiteManagementServiceApi } from 'apps/website-display/redux/features/ManageWebsiteServiceApiSlice'
import { AshbariaApi } from 'apps/ashbaria/redux/AshbariaApiSlice';
import { BankApi } from './slices/BankApi';

const appReducer = combineReducers({
  ...allReducers,
  [PartyManagementServiceApi.reducerPath]: PartyManagementServiceApi.reducer,
  [ContentManagementServiceApi.reducerPath]: ContentManagementServiceApi.reducer,
  [WebsiteManagementServiceApi.reducerPath]: WebsiteManagementServiceApi.reducer,
  [AshbariaApi.reducerPath]: AshbariaApi.reducer,
  [BankApi.reducerPath]: BankApi.reducer,
});

export default appReducer;
