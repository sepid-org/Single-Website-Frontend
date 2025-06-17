import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {
  useGetCurrentUserPlayerQuery,
  useGetPlayerPerformanceQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import WIDGET_REGISTRY, { WidgetRegistryType } from 'commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import useGetCourtComplementaryWidgets from '../../hooks/useGetCourtComplementaryWidgets';
import FSMState from 'apps/fsm/template/FSMState';
import { useGetProgramUserFSMsStatusQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import CourtMultiChoiceQuestion from 'apps/ashbaria/components/organisms/CourtMultiChoiceQuestion';


type CourtPagePropsType = {}

const CourtPage: FC<CourtPagePropsType> = ({ }) => {
  const { programSlug } = useParams();
  const fsmId = parseInt(useParams().fsmId);
  const { data: player } = useGetCurrentUserPlayerQuery({ fsmId });
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const currentUserFSMStatus = userFSMsStatus?.find(status => status.fsm_id === fsmId);
  const { complementaryObjects } = useGetCourtComplementaryWidgets();

  useGetPlayerPerformanceQuery({ playerId: parseInt(player?.id) }, { skip: !Boolean(player?.id) });

  const CUSTOM_WIDGET_REGISTRY: WidgetRegistryType = {
    ...WIDGET_REGISTRY,
    MultiChoiceProblem: {
      ...WIDGET_REGISTRY['MultiChoiceProblem'],
      WidgetComponent: CourtMultiChoiceQuestion,
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
          isMentor={currentUserFSMStatus?.is_user_mentor}
          fsmStateId={player?.current_state}
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
