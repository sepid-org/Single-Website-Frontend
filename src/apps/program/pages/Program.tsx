import React, { FC } from 'react';
import EventProgram from 'commons/template/program/EventProgram';
import ProgramPageWrapper from 'commons/template/program/ProgramPageWrapper';

type ProgramPropsType = {}

const Program: FC<ProgramPropsType> = ({ }) => {
  return (
    <ProgramPageWrapper>
      <EventProgram />
    </ProgramPageWrapper>
  )
}

export default Program;
