import React, { FC, Fragment } from 'react';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import InfoIcon from '@mui/icons-material/Info';
import { DashboardTabType } from 'commons/types/global';
import NormalStateEditor from './NormalStateEditor';
import BoardStateEditor from './BoardStateEditor';
import { Tab, Tabs } from '@mui/material';
import StateInfoEditor from './StateInfoEditor';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HintsEditor from 'commons/components/organisms/hint/HintsEditor';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import { useParams } from 'react-router-dom';

type FSMStateEditorPropsType = {
  fsmStateId: string;
}

const FSMStateEditor: FC<FSMStateEditorPropsType> = ({
  fsmStateId,
}) => {
  const fsmId = parseInt(useParams().fsmId);
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
      component: <StateInfoEditor />
    },
    {
      slug: 'contents',
      label: 'محتوا',
      icon: InfoIcon,
      component:
        fsmState.template === 'normal' ?
          <NormalStateEditor fsmStateId={fsmStateId} /> :
          <BoardStateEditor fsmStateId={fsmStateId} />,
    },
    {
      slug: 'hints',
      label: 'راهنمایی‌ها',
      icon: HelpCenterIcon,
      component: <HintsEditor type='state' referenceId={fsmStateId} />
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
      <FSMProvider fsmId={fsmId}>
        <FSMStateProvider fsmStateId={fsmStateId}>
          {selectedTab.component}
        </FSMStateProvider>
      </FSMProvider>
    </Fragment>
  )
}

export default FSMStateEditor;
