import React, { FC, Fragment } from 'react';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import InfoIcon from '@mui/icons-material/Info';
import { DashboardTabType } from 'commons/types/global';
import NormalPaperEditor from '../Paper/NormalPaperEditor';
import BoardStateEditor from './BoardStateEditor';
import { Box, Tab, Tabs } from '@mui/material';
import StateInfoEditor from './StateInfoEditor';
import { useFSMContext } from 'commons/hooks/useFSMContext';


type EditableFSMStatePropsType = {}

const EditableFSMState: FC<EditableFSMStatePropsType> = ({ }) => {
  const { fsmStateId } = useFSMContext();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId }, { skip: !Boolean(fsmStateId) });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (!fsmState) {
    return null;
  }

  const tabs: DashboardTabType[] = [
    {
      slug: 'info',
      label: 'مشخصات گام',
      component:
        <StateInfoEditor />
    },
    {
      slug: 'papers',
      label: 'ویجت‌ها',
      icon: InfoIcon,
      component:
        fsmState.template === 'normal' ?
          <NormalPaperEditor /> :
          <BoardStateEditor />,
    },
  ];

  const selectedTab = tabs[tabIndex];

  return (
    <Fragment>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map(tab =>
          <Tab key={tab.slug} label={tab.label} />
        )}
      </Tabs>
      {selectedTab.component}
    </Fragment>
  )
}

export default EditableFSMState;
