import React, { useState } from 'react';
import '@xyflow/react/dist/style.css';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { Box, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import FullScreenDialog from 'commons/components/atoms/FullScreenDialog';
import StateEditor from 'commons/template/StateEditor';

interface stateNodeProps extends NodeProps {
	data: {
		label: string,
		isFirstNode: boolean
	},
	id: string
}

const StateNodeEditMode: React.FC<stateNodeProps> = ({ data, id }) => {
	const [isDrawing, setIsDrawing] = useState(false);
	const [startPos, setStartPos] = useState(null);
	const [currentPos, setCurrentPos] = useState(null);
	const { setEdges, getNodes, getEdges, setNodes } = useReactFlow();

	const handleMouseDown = (event) => {
		setIsDrawing(true);
		setStartPos({ x: event.clientX, y: event.clientY });
	};
	const handleMouseMove = (event) => {
		if (isDrawing) {
			setCurrentPos({ x: event.clientX, y: event.clientY });
		}
	};

	const handleMouseUp = (event) => {
		if (isDrawing) {
			setIsDrawing(false);
			const nodes = getNodes();
			const targetNode = findTargetNode(event.clientX, event.clientY, nodes);

			if (targetNode) {
				const newEdge = {
					id: `edge-${id}-${targetNode.id}-${Math.random()}`,
					source: id,
					target: targetNode.id,
					sourceX: startPos.x,
					sourceY: startPos.y,
					targetX: event.clientX,
					targetY: event.clientY,
					type: "floating"
				};

				setEdges([...getEdges(), newEdge]);
			}
		}
	};
	const findTargetNode = (mouseX, mouseY, nodes) => {
		const boundingBox = document.getElementById('reactflow-wrapper').getBoundingClientRect();
		const flowX = mouseX - boundingBox.left;
		const flowY = mouseY - boundingBox.top;

		return nodes.find((node) => {
			const { positionAbsolute, width, height } = node;
			return (
				flowX >= positionAbsolute.x &&
				flowX <= positionAbsolute.x + width &&
				flowY >= positionAbsolute.y &&
				flowY <= positionAbsolute.y + height
			);
		});
	};

	const [stateNodeIsSelected, setStateNodeIsSelected] = useState(false);

	return (
		<Box
			sx={{
				backgroundColor: data.isFirstNode ? "#96EFFF" : "#C5FFF8",
				border: data.isFirstNode ? "3px solid #ffb496" : "0px",
				borderRadius: "5px",
				width: "200px",
				height: "50px",
				display: "flex",
				flexDirection: "row-reverse",
				alignItems: "center",
				justifyContent: "space-around",
			}}
			id={id}
		//onMouseDown={handleMouseDown}
		//onMouseMove={handleMouseMove}
		//onMouseUp={handleMouseUp}
		>
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={true}
				id="top-target"
			/>
			<Handle
				type="target"
				position={Position.Bottom}
				isConnectable={true}
				id="bottom-target"
			/>
			<Handle
				type="target"
				position={Position.Right}
				isConnectable={true}
				id="right-target"
			/>
			<Handle
				type="target"
				position={Position.Left}
				isConnectable={true}
				id="left-target"
			/>
			<Typography
				sx={{
					width: "120px",
					flexShrink: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
				style={{
					direction: "rtl",
					textAlign: "right"
				}}
			>
				{data.label}
			</Typography>
			<IconButton onClick={() => setStateNodeIsSelected(true)}>
				<SettingsIcon />
			</IconButton>
			<Handle
				type="source"
				position={Position.Top}
				isConnectable={true}
				id="top-source"
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={true}
				id="bottom-source"
				onDrag={() => console.log("dragggggg")}
			/>
			<Handle
				type="source"
				position={Position.Right}
				isConnectable={true}
				id="right-source"
			/>
			<Handle
				type="source"
				position={Position.Left}
				isConnectable={true}
				id="left-source"
			/>
			<FullScreenDialog
				fullWidth={true}
				maxWidth={false}
				open={stateNodeIsSelected}
				onClose={() => setStateNodeIsSelected(false)}
			>
				{stateNodeIsSelected &&
					<StateEditor />
				}
			</FullScreenDialog>
		</Box>
	);
}

export default StateNodeEditMode;