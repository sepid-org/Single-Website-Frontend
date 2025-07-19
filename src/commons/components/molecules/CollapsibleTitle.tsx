import React, { FC, Fragment, ReactNode, useState } from 'react';
import { Button, Collapse, IconButton, Paper, Stack, Typography } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

type CollapsibleTitlePropsType = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleTitle: FC<CollapsibleTitlePropsType> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Stack component={Paper} padding={2}>
      <Typography variant='h4'>
        <Button
          sx={{ padding: 0 }}
          startIcon={<ArrowDropDownCircleIcon sx={{ transform: open ? 'rotate(-180deg)' : null }} />}
          onClick={() => setOpen(open => !open)}
          disableRipple
        >
          <Typography>
            {title}
          </Typography>
        </Button>
      </Typography>
      <Collapse in={open}>
        <Stack paddingY={1}>
          {children}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default CollapsibleTitle;
