import React, { FC, Fragment, ReactNode, useState } from 'react';
import { Button, Collapse, IconButton, Typography } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

type CollapsibleTitlePropsType = {
  title: string;
  children: ReactNode;
}

const CollapsibleTitle: FC<CollapsibleTitlePropsType> = ({
  title,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
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
      <Collapse in={open} sx={{ paddingBottom: 1 }}>
        {children}
      </Collapse>
    </Fragment>
  );
};

export default CollapsibleTitle;
