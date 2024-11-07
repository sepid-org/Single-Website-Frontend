import { AshbariaApi } from "apps/ashbaria/redux/AshbariaApi";
import { ContentManagementServiceApi } from "apps/website-display/redux/features/ManageContentServiceApiSlice";
import { PartyManagementServiceApi } from "apps/website-display/redux/features/ManagePartyServiceApiSlice";
import { WebsiteManagementServiceApi } from "apps/website-display/redux/features/ManageWebsiteServiceApiSlice";
import { BankApi } from "../apis/bank/BankApi";
import { FilmbaziApi } from "apps/film-bazi/redux/FilmbaziApi";
import { tagTypes } from "./tagGenerationWithErrorCheck";

// Define the API slices array once
const apiSlices = [
  PartyManagementServiceApi,
  ContentManagementServiceApi,
  WebsiteManagementServiceApi,
  AshbariaApi,
  FilmbaziApi,
  BankApi
] as const;

// Define types for tag structure
type Tag = { type: string; id?: string | number } | string;

/**
 * Base invalidation function that handles the core logic
 */
const baseInvalidation = (tags: Tag[]) => {
  return async (_: any, { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: Promise<any> }) => {
    try {
      await queryFulfilled;
      apiSlices.forEach(api => {
        dispatch(api.util.invalidateTags(tags));
      });
    } catch (error) {
      console.error('Error invalidating tags:', error);
    }
  };
};

/**
 * Invalidates all registered tag types with id='MY'
 */
export const invalidateMyTagsAcrossApis = () => {
  const tagsToInvalidate = tagTypes.map(type => ({ type, id: 'MY' }));
  return baseInvalidation(tagsToInvalidate);
};

/**
 * Invalidates specific tag types with id='MY'
 */
export const invalidateMyTagsForTypes = (specificTagTypes: string[] = []) => {
  const tagsToInvalidate = specificTagTypes.map(type => ({ type, id: 'MY' }));
  return baseInvalidation(tagsToInvalidate);
};

/**
 * Creates an invalidation callback for specific tags
 */
export const createInvalidationCallback = (tags: Tag[]) => {
  return baseInvalidation(tags);
};
