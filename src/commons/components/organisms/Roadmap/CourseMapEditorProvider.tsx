import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button, Container, Grid } from '@mui/material';
import '@xyflow/react/dist/style.css';
import { MarkerType } from '@xyflow/react';
import { ReactFlow, Controls, Background, applyNodeChanges, addEdge, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { CourseMapNodeInfo } from 'commons/types/global';
import StateNodeEditMode from 'commons/components/molecules/FSMMap/StateNodeEditMode';
import { FloatingConnectionLine, FloatingCustomEdge } from 'commons/components/molecules/FSMMap/FloatingEdge';
import { useGetFSMEdgesQuery, useGetFSMQuery, useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useParams } from 'react-router-dom';
import CreateStateButton from 'commons/components/atoms/CreateStateButton';
import { EdgeType, FSMStateType } from 'commons/types/models';
import { useUpdatePositionsMutation } from 'apps/website-display/redux/features/object/ObjectSlice';
import { useCreateFSMEdgeMutation, useDeleteFSMEdgeMutation, useUpdateFSMEdgeMutation } from 'apps/fsm/redux/slices/fsm/EdgeSlice';


const FSM_STATE_WIDTH = 200;
const FSM_STATE_HEIGHT = 50;
const FSM_MAP_WIDTH = 600;
const FSM_MAP_HEIGHT = 800;


const _getRandomPosition = () => ({
	x: Math.floor(Math.random() * FSM_MAP_HEIGHT),
	y: Math.floor(Math.random() * FSM_MAP_WIDTH),
	width: FSM_STATE_WIDTH,
	height: FSM_STATE_HEIGHT,
});

// Helper function to convert backend type to graph rendering type
const _convertToGraphNodeType = (backendState, firstState) => ({
	...backendState,
	id: backendState.id.toString(),
	position: backendState.position || _getRandomPosition(),
	type: "stateNode",
	draggable: true,
	data: {
		label: backendState.title,
		isFirstNode: (backendState.id === firstState)
	}
});

// Helper function to convert graph type back to backend type
const _convertToBackendStateType = (graphState) => ({
	...graphState,
	id: parseInt(graphState.id),
	title: graphState.data.label,
	position: graphState.position,
	// Preserve other backend properties
});

const _convertToGraphEdgeType = (backendEdge, nodes) => ({
	...backendEdge,
	id: backendEdge.id.toString(),
	source: backendEdge.head.id.toString(),
	target: backendEdge.tail.id.toString(),
	type: 'floating',
	markerEnd: { type: MarkerType.Arrow, color: "black" },
	sourceHandle: "top-source",
	targetHandle: "top-target",
});

const _convertToBackendEdgeType = (graphEdge, nodes) => ({
	attributes: [],
	created_at: Date.now(), 
	head: parseInt(graphEdge.source),
	id: graphEdge.id,
	is_back_enabled: true,
	is_hidden: false,
	is_private: true,
	is_visible: true,
	name: null,
	order: 0,
	position: null,
	tail: parseInt(graphEdge.target),
	text: null,
	title: "Edge-" + graphEdge.id,
	updated_at: Date.now(),
	website: null
});

function CourseMapEditor() {
	const [createFSMEdge] = useCreateFSMEdgeMutation();
    //const [updateFSMEdge] = useUpdateFSMEdgeMutation();
	const [deleteFSMEdge] = useDeleteFSMEdgeMutation();
	const { fsmId } = useParams();
	const { data: initialFsmStates } = useGetFSMStatesQuery({ fsmId });
	const [fsmStates, setFsmStates] = useState<Partial<FSMStateType>[]>([]);
	const { data: initialFsmEdges } = useGetFSMEdgesQuery({ fsmId });
	const [fsmEdges, setFSMEdges] = useState<Partial<EdgeType>[]>([]);
	const { data: fsm } = useGetFSMQuery({ fsmId });
	const firstState = fsm?.first_state;
	const [updatePositions, { isSuccess: isUpdatePositionsSuccess }] = useUpdatePositionsMutation();

	useEffect(() => {
		if (initialFsmStates && initialFsmStates.length > 0 && firstState) {
			const graphStates = initialFsmStates.map((state) => { return _convertToGraphNodeType(state, firstState) });
			setFsmStates(graphStates);
		}
	}, [initialFsmStates, firstState]);

	useEffect(() => {
		if (initialFsmEdges && fsmStates && fsmStates.length > 0) {
			const graphEdges = initialFsmEdges.map((edge) => { return _convertToGraphEdgeType(edge, fsmStates) });
			setFSMEdges(graphEdges);
		}
		console.log(initialFsmEdges);
	}, [initialFsmEdges, fsmStates])

	return (
		<Container
			sx={{
				width: "100%",
				height: FSM_MAP_HEIGHT,
			}}
			maxWidth={false}
		>
			<FlowCanva 
				nodes={fsmStates} 
				setNodes={setFsmStates} 
				edges={fsmEdges} 
				setEdges={setFSMEdges} 
				updatePositions={updatePositions} 
				createFSMEdge={createFSMEdge} 
				deleteFSMEdge={deleteFSMEdge}
			/>
			<Grid
				container
				spacing={2}
				justifyContent="space-between"
				alignItems="center"
				flexDirection={"row-reverse"}
			>
				<Grid item xs={3}>
					<CreateStateButton />
				</Grid>
				<Grid item xs={3}>
					<Button
						sx={{ width: "100%" }}
						variant="contained"
					>
						ذخیره
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}

function FlowCanva({ nodes, setNodes, edges, setEdges, updatePositions, createFSMEdge, deleteFSMEdge }) {

	const { fitView } = useReactFlow();
	const containerRef = useRef(null);
	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				fitView();
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [fitView]);

	fitView();

	const onNodesChange = (changes) => {
		setNodes(applyNodeChanges(changes, nodes));
	}

	const onConnect = useCallback(
		((connection) => {
			const doubleEdge = edges.filter((edge) => {
				return (edge.source === connection.source && edge.target === connection.target) || (edge.source === connection.target && edge.target === connection.source);
			});
			if (doubleEdge.length > 0) {
				return;
			}
			const newEdge = { ...connection, type: 'floating', markerEnd: { type: MarkerType.Arrow, color: "black" } };
			setEdges((eds) => addEdge(newEdge, eds));
			createFSMEdge(_convertToBackendEdgeType(newEdge,nodes));
		}),
		[edges, setEdges],
	);

	const isOverlapping = (node1, node2) => {
		const node1element = document.getElementById(node1.id);
		const node2element = document.getElementById(node2.id);
		return (
			node1.position.x < node2.position.x + node2element.offsetWidth &&
			node1.position.x + node1element.offsetWidth > node2.position.x &&
			node1.position.y < node2.position.y + node2element.offsetHeight &&
			node1.position.y + node1element.offsetHeight > node2.position.y
		);
	};
	const avoidOverlap = (newNode, nodes) => {
		newNode.position.x = Math.floor(newNode.position.x);
		newNode.position.y = Math.floor(newNode.position.y);
		let adjustedNode = { 
			...newNode,
			position:{
				...(dragStartPosition.current as any),
				...newNode.position,
			}
		};

		for (const node of nodes) {
			if (node.id != newNode.id && isOverlapping(newNode, node)) {
				adjustedNode.position = dragStartPosition.current;
			}
		}
		return adjustedNode;
	};
	const onNodeDragStop = useCallback(
		(event, node) => {
			const newNodes = nodes.map((n) => (n.id === node.id ? avoidOverlap(node, nodes) : n));
			setNodes(newNodes);
			updatePositions({
				positions: [newNodes.filter(n => n.id === node.id)[0].position]
			});
		},
		[nodes]
	);

	const dragStartPosition = useRef(0);
	const onNodeDragStart = useCallback((event, node) => {
		dragStartPosition.current = node.position;
	}, []);

	const onEdgeContextMenu = (event, edge) => {
		event.preventDefault();
		if (window.confirm('آیا می‌خواهید یال را خذف کنید؟')) {
			setEdges((eds) => eds.filter((e) => e.id !== edge.id));
			deleteFSMEdge({ fsmEdgeId: edge.id });
		}
	};

	return (
		<Container
			sx={{ height: "90%", width: "100%" }}
			maxWidth={false}
			ref={containerRef}
		>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={{ stateNode: StateNodeEditMode }}
				edgeTypes={{ floating: FloatingCustomEdge }}
				onNodesChange={onNodesChange}
				onConnect={onConnect}
				onNodeDragStop={onNodeDragStop}
				onNodeDragStart={onNodeDragStart}
				onEdgeContextMenu={onEdgeContextMenu}
				connectionLineComponent={FloatingConnectionLine}
			>
				<Background />
				<Controls />
			</ReactFlow>
		</Container>
	);
}

export default function CourseMapEditorProvider() {
	return (
		<ReactFlowProvider>
			<CourseMapEditor />
		</ReactFlowProvider>
	);
}