import { WidgetType } from 'commons/types/widgets/widget';
import {
  ProgramType,
  InvitationType,
  RegistrationReceiptType,
  TeamType,
  RegistrationFormType,
  FSMType,
  MerchandiseType
} from '../models'

export type InitialState = {
  isFetching: boolean,
  workshops: FSMType[],
  workshopsCount: number,
  programs: ProgramType[],
  program: ProgramType,
  myInvitations: InvitationType[],
  teamInvitations: InvitationType[],
  allRegistrationReceipts: RegistrationReceiptType[],
  registrationReceipt: RegistrationReceiptType,
  widgets: WidgetType[],
  allProgramTeams: TeamType[],
  teamsRequests: object,
  myWorkshops: FSMType[],
  registrationForm: RegistrationFormType,
  merchandise: MerchandiseType,
  discountedPrice: Number,
  team: TeamType,
  certificateLink: String,
  playerId: Object,
  teamCurrentState: { uuid: string, paperId: string, currentStateName: string, teamEnterTimeToState: string },
};

