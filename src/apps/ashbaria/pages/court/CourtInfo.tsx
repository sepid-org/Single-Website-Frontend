import React, { Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import backgroundImg from "../../assets/profileBackground.svg"
import DocumentsTemplate from "../../template/Documents";
import HintsTemplate from "../../template/Hints";
import useLocalNavigate from "../../hooks/useLocalNavigate";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import Document from "apps/ashbaria/components/organisms/document/Document";


const CourtInfo = () => {
  const fsmId = parseInt(useParams().fsmId);
  const localNavigate = useLocalNavigate();
  const [searchParams] = useSearchParams();
  const dialogSlug = searchParams.get('dialog');

  const backToCourt = () => {
    localNavigate(`/court/${fsmId}/`);
  }

  return (
    <FullScreenBackgroundImage image={backgroundImg}>
      {
        dialogSlug === 'hints' && <HintsTemplate onClose={backToCourt} />
      }
      {
        dialogSlug === 'documents' && <DocumentsTemplate />
      }
      {
        dialogSlug === 'document' && <Document />
      }
    </FullScreenBackgroundImage>
  )
}

export default CourtInfo;