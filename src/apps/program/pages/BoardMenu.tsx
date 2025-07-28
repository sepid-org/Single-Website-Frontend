import React, { FC } from 'react';

import FSM from 'apps/fsm/pages/FSM';

type ProgramProps = {
  menuId: number;
};

const BoardMenu: FC<ProgramProps> = ({ menuId }) => {

  return (
    <FSM fsmId={menuId} />
  );
};

export default BoardMenu;