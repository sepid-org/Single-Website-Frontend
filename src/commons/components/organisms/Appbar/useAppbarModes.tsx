import ProgramAppBarItems from './modes/ProgramAppbarItems';
import GeneralAppbarItems from './modes/GeneralAppbarItems';
import FSMAppbarItems from './modes/FSMAppbarItems';
import MentorFSMAppBar from './modes/MentorFSMAppbarItems';
import { AppbarItemsType, AppbarModes } from 'commons/types/global';
import WebsiteAppbarItems from './modes/WebsiteAppbarItems';
import DashboardAppbarItems from './modes/DashboardAppbarItems';

const mode2component = {
  DASHBOARD: DashboardAppbarItems,
  FSM: FSMAppbarItems,
  MENTOR_FSM: MentorFSMAppBar,
  PROGRAM: ProgramAppBarItems,
  GENERAL: GeneralAppbarItems,
  ARTICLE: GeneralAppbarItems,
  WEBSITE: WebsiteAppbarItems,
}

type UseAppbarItemsPropsType = {
  mode: AppbarModes;
}

const useAppbarItems = ({ mode }: UseAppbarItemsPropsType): AppbarItemsType => {
  return mode2component[mode]({});
}

export default useAppbarItems;
