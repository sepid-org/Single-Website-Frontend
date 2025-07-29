import { AttributeType } from "commons/types/object/attribute";
import { ContentManagementServiceApi } from "../ManageContentServiceApiSlice";
import tagGenerationWithErrorCheck from "commons/redux/utilities/tagGenerationWithErrorCheck";

export interface BaseAttributePayload {
  objectId: number;
  parentAttributeId?: number;
  title: string;
  description?: string;
  order?: number;
  attributes?: number[];
  type: string;
}

export interface TransitionPayload extends BaseAttributePayload {
  destination_state_id?: number;
  is_backward?: boolean;
}

export type CreateAttributeRequest = BaseAttributePayload | TransitionPayload;

export const AttributeSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({

    createAttribute: builder.mutation<AttributeType, CreateAttributeRequest>({
      query: ({ objectId, parentAttributeId, ...body }) => ({
        url: "/attribute/attributes/",
        method: "POST",
        body: {
          ...body,
          object_id: objectId,
          parent_attribute_id: parentAttributeId,
        },
      }),
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => ([
        { type: "ObjectAttributes", id: item.objectId },
        { type: "Attribute", id: "LIST" },
      ])),
    }),

    updateAttribute: builder.mutation<AttributeType, { id: number; body: Partial<CreateAttributeRequest>; }>({
      query: ({ id, body }) => ({
        url: `/attribute/attributes/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagGenerationWithErrorCheck((result, error, { id, objectId }) => ([
        { type: "ObjectAttributes", id: objectId },
        { type: "Attribute", id },
        { type: "Attribute", id: "LIST" },
      ])),
    }),

    deleteAttribute: builder.mutation<void, { id: number; objectId: number; }>({
      query: ({ id }) => ({
        url: `/attribute/attributes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => ([
        { type: "ObjectAttributes", id: item.objectId },
        { type: "Attribute", id: item.id },
        { type: "Attribute", id: "LIST" },
      ])),
    }),

    getAttribute: builder.query<AttributeType, number>({
      query: (id) => `/attribute/attributes/${id}/`,
      providesTags: (result, error, id) => [
        { type: "Attribute", id },
      ],
    }),
  }),
});


export const {
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAttributeQuery,
} = AttributeSlice;
