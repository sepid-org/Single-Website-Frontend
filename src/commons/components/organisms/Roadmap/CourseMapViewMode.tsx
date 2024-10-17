import React, { useCallback, useEffect, useState } from "react";
import { ReactFlow, ReactFlowProvider, Controls, NodeProps, useEdgesState, addEdge, useNodesState, Handle, Position } from "@xyflow/react";
import { MarkerType } from '@xyflow/react';
import { CourseViewMapNodeInfo } from "commons/types/global";
import { Box, Container, Typography } from "@mui/material";
import '@xyflow/react/dist/style.css';
import { FloatingCustomEdge, FloatingConnectionLine } from "commons/components/molecules/FSMMap/FloatingEdge";
import { useParams } from "react-router-dom";
import { useGetFSMQuery, useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { FSMEdgeType, FSMStateType } from 'commons/types/models';


const edgeTypes = {floating: FloatingCustomEdge};

const _convertToGraphNodeType = (backendState, firstState) => ({
	...backendState,
	id: backendState.id.toString(),
	position: backendState.position,
	type: "stateNode",
	draggable: true,
	dragHandle: '.custom-drag-handle',
	data: {
		label: backendState.title,
		isFirstNode: (backendState.id === firstState)
	}
});

 
export default function CourseMapViewMode(){
    const { fsmId } = useParams();
    const { data: fsm } = useGetFSMQuery({ fsmId });
    const firstState = fsm?.first_state;
    const { data: initialFsmStates } = useGetFSMStatesQuery({ fsmId });
	const [fsmStates, setFsmStates] = useState<Partial<FSMStateType>[]>([]);
    
    useEffect(() => {
		if (initialFsmStates && initialFsmStates.length > 0 && firstState) {
			const graphStates = initialFsmStates.map((state) => { return _convertToGraphNodeType(state, firstState) });
			setFsmStates(graphStates);
		}
	}, [initialFsmStates, firstState]);
    
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
                    nodes={fsmStates}
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