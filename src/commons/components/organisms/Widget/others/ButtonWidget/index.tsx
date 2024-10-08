import React, { FC, Fragment, useState } from 'react';
import { Button, Box } from '@mui/material';
import TinyPreview from 'commons/components/organisms/TinyMCE/ReactTiny/Preview';
import ChangeStateDialog from 'commons/components/organisms/dialogs/ChangeStateDialog';
import useChangeState from 'commons/hooks/useChangeState';
import { WidgetModes } from '../..';
import { EdgeType } from 'commons/types/models';

type ButtonWidgetPropsType = {
  label;
  background_image;
  destination_page_url;
  edges_to_destination_states: EdgeType[];
  mode: WidgetModes;
}

const ButtonWidget: FC<ButtonWidgetPropsType> = ({
  label,
  background_image,
  destination_page_url,
  edges_to_destination_states = [],
  mode,
}) => {
  const [openChangeStateDialog, setOpenChangeStateDialog] = useState(false);
  const { changeState } = useChangeState();

  const handleClick = () => {
    if (mode === WidgetModes.Edit) {
      return;
    }
    if (edges_to_destination_states.length === 1) {
      changeState(edges_to_destination_states[0])
    }
    if (edges_to_destination_states.length > 1) {
      setOpenChangeStateDialog(true);
    }
    if (destination_page_url) {
      window.location.href = destination_page_url;
    }
  };

  return (
    <Fragment>
      <Box
        sx={{
          position: 'relative',
          minHeight: background_image ? 60 : 100,
          width: '100%',
          height: '100%',
        }}
      >
        <Button
          onClick={handleClick}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${background_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: 0,
            textTransform: 'none',
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <TinyPreview
            styles={{ width: '100%' }}
            content={label}
          />
        </Box>
      </Box>
      <ChangeStateDialog
        open={openChangeStateDialog}
        handleClose={() => setOpenChangeStateDialog(false)}
        edges={edges_to_destination_states || []}
      />
    </Fragment>
  );
};

export default ButtonWidget;
