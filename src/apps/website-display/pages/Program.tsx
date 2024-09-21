import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import EventProgram from 'commons/template/program/EventProgram';
import ProgramPageWrapper from 'commons/template/program/ProgramPageWrapper';
import FilmBaziApp from 'apps/film-bazi/App'

type ProgramPropsType = {}

const Program: FC<ProgramPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  return (
    <ProgramPageWrapper>
      {program?.slug === 'filmbazi' && <FilmBaziApp />}
      {program?.type === 'Event' && <EventProgram />}
    </ProgramPageWrapper>
  )
}

export default Program;
