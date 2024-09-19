import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import EventProgram from 'commons/components/template/program/EventProgram';
import ProgramPageTemplate from 'commons/components/template/program/ProgramPageTemplate';
import FilmBaziApp from 'apps/film-bazi/App'

type ProgramPropsType = {}

const Program: FC<ProgramPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  return (
    <ProgramPageTemplate>
      {program?.slug === 'filmbazi' && <FilmBaziApp />}
      {program?.type === 'Event' && <EventProgram />}
    </ProgramPageTemplate>
  )
}

export default Program;
