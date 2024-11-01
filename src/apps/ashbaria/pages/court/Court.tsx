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
import { useGetProgramUserFSMsStatusQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import MultiChoiceQuestionWidget from 'apps/ashbaria/components/organisms/MultiChoiceQuestion';


type CourtPagePropsType = {}

const CourtPage: FC<CourtPagePropsType> = ({ }) => {
  const { programSlug } = useParams();
  const fsmId = parseInt(useParams().fsmId);
  const { data: player } = useGetMyPlayerQuery({ fsmId });
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { complementaryObjects } = useAshbariaCustomWidgets();

  const currentUserFSMStatus = userFSMsStatus?.find(status => status.fsm_id === fsmId);

  const CUSTOM_WIDGET_REGISTRY: WidgetRegistryType = {
    ...WIDGET_REGISTRY,
    MultiChoiceProblem: {
      ...WIDGET_REGISTRY['MultiChoiceProblem'],
      WidgetComponent: MultiChoiceQuestionWidget,
    },
  }

  return (
    <Fragment>
      {fsm &&
        <Helmet>
          <title>{fsm.name}</title>
        </Helmet>
      }
      <FSMProvider fsmId={fsmId}>
        <FSMStateProvider
          isMentor={currentUserFSMStatus?.is_mentor}
          fsmStateId={player?.current_state}
          playerId={player?.id}
          widgetRegistry={CUSTOM_WIDGET_REGISTRY}
          complementaryObjects={complementaryObjects}
        >
          <FSMState fsmStateId={player?.current_state} />
        </FSMStateProvider>
      </FSMProvider>
    </Fragment>
  );
};

export default CourtPage;
