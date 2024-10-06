import React, { FC } from 'react';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import InfoIcon from '@mui/icons-material/Info';
import { DashboardTabType } from 'commons/types/global';
import NormalStateWidgetsEditor from './NormalStateWidgetsEditor';
import BoardStateWidgetsEditor from './BoardStateWidgetsEditor';
import { Box, Container, Tab, Tabs } from '@mui/material';
import StateInfoEditor from './StateInfoEditor';


type EditableFSMStatePropsType = {
  fsmStateId: string;
}

const EditableFSMState: FC<EditableFSMStatePropsType> = ({
  fsmStateId,
}) => {
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
        <StateInfoEditor fsmStateId={fsmStateId} />
    },
    {
      slug: 'papers',
      label: 'برگه‌ها',
      icon: InfoIcon,
      component:
        fsmState.template === 'normal' ?
          <NormalStateWidgetsEditor fsmStateId={fsmStateId} /> :
          <BoardStateWidgetsEditor fsmStateId={fsmStateId} />,
    },
  ];

  const selectedTab = tabs[tabIndex];

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
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
    </Box>
  )
}

export default EditableFSMState;
