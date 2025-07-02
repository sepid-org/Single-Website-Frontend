import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import MetabaseDashboard from 'commons/template/MetabaseDashboard';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type PropsType = {}

const StatisticsTab: FC<PropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  return (
    <MetabaseDashboard dashboard_id={5} params={{ program_id: program.id }} />
  );
}

export default StatisticsTab;
