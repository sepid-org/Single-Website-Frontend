import React, { Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import backgroundImg from "../../assets/profileBackground.svg"
import DocumentsTemplate from "../../template/Documents";
import HintsTemplate from "../../template/Hints";
import useLocalNavigate from "../../hooks/useLocalNavigate";


const CourtInfo = () => {
  const { fsmId } = useParams();
  const localNavigate = useLocalNavigate();
  const [searchParams] = useSearchParams();
  const dialogSlug = searchParams.get('dialog');

  const backToCourt = () => {
    localNavigate(`/court/${fsmId}/`);
  }

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {
        dialogSlug === 'hints' && <HintsTemplate onClose={backToCourt} />
      }
      {
        dialogSlug === 'documents' && <DocumentsTemplate />
      }
    </Box>
  )
}

export default CourtInfo;