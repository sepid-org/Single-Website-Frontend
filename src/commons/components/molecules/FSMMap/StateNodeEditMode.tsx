import React, { useState } from 'react';
import '@xyflow/react/dist/style.css';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { Box, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import FullScreenDialog from 'commons/components/atoms/FullScreenDialog';
import FSMStateEditor from 'commons/template/FSMStateEditor';

interface stateNodeProps extends NodeProps {
	data: {
		label: string,
		isFirstNode: boolean
	},
	id: string
}

const StateNodeEditMode: React.FC<stateNodeProps> = ({ data, id }) => {


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
				position: "relative"
			}}
			id={id}
		>
			<Box
				sx={{
					position: "absolute",
					top: "0px",
					transform: "translateY(-50%)",
					zIndex: "3",
					width: "60px",
					height: "20px",
					backgroundColor: "#752b34",
					borderRadius: "5px",
					opacity: "0.8"
				}}
				className="custom-drag-handle"
			/>
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={true}
				id="top-target"
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					opacity: "0",
					zIndex: "2"
				}}
			/>
			<Typography
				sx={{
					width: "120px",
					flexShrink: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					pointerEvents: "auto",
					zIndex: "1"
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
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					opacity: "0",
					zIndex: "2"
				}}
			/>
			<FullScreenDialog
				fullWidth={true}
				maxWidth={false}
				open={stateNodeIsSelected}
				onClose={() => setStateNodeIsSelected(false)}
			>
				{stateNodeIsSelected &&
					<FSMStateEditor fsmStateId={id} />
				}
			</FullScreenDialog>
		</Box>
	);
}

export default StateNodeEditMode;