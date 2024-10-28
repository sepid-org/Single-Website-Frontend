import React, { FC } from 'react';
import EventProgram from 'apps/program/template/EventProgram';
import ProgramPageWrapper from 'apps/program/template/ProgramPageWrapper';

type ProgramPropsType = {}

const Program: FC<ProgramPropsType> = ({ }) => {
  return (
    <ProgramPageWrapper>
      <EventProgram />
    </ProgramPageWrapper>
  )
}

export default Program;
