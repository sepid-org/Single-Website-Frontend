import React, { FC } from 'react';
import EventProgram from 'apps/program/template/EventProgram';
import PrivateProgramPageWrapper from 'apps/program/template/ProgramPageWrapper';

type ProgramPropsType = {}

const Program: FC<ProgramPropsType> = ({ }) => {
  return (
    <PrivateProgramPageWrapper>
      <EventProgram />
    </PrivateProgramPageWrapper>
  )
}

export default Program;
