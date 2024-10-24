import { CreateScenarioRequestType, EvaluateSubmissionRequestType, EvaluateSubmissionResponseType, ScenarioType, UpdateScenarioRequestType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';


export const ScenarioSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({
    getScenarios: builder.query<ScenarioType[], void>({
      query: () => '/game-logic/scenarios/',
      providesTags: ['Scenarios'],
    }),
    getScenario: builder.query<ScenarioType, number>({
      query: (id) => `/game-logic/scenarios/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Scenarios', id }],
    }),
    addScenario: builder.mutation<ScenarioType, CreateScenarioRequestType>({
      query: (scenario) => ({
        url: '/game-logic/scenarios/',
        method: 'POST',
        body: scenario,
      }),
      invalidatesTags: ['Scenarios'],
    }),
    updateScenario: builder.mutation<ScenarioType, UpdateScenarioRequestType>({
      query: ({ id, ...scenario }) => ({
        url: `/game-logic/scenarios/${id}/`,
        method: 'PUT',
        body: scenario,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Scenarios', id }, 'Scenarios'],
    }),
    patchScenario: builder.mutation<ScenarioType, UpdateScenarioRequestType>({
      query: ({ id, ...patch }) => ({
        url: `/game-logic/scenarios/${id}/`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Scenarios', id }, 'Scenarios'],
    }),
    deleteScenario: builder.mutation<void, number>({
      query: (id) => ({
        url: `/game-logic/scenarios/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Scenarios'],
    }),
    evaluateSubmission: builder.mutation<EvaluateSubmissionResponseType, EvaluateSubmissionRequestType>({
      query: ({ id, submission }) => ({
        url: `/game-logic/scenarios/${id}/evaluate_submission/`,
        method: 'POST',
        body: { submission },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetScenariosQuery,
  useGetScenarioQuery,
  useAddScenarioMutation,
  useUpdateScenarioMutation,
  usePatchScenarioMutation,
  useDeleteScenarioMutation,
  useEvaluateSubmissionMutation,
} = ScenarioSlice;