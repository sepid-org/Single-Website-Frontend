import React, { useCallback, useEffect, useState } from "react";
import { ReactFlow, ReactFlowProvider, Controls, NodeProps, useEdgesState, addEdge, useNodesState, Handle, Position, useViewport, useReactFlow } from "@xyflow/react";
import { MarkerType } from '@xyflow/react';
import { CourseViewMapNodeInfo } from "commons/types/global";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import '@xyflow/react/dist/style.css';
import { FloatingCustomEdge, FloatingConnectionLine } from "commons/components/molecules/FSMMap/FloatingEdge";
import { useParams } from "react-router-dom";
import { useGetFSMEdgesQuery, useGetFSMQuery, useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { FSMEdgeType, FSMStateType } from 'commons/types/models';
import { useGetPlayerTransitedPathQuery } from "apps/website-display/redux/features/roadmap/RoadmapSlice";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';



const _convertToGraphNodeType = (backendState, currentState) => ({
	...backendState,
	id: backendState.id.toString(),
	position: backendState.position,
	type: "customNode",
	draggable: true,
	dragHandle: '.custom-drag-handle',
	data: {
		label: backendState.title,
        isCurrentState: (currentState === backendState.title ? true : false)
	}
});

const _convertToGraphEdgeType = (backendEdge) => ({
	...backendEdge,
	id: backendEdge.id.toString(),
	source: backendEdge.head.toString(),
	target: backendEdge.tail.toString(),
	type: 'floating',
	markerEnd: {
		type: MarkerType.ArrowClosed,
		color: 'black',
	},
	markerStart: {
		type: (backendEdge.is_back_enabled ? MarkerType.ArrowClosed : "none") ,
		orient: 'auto-start-reverse',
		color: "black"
	},
	sourceHandle: "top-source",
	targetHandle: "top-target",
});

const _findCurrentNode = (nodes, currentNodeTitel) => {
    return nodes.filter((node) => {return node.title === currentNodeTitel})[0];
}

function FlowCanvas({fsmStates, fsmEdges, currentState}){
    const { fitView } = useReactFlow();
    useEffect(() => {
		if (currentState != null) {
            console.log(currentState);
            fitView({
                nodes: [currentState],
            });
        }
	}, [currentState]);

    return(
        <>
            <ReactFlow 
                edgeTypes={{floating: FloatingCustomEdge}} 
                nodeTypes={{customNode: CustomNode}}
                nodes={fsmStates} 
                edges={fsmEdges}              
            />
            <IconButton 
                onClick={() => {
                    fitView({
                        nodes: [currentState],
                    });
                }}
                sx={{
                    transform: "translateY(-120%)"
                }}
            >
                <GpsFixedIcon />
            </IconButton>
        </>
    );
}

//useGetPlayerTransitedPathQuery
export default function CourseMapViewMode({currentStateTitle}){
    const { fsmId } = useParams();
    const { data: fsm } = useGetFSMQuery({ fsmId });
    const { data: initialFsmStates } = useGetFSMStatesQuery({ fsmId });
	const [fsmStates, setFsmStates] = useState<Partial<FSMStateType>[]>([]);
    const { data: initialFsmEdges } = useGetFSMEdgesQuery({ fsmId });
	const [fsmEdges, setFSMEdges] = useState<Partial<FSMEdgeType>[]>([]);
    const [currentState, setCurrentState] = useState(null);

    useEffect(() => {
		if (initialFsmStates && initialFsmStates.length > 0) {
			const graphStates = initialFsmStates.map((state) => { return _convertToGraphNodeType(state, currentStateTitle) });
			setFsmStates(graphStates);
            setCurrentState(_findCurrentNode(graphStates, currentStateTitle));
        }
	}, [initialFsmStates]);

    useEffect(() => {
		if (initialFsmEdges && fsmStates && fsmStates.length > 0) {
			const graphEdges = initialFsmEdges.map((edge) => { return _convertToGraphEdgeType(edge) });
			setFSMEdges(graphEdges);
		}
	}, [initialFsmEdges, fsmStates])
    
    return(
        <Container
            sx={{ 
                height: 200,
            }}
        >
            <ReactFlowProvider>
                <FlowCanvas fsmStates={fsmStates} fsmEdges={fsmEdges} currentState={currentState}/>
            </ReactFlowProvider>
        </Container>
    );
}


interface stateNodeProps extends NodeProps{
    data: {
        label: string,
        isFirstNode: boolean,
        isCurrentState: boolean
    },
    id:string
}
const CustomNode: React.FC<stateNodeProps> = ({data, id}) => {
    return(
        <Box
            sx={{
                //backgroundColor: data.positionInMap === "currentNode"? "#55AD9B": (data.positionInMap === "seen"? "#ace3c7": "#C7C8CC"),
                //border: data.positionInMap === "currentNode"? "4px dashed #aa5264":  data.isFirstNode? "3px solid #531c38": "0px",
                borderRadius: "5px",
                width: "100px",
                height: "50px",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: (data.isCurrentState ? "green": "gray")
            }}
            id={id}
        >
            <Typography
                sx={{
					width: "90px",
					flexShrink: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					zIndex: "1"
				}}
				style={{
					direction: "rtl",
					textAlign: "right"
				}}
            >
                {data.label}
            </Typography>
            <Handle type="source" position={Position.Top} style={{opacity: "0"}} id="top-source"/>
            <Handle type="target" position={Position.Top} style={{opacity: "0"}} id="top-target"/>
         </Box>
    );
}
