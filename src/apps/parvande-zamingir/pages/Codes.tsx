import FSM from 'apps/fsm/pages/FSM';
import React from 'react';

const CodesPage = () => {
  const fsmId = process.env.NODE_ENV === 'development' ? 22 : 123456;

  return (
    <FSM fsmId={fsmId} />
  );
};

export default CodesPage;