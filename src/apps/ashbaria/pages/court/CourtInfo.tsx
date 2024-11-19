import React from "react";
import { useSearchParams } from "react-router-dom";
import HintsTemplate from "../../template/Hints";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import CourtDocuments from "apps/ashbaria/components/organisms/document/CourtDocuments";
import DocumentsArchive from "apps/ashbaria/components/organisms/document/DocumentsArchive";
import CourtChelos from "apps/ashbaria/components/organisms/document/CourtChelos";
import { ImageUrls } from "apps/ashbaria/constants/imageUrls";


const CourtInfo = () => {
  const [searchParams] = useSearchParams();
  const dialogSlug = searchParams.get('dialog');

  return (
    <FullScreenBackgroundImage image={ImageUrls.WALL}>
      {
        dialogSlug === 'hints' && <HintsTemplate />
      }
      {
        dialogSlug === 'documents-archive' && <DocumentsArchive />
      }
      {
        dialogSlug === 'court-chelos' && <CourtChelos />
      }
      {
        dialogSlug === 'court-documents' && <CourtDocuments />
      }
    </FullScreenBackgroundImage>
  )
}

export default CourtInfo;