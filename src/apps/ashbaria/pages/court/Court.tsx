import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {
  useGetMyPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import WIDGET_REGISTRY, { WidgetRegistryType } from 'commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import useAshbariaCustomWidgets from '../../hooks/useAshbariaCustomWidgets';
import FSMState from 'apps/fsm/template/FSMState';


type CourtPagePropsType = {}

const CourtPage: FC<CourtPagePropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data: player } = useGetMyPlayerQuery({ fsmId });
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { complementaryObjects } = useAshbariaCustomWidgets();

  const CUSTOM_WIDGET_REGISTRY: WidgetRegistryType = {
    ...WIDGET_REGISTRY,
    MultiChoiceProblem: {
      ...WIDGET_REGISTRY['MultiChoiceProblem'],
      WidgetComponent: WIDGET_REGISTRY['MultiChoiceProblem'].WidgetComponent,
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
        widgetRegistry={CUSTOM_WIDGET_REGISTRY}
        complementaryObjects={complementaryObjects}
      >
        <FSMState fsmStateId={player?.current_state} />
      </FSMStateProvider>
    </Fragment>
  );
};

export default CourtPage;
