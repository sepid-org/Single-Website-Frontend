import { Grid } from "@mui/material";
import React from "react";
import Documents from "../components/organisms/document/Documents";
import useDocuments from "../hooks/useDocuments";

const DocumentsTemplate = () => {
  const { documents } = useDocuments();

  return (
    <Documents documents={[]} />
  )
}

export default DocumentsTemplate;