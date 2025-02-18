import React from 'react';
import { useParams } from 'react-router-dom';
import MetabaseDashboard from 'commons/template/MetabaseDashboard';

const Statistics = () => {
  const { formId } = useParams();

  return (
    <>todo</>
    // <MetabaseDashboard dashboard_id={4} params={{ "fsm_id": fsmId }} />
  )
}

export default Statistics;