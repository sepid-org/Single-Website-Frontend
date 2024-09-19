import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

import FilmBaziApp from 'apps/film-bazi/App'

type CampaignProgramPropsType = {}

const CampaignProgram: FC<CampaignProgramPropsType> = ({
}) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  if (program.slug === 'filmbazi') {
    return <FilmBaziApp />
  }
}

export default CampaignProgram;
