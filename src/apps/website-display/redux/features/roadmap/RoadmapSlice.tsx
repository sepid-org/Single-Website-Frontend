import { Link } from 'commons/types/redux/Roadmap';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type GetPlayerTransitedPathInputType = {
  playerId: string;
};

type GetPlayerTransitedPathOutputType = Link[];

type GetFSMRoadmapInputType = {
  fsmId: string;
};

type GetFSMRoadmapOutputType = {
  firstStateTitle: string;
  links: Link[];
}

export const ProgramSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({

    getPlayerTransitedPath: builder.query<GetPlayerTransitedPathOutputType, GetPlayerTransitedPathInputType>({
      providesTags: ['player-transited-path'],
      query: ({ playerId }) => `/roadmap/get_player_transited_path/?player=${playerId}`,
      transformResponse: (response: any): GetPlayerTransitedPathOutputType => {
        return response;
      },
    }),

    getFSMRoadmapAction: builder.query<GetFSMRoadmapOutputType, GetFSMRoadmapInputType>({
      providesTags: ['fsm-states', 'fsm-edges'],
      query: ({ fsmId }) => `/roadmap/get_fsm_roadmap/?fsm=${fsmId}`,
      transformResponse: (response: any): GetFSMRoadmapOutputType => {
        return {
          firstStateTitle: response.first_state_title,
          links: response.links,
        };
      },
    }),

  })
});

export const {
  useGetFSMRoadmapActionQuery,
  useGetPlayerTransitedPathQuery
} = ProgramSlice;
