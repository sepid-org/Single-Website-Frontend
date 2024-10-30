import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {
  useGetMyPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import WIDGET_TYPE_MAPPER from 'commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import useAshbariaCustomWidgets from '../../hooks/useAshbariaCustomWidgets';
import FSMState from 'apps/fsm/template/FSMState';


type CourtPagePropsType = {}

const CourtPage: FC<CourtPagePropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data: player } = useGetMyPlayerQuery({ fsmId });
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { complementaryObjects } = useAshbariaCustomWidgets();

  const CUSTOM_WIDGET_TYPE_MAPPER = {
    ...WIDGET_TYPE_MAPPER,
    MultiChoiceProblem: {
      ...WIDGET_TYPE_MAPPER['MultiChoiceProblem'],
      WidgetComponent: WIDGET_TYPE_MAPPER['MultiChoiceProblem'].WidgetComponent,
    },
  }

  return (
    <Fragment>
      {fsm &&
        <Helmet>
          <title>{fsm.name}</title>
        </Helmet>
      }
      <FSMStateProvider
        fsmStateId={player?.current_state}
        playerId={player?.id}
        WIDGET_TYPE_MAPPER={CUSTOM_WIDGET_TYPE_MAPPER}
        complementaryObjects={complementaryObjects}
      >
        <FSMState fsmStateId={player?.current_state} />
      </FSMStateProvider>
    </Fragment>
  );
};

export default CourtPage;
