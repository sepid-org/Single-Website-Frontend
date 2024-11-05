import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function SingleScoreRecordSkeleton(){
    return(
        <Box marginBottom="10px" sx={{display:"flex", flexDirection:"row"}}>
            <Skeleton variant="rounded" width="50px" height="60px" />
            <Skeleton variant="rounded" height="50px" sx={{width: {xs: "200px", md: "600px"}}}/>
        </Box>
    );
}