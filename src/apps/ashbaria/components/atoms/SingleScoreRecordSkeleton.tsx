import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function SingleScoreRecordSkeleton(){
    return(
        <Box marginBottom="10px" sx={{display:"flex", flexDirection:"row"}}>
            <Skeleton variant="rounded" width="60px" height="60px" />
            <Skeleton variant="rounded" height="60px" sx={{width: {xs: "420px", md: "780px"}}}/>
        </Box>
    );
}