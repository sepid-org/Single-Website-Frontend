import React, { FC, Fragment, ReactNode, useState } from 'react';
import { Button, Collapse, IconButton, Stack, Typography } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

type CollapsibleTitlePropsType = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleTitle: FC<CollapsibleTitlePropsType> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Stack>
      <Typography variant='h4'>
        <Button
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
