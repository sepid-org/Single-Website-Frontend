import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button, Container, Grid } from '@mui/material';
import '@xyflow/react/dist/style.css';
import { MarkerType } from '@xyflow/react';
import { ReactFlow, Controls, Background, applyNodeChanges, addEdge, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { CourseMapNodeInfo } from 'commons/types/global';
import StateNodeEditMode from 'commons/components/molecules/FSMMap/StateNodeEditMode';
import { FloatingConnectionLine, FloatingCustomEdge } from 'commons/components/molecules/FSMMap/FloatingEdge';
import { useGetFSMEdgesQuery, useGetFSMStatesQuery } from 'apps/website-display/redux/features/fsm/FSMSlice';
import { useParams } from 'react-router-dom';
import CreateStateButton from 'commons/components/atoms/CreateStateButton';
import { EdgeType, FSMStateType } from 'commons/types/models';

const sampleNodes: CourseMapNodeInfo[] = [
	{
		data: { label: "این استیت اوله", isFirstNode: true, },
		id: "1",
		position: { x: 0, y: 0 },
		type: "stateNode",
		draggable: true
	},
	{
		data: { label: "این یک استیت است", isFirstNode: false, },
		id: "2",
		position: { x: 300, y: 0 },
		type: "stateNode",
		draggable: true
	},
	{
		data: { label: "استیت رندوم", isFirstNode: false, },
		id: "3",
		position: { x: 500, y: 0 },
		type: "stateNode",
		draggable: true
	}
];

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
const _convertToGraphNodeType = (backendState) => ({
	...backendState,
	id: backendState.id.toString(),
	position: backendState.position || _getRandomPosition(),
	type: "stateNode",
	draggable: true,
	data: {
		label: backendState.title,
		isFirstNode: backendState.order === 0, // Assuming the first state has order 0
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

function CourseMapEditor() {
	const { fsmId } = useParams();
	const { data: initialFsmStates } = useGetFSMStatesQuery({ fsmId });
	const [fsmStates, setFsmStates] = useState<Partial<FSMStateType>[]>([]);
	const { data: initialFsmEdges } = useGetFSMEdgesQuery({ fsmId });
	const [fsmEdges, setFSMEdges] = useState<Partial<EdgeType>[]>(initialFsmEdges);

	useEffect(() => {
		if (initialFsmStates) {
			const graphStates = initialFsmStates.map(_convertToGraphNodeType);
			setFsmStates(graphStates);
		}
	}, [initialFsmStates]);

	const updateFsmStates = (newStates) => {
		const backendStates = newStates?.map(_convertToBackendStateType);
		setFsmStates(backendStates);
	}

	return (
		<Container
			sx={{
				width: "100%",
				height: FSM_MAP_HEIGHT,
			}}
			maxWidth={false}
		>
			<FlowCanva nodes={fsmStates} setNodes={updateFsmStates} edges={[]} setEdges={setFSMEdges} />
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

function FlowCanva({ nodes, setNodes, edges, setEdges }) {

	const onNodesChange = (changes) => setNodes(applyNodeChanges(changes, nodes))

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
		let adjustedNode = { ...newNode };

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
		}
	};


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