import { WidgetType } from 'commons/types/widgets/widget';
import {
    FSMStateType,
    WorkshopEdge,
    TeamType,
    Answer,
    PlayerType,
    FSMType
} from '../models'

export type InitialStateType = {
    currentState: CurrentState,
    isFetching: boolean,
    allStates: FSMStateType[],
    allWorkshopEdges: WorkshopEdge[],
    fetchedTeamsObjects: TeamType[],
    requestedTeams: TeamType[],
    registrableWorkshops: FSMType[],
    workshop: FSMType,
    answers: Answer[],
    allWorkshops: FSMType[],
    players: PlayerType[],
};

type CurrentState = {
    widgets: WidgetType[]
}