import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import SimpleMenu from 'apps/program/pages/SimpleMenu';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import BoardMenu from './BoardMenu';

type ProgramProps = {};

const Menu: FC<ProgramProps> = () => {
  const { programSlug } = useParams<{ programSlug: string }>();

  const {
    data: program,
    isLoading: isProgramLoading,
  } = useGetProgramQuery({ programSlug });

  if (isProgramLoading || !program) {
    return null;
  }

  if (program?.menu) {
    return (
      <BoardMenu menuId={program.menu} />
    );
  }

  return <SimpleMenu />;
};

export default Menu;