import React from 'react';
import MetabaseDashboard from 'commons/template/MetabaseDashboard';
import { useFSMContext } from 'commons/hooks/useFSMContext';

const Statistics = () => {
  const { fsmId } = useFSMContext();

  return (
    <MetabaseDashboard dashboard_id={4} params={{ "fsm_id": fsmId }} />
  )
}

export default Statistics;