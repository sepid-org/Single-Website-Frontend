import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import '@xyflow/react/dist/style.css';
import { MarkerType } from '@xyflow/react';
import { ReactFlow, Controls, Background, applyNodeChanges, ReactFlowProvider, useReactFlow, reconnectEdge } from '@xyflow/react';
import StateNodeEditMode from 'commons/components/molecules/FSMMap/StateNodeEditMode';
import { FloatingConnectionLine, FloatingCustomEdge } from 'commons/components/molecules/FSMMap/FloatingEdge';
import { useGetFSMEdgesQuery, useGetFSMQuery, useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useParams } from 'react-router-dom';
import { FSMEdgeType, FSMStateType } from 'commons/types/models';
import { useUpdatePositionsMutation } from 'apps/website-display/redux/features/object/ObjectSlice';
import { useCreateFSMEdgeMutation, useDeleteFSMEdgeMutation } from 'apps/fsm/redux/slices/fsm/EdgeSlice';

const FSM_MAP_WIDTH = 600;
const FSM_MAP_HEIGHT = 600;

// Helper function to convert backend type to graph rendering type
const convertFSMStateToGraphNode = (fsmState: FSMStateType, isFirstNode) => ({
	...fsmState,
	id: fsmState.id.toString(),
	position: fsmState.position,
	type: "stateNode",
	draggable: true,
	dragHandle: '.custom-drag-handle',
	data: {
		label: fsmState.title,
		isFirstNode,
	}
});

// Helper function to convert graph type back to backend type
const convertFSMEdgeToGraphEdge = (backendEdge, nodes) => ({
	...backendEdge,
	id: backendEdge.id.toString(),
	source: backendEdge.head.toString(),
	target: backendEdge.tail.toString(),
	type: 'floating',
	markerEnd: {
		type: MarkerType.ArrowClosed,
		color: 'black',
	},
	markerStart: (backendEdge.is_back_enabled ? {
		type: (MarkerType.ArrowClosed),
		orient: 'auto-start-reverse',
		color: "black"
	} : null),
	sourceHandle: "top-source",
	targetHandle: "top-target",
	//reconnectable: "source"
});

const convertGraphEdgeToFSMEdgeType = (graphEdge) => ({
	tail: graphEdge.target,
	head: graphEdge.source,
	is_visible: true,
	is_back_enabled: false
});

const CourseMapEditor = () => {
	const [createFSMEdge] = useCreateFSMEdgeMutation();
	//const [updateFSMEdge] = useUpdateFSMEdgeMutation();
	const [deleteFSMEdge] = useDeleteFSMEdgeMutation();
	const { fsmId } = useParams();
	const { data: initialFsmStates = [], isSuccess: isGetFSMStateSuccess } = useGetFSMStatesQuery({ fsmId });
	const { data: fsm } = useGetFSMQuery({ fsmId });
	const firstState = initialFsmStates.find(fsmState => fsmState.id === fsm?.first_state);
	const [fsmStates, setFSMStates] = useState<Partial<FSMStateType>[]>([]);
	const { data: initialFsmEdges } = useGetFSMEdgesQuery({ fsmId });
	const [fsmEdges, setFSMEdges] = useState<Partial<FSMEdgeType>[]>([]);
	const [updatePositions, { isSuccess: isUpdatePositionsSuccess }] = useUpdatePositionsMutation();

	useEffect(() => {
		if (isGetFSMStateSuccess) {
			setFSMStates(initialFsmStates.map((state) => convertFSMStateToGraphNode(state, false)));
		}
	}, [initialFsmStates]);

	useEffect(() => {
		if (firstState) {
			setFSMStates(fsmStates => [
				...fsmStates.filter((state) => state.id != firstState.id),
				convertFSMStateToGraphNode(firstState, true),
			])
		}
	}, [firstState])

	useEffect(() => {
		if (initialFsmEdges && fsmStates && fsmStates.length > 0) {
			const graphEdges = initialFsmEdges.map((edge) => convertFSMEdgeToGraphEdge(edge, fsmStates));
			setFSMEdges(graphEdges);
		}
	}, [initialFsmEdges, fsmStates])

	console.log(fsmStates)

	return (
		<Box
			sx={{
				width: "100%",
				height: FSM_MAP_HEIGHT,
			}}
		>
			<FlowCanva
				nodes={fsmStates}
				setNodes={setFSMStates}
				edges={fsmEdges}
				setEdges={setFSMEdges}
				updatePositions={updatePositions}
				createFSMEdge={createFSMEdge}
				deleteFSMEdge={deleteFSMEdge}
			/>
		</Box>
	);
}

function FlowCanva({
	nodes,
	setNodes,
	edges,
	setEdges,
	updatePositions,
	createFSMEdge,
	deleteFSMEdge,
}) {
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
			createFSMEdge(convertGraphEdgeToFSMEdgeType(connection));
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
			position: {
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

	const onReconnect = useCallback(
		(oldEdge, newConnection) => {
			setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
		},
		[],
	);

	// console.log("NNNNNNNNNNNNN", nodes)

	return (
		<ReactFlow
			ref={containerRef}
			nodes={nodes}
			edges={edges}
			nodeTypes={{ stateNode: StateNodeEditMode }}
			edgeTypes={{ floating: FloatingCustomEdge }}
			onNodesChange={onNodesChange}
			onConnect={onConnect}
			onNodeDragStop={onNodeDragStop}
			onNodeDragStart={onNodeDragStart}
			connectionLineComponent={FloatingConnectionLine}
			onReconnect={onReconnect}
			fitView
		>
			<Background />
			<Controls />
		</ReactFlow >
	);
}

export default function CourseMapEditorProvider() {
	return (
		<ReactFlowProvider>
			<CourseMapEditor />
		</ReactFlowProvider>
	);
}