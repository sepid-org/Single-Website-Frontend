import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import backgroundImg from "../../assets/profileBackground.svg"
import HintsTemplate from "../../template/Hints";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import CourtDocuments from "apps/ashbaria/components/organisms/document/CourtDocuments";
import useDocuments from "apps/ashbaria/hooks/useDocuments";
import DocumentsArchive from "apps/ashbaria/components/organisms/document/DocumentsArchive";


const CourtInfo = () => {
  const fsmId = parseInt(useParams().fsmId);
  const [searchParams] = useSearchParams();
  const dialogSlug = searchParams.get('dialog');
  const classifiedDocuments = useDocuments();

  return (
    <FullScreenBackgroundImage image={backgroundImg}>
      {
        dialogSlug === 'hints' && <HintsTemplate />
      }
      {
        dialogSlug === 'documents-archive' && <DocumentsArchive documents={classifiedDocuments} />
      }
      {
        dialogSlug === 'court-documents' && <CourtDocuments documents={classifiedDocuments?.[fsmId]?.documents} />
      }
    </FullScreenBackgroundImage>
  )
}

export default CourtInfo;