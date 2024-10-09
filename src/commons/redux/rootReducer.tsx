import { combineReducers } from '@reduxjs/toolkit';
import allReducers from 'apps/website-display/redux/slices/allReducers';
import { PartyManagementServiceApi } from 'apps/website-display/redux/features/ManagePartyServiceApiSlice'
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice'
import { WebsiteManagementServiceApi } from 'apps/website-display/redux/features/ManageWebsiteServiceApiSlice'

const appReducer = combineReducers({
  ...allReducers,
  [PartyManagementServiceApi.reducerPath]: PartyManagementServiceApi.reducer,
  [ContentManagementServiceApi.reducerPath]: ContentManagementServiceApi.reducer,
  [WebsiteManagementServiceApi.reducerPath]: WebsiteManagementServiceApi.reducer,
});

export default appReducer;
