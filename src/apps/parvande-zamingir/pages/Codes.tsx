import FSM from 'apps/fsm/pages/FSM';
import React from 'react';
import useGetDynamicsWidgets from '../hooks/useGetDynamicWidgets';

const CodesPage = () => {
  const fsmId = process.env.NODE_ENV === 'development' ? 22 : 311;
  const { dynamicWidgets } = useGetDynamicsWidgets();
  return (
    <FSM dynamicObjects={dynamicWidgets} fsmId={fsmId} />
  );
};

export default CodesPage;