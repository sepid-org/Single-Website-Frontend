import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import { useParams } from "react-router-dom";
import { useGetDocumentsQuery } from "../redux/slices/GameLogics";
import { DocumentType } from "../types";

type DocumentOutputType = DocumentType & { is_active: boolean }

const useGetDocuments = (): DocumentOutputType[] => {
  const { programSlug, fsmId } = useParams();
  const { data: programUserFSMsStatus = [] } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { data: documents = [] } = useGetDocumentsQuery()

  return (
    documents.map(document => ({
      ...document,
      is_active:
        document.fsm == fsmId ||
        Boolean(programUserFSMsStatus.find(
          status => status.is_finished && document.fsm === status.fsm_id
        )),
    }))
  )
};

export default useGetDocuments;
