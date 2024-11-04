import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import { useParams } from "react-router-dom";
import { useGetDocumentsQuery } from "../redux/slices/GameLogics";
import { DocumentType } from "../types";

type useDocumentOutputType = {
  documents: (DocumentType & { is_active: boolean })[]
}

const useDocuments = (): useDocumentOutputType => {
  const { programSlug, fsmId } = useParams();
  const { data: programUserFSMsStatus = [] } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { data: documents = [] } = useGetDocumentsQuery()

  return ({
    documents: documents.map(document => ({
      ...document,
      is_active:
        document.fsm == fsmId ||
        Boolean(programUserFSMsStatus.find(
          status => status.count_of_playing > 0 && document.fsm === status.fsm_id.toString(),
        )),
    }))
  })
};

export default useDocuments;
