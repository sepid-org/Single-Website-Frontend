import { ContentManagementServiceApi } from "apps/website-display/redux/features/ManageContentServiceApiSlice";
import { PartyManagementServiceApi } from "apps/website-display/redux/features/ManagePartyServiceApiSlice";
import { WebsiteManagementServiceApi } from "apps/website-display/redux/features/ManageWebsiteServiceApiSlice";

export const createInvalidationCallback = (tags) => {
  return async (_, { dispatch, queryFulfilled }) => {
    try {
      await queryFulfilled;
      dispatch(PartyManagementServiceApi.util.invalidateTags(tags));
      dispatch(ContentManagementServiceApi.util.invalidateTags(tags));
      dispatch(WebsiteManagementServiceApi.util.invalidateTags(tags));
    } catch (error) {
      // Additional error handling if needed
    }
  };
};