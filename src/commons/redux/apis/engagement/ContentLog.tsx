import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { PayloadAction } from '@reduxjs/toolkit';

interface ContentLog {
  content_id: string;
  event_type: 'play' | 'pause' | 'progress' | 'seeking' | 'completed';
  details?: {
    time: number;
  };
}

interface ContentLogResponse {
  id: number;
  content_id: string;
  user_id: number | null;
  event_type: string;
  timestamp: string;
  details: {
    time: number;
  };
}

export const ContentLogSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation برای ارسال لاگ ویدئو
    sendContentLog: builder.mutation<ContentLogResponse, ContentLog>({
      query: (logData) => ({
        url: '/engagement/content-log/',
        method: 'POST',
        body: logData,
      }),
    }),

    getContentLogs: builder.query<ContentLogResponse[], string>({
      query: (contentId) => ({
        url: `/engagement/content-log/?content_id=${contentId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSendContentLogMutation,
  useGetContentLogsQuery,
} = ContentLogSlice;
