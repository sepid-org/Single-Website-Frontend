import React, { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import backgroundImg from "../assets/profileBackground.svg"
import DocumentsTemplate from "../template/Documents";


const Court = () => {
  const [searchParams] = useSearchParams();
  const dialogSlug = searchParams.get('dialog');

  return (
    <Fragment>
      <Box
        sx={{
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
          dialogSlug === 'documents' && <DocumentsTemplate />
        }
      </Box>
    </Fragment>
  )
}

export default Court;