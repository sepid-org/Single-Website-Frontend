import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import { useParams } from "react-router-dom";
import { useGetCourtsQuery } from "../redux/slices/GameLogics";
import { AshbariaDocumentType, ClassifiedDocumentsType } from "../types";
import { UserFSMStatusType } from "commons/types/models";
import { useGetResourcesByTypeQuery } from "commons/redux/apis/cms/resource/Resource";
import { ASHBARIA_DOCUMENT_TYPE } from "../constants/game-info";

const useDocuments = (): ClassifiedDocumentsType => {
  const { programSlug } = useParams();
  const { data: programUserFSMsStatus = [] } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { data: documents = [] } = useGetResourcesByTypeQuery<{ data: AshbariaDocumentType[] }>({ type: ASHBARIA_DOCUMENT_TYPE })
  const { data: courts = [] } = useGetCourtsQuery();

  const getCourtDocuments = (fsmId: number) => {
    return documents.filter(document => document.content['fsm_id'] === fsmId);
  };

  const isCourtEnabled = (userFSMStatus: UserFSMStatusType) => {
    return userFSMStatus?.is_enabled_for_user || userFSMStatus?.finished_players_count > 0;
  };

  const classifiedDocuments: ClassifiedDocumentsType = courts.reduce((acc, court) => {
    const userFSMStatus = programUserFSMsStatus.find(status => court.corresponding_fsm === status.fsm_id);
    acc[court.corresponding_fsm] = {
      courtName: court.title,
      enabled: isCourtEnabled(userFSMStatus),
      documents: getCourtDocuments(userFSMStatus?.fsm_id)
    };
    return acc;
  }, {} as ClassifiedDocumentsType);

  return classifiedDocuments;
};

export default useDocuments;
