import React, { FC, Fragment } from 'react';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import InfoIcon from '@mui/icons-material/Info';
import { DashboardTabType } from 'commons/types/global';
import NormalStateEditor from './NormalStateEditor';
import BoardStateEditor from './BoardStateEditor';
import { Tab, Tabs } from '@mui/material';
import StateInfoEditor from './StateInfoEditor';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';

type FSMStateEditorPropsType = {
  fsmStateId: string;
}

const FSMStateEditor: FC<FSMStateEditorPropsType> = ({
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
        <StateInfoEditor />
    },
    {
      slug: 'papers',
      label: 'ویجت‌ها',
      icon: InfoIcon,
      component:
        fsmState.template === 'normal' ?
          <NormalStateEditor fsmStateId={fsmStateId} /> :
          <BoardStateEditor fsmStateId={fsmStateId} />,
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
      <FSMStateProvider fsmStateId={fsmStateId} fsmState={fsmState}>
        {selectedTab.component}
      </FSMStateProvider>
    </Fragment>
  )
}

export default FSMStateEditor;
