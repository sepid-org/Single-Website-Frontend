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
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					opacity: "0"
				}}
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
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					opacity: "0"
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