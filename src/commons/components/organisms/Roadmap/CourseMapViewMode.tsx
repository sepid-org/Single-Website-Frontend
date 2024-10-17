import React, { useCallback } from "react";
import { ReactFlow, ReactFlowProvider, Controls, NodeProps, useEdgesState, addEdge, useNodesState, Handle, Position } from "@xyflow/react";
import { MarkerType } from '@xyflow/react';
import { CourseViewMapNodeInfo } from "commons/types/global";
import { Box, Container, Typography } from "@mui/material";
import '@xyflow/react/dist/style.css';
import { FloatingCustomEdge, FloatingConnectionLine } from "commons/components/molecules/FSMMap/FloatingEdge";
import { Opacity } from "@mui/icons-material";


const edgeTypes = {floating: FloatingCustomEdge};

const sampleNodes: CourseViewMapNodeInfo[] = [
    {
        data: {label: "این استیت اوله", isFirstNode: true, positionInMap: "seen"},
        id: "1",
        position: {x: 100, y: 50},
        type: "customNode",
        draggable: false
    },
    {
        data: {label: "این یک استیت است", isFirstNode: false, positionInMap: "seen"},
        id: "2",
        position: {x: 550, y: 50},
        type: "customNode",
        draggable: false
    },
    {
        data: {label: " kjugilougpihiqoiejhf09q47rihاستیت رندوم", isFirstNode: false, positionInMap: "currentNode"},
        id: "3",
        position: {x: 500, y: 300},
        type: "customNode",
        draggable: false
    },
    {
        data: {label: "state4", isFirstNode: false, positionInMap: "notSeen"},
        id: "4",
        position: {x: 230, y: 300},
        type: "customNode",
        draggable: false
    },
    {
        data: {label: "state5", isFirstNode: false, positionInMap: "notSeen"},
        id: "5",
        position: {x: 0, y: 300},
        type: "customNode",
        draggable: false
    },
    {
        data: {label: "state6", isFirstNode: false, positionInMap: "notSeen"},
        id: "6",
        position: {x: 80, y: 500},
        type: "customNode",
        draggable: false,
    },
    {
        data: {label: "state7", isFirstNode: false, positionInMap: "notSeen"},
        id: "7",
        position: {x: 80, y: 700},
        type: "customNode",
        draggable: false
    },
];

const sampleEdges = [
    {id: "1-2", source: "1", target: "2", type: "floating", markerEnd: { type: MarkerType.Arrow, color: "black" }},
    {id: "2-3", source: "2", target: "3", type: "floating", markerEnd: { type: MarkerType.Arrow, color: "black" }},
    {id: "3-4", source: "3", target: "4", type: "floating", markerEnd: { type: MarkerType.Arrow, color: "black" }},
    {id: "4-5", source: "4", target: "5", type: "floating", markerEnd: { type: MarkerType.Arrow, color: "black" }},
    {id: "5-6", source: "5", target: "6", type: "floating", markerEnd: { type: MarkerType.Arrow, color: "black" }},
    {id: "6-7", source: "6", target: "7", type: "floating", markerEnd: { type: MarkerType.Arrow, color: "black" }}
]

export default function CourseMapViewMode(){
    return(
        <Container
            sx={{ 
                width: "100vw",
                height: "100vh",
            }}
            maxWidth={false}
        >
            <ReactFlowProvider>
                <ReactFlow 
                    edgeTypes={edgeTypes} 
                    nodeTypes={nodeTypes}
                    nodes={sampleNodes}
                    edges={sampleEdges}
                    //connectionLineComponent={FloatingConnectionLine}
                />
                <Controls />
            </ReactFlowProvider>
        </Container>
    );
}


interface stateNodeProps extends NodeProps{
    data: {
        label: string,
        isFirstNode: boolean,
        positionInMap: "currentNode" | "seen" | "notSeen"
    },
    id:string
}
const CustomNode: React.FC<stateNodeProps> = ({data, id}) => {
    return(
        <Box
            sx={{
                backgroundColor: data.positionInMap === "currentNode"? "#55AD9B": (data.positionInMap === "seen"? "#ace3c7": "#C7C8CC"),
                border: data.positionInMap === "currentNode"? "4px dashed #aa5264":  data.isFirstNode? "3px solid #531c38": "0px",
                borderRadius: "5px",
                width: "100px",
                height: "50px",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-around"
            }}
            id={id}
        >
            <Typography
                sx={{
                    width: "80px",
                    flexShrink: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
            >
                <Handle type="source" position={Position.Top} style={{opacity: "0"}}/>
                <Handle type="target" position={Position.Top} style={{opacity: "0"}}/>
                {data.label}
            </Typography>
        </Box>
    );
}

const nodeTypes = {customNode: CustomNode};