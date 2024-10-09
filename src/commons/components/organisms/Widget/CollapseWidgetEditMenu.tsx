import React, { useState } from 'react';
import { IconButton, Stack, Collapse, Paper } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import WidgetEditMenu from './WidgetEditMenu';


const CollapseWidgetEditMenu = ({
  widget,
  paperId,
  fsmStateId,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}>
      <Collapse dir='ltr' orientation="horizontal" in={expanded} collapsedSize={34}>
        <Stack
          component={Paper}
          borderRadius={0}
          width={'auto'}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <IconButton size='small' onClick={handleToggle}>
            {expanded ? <CloseIcon /> : <MoreVertIcon />}
          </IconButton>
          <WidgetEditMenu fsmStateId={fsmStateId} widget={widget} paperId={paperId} />
        </Stack>
      </Collapse>
    </div>
  );
};

export default CollapseWidgetEditMenu;
