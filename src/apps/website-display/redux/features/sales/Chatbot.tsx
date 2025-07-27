import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice'

export interface MetisMessage {
  type: 'USER' | 'AI'
  content: string
  attachments?: any | null
}

export interface StartChatSessionArgs {
  widgetId: number
  playerId: number;
  initialMessages?: MetisMessage[]
}
export interface SendChatMessageArgs {
  sessionId: string
  content: string
}
export interface GetChatSessionArgs {
  sessionId: string
}
export interface ResetChatSessionArgs {
  sessionId: string
}

export const ChatbotSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({

    startChatSession: builder.mutation<{ id: string; widget: number }, StartChatSessionArgs>({
      query: ({ widgetId, playerId, initialMessages }) => ({
        url: '/widgets/chat/session/',
        method: 'POST',
        body: {
          widget_id: widgetId,
          player_id: playerId,
          initial_messages: initialMessages ?? null
        }
      })
    }),

    /* 2) ارسال پیام */
    sendChatMessage: builder.mutation<MetisMessage, SendChatMessageArgs>({
      query: ({ sessionId, content }) => ({
        url: `/widgets/chat/session/${sessionId}/message/`,
        method: 'POST',
        body: { content }
      }),
      invalidatesTags: (_, __, { sessionId }) => [
        { type: 'ChatSession', id: sessionId }
      ]
    }),

    getChatSession: builder.query<{ id: string; messages: MetisMessage[] }, GetChatSessionArgs>({
      query: ({ sessionId }) => `/widgets/chat/session/${sessionId}/`,
      providesTags: result =>
        result ? [{ type: 'ChatSession', id: result.id }] : []
    }),

    resetChatSession: builder.mutation<void, ResetChatSessionArgs>({
      query: ({ sessionId }) => ({
        url: `/widgets/chat/session/${sessionId}/`,
        method: 'DELETE'
      }),
      invalidatesTags: (_, __, { sessionId }) => [
        { type: 'ChatSession', id: sessionId }
      ]
    })
  })
})

export const {
  useStartChatSessionMutation,
  useSendChatMessageMutation,
  useGetChatSessionQuery,
  useResetChatSessionMutation
} = ChatbotSlice