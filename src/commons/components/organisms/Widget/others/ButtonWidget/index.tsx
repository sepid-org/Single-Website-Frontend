import React, { FC, Fragment, useState } from 'react';
import { Box, ButtonBase } from '@mui/material';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import ChangeStateDialog from 'commons/components/organisms/dialogs/ChangeStateDialog';
import { WidgetModes } from '../..';
import ButtonWidgetEditor from './edit';
import useChangeState from 'commons/hooks/fsm/useChangeState';
import useSubmitButton from 'commons/hooks/useSubmitButton';

type ButtonWidgetPropsType = {
  label: string;
  background_image: string;
  destination_page_url: string;
  destination_states: string[];
  mode: WidgetModes;
  id: string;
}

const ButtonWidget: FC<ButtonWidgetPropsType> = ({
  label,
  background_image,
  destination_page_url,
  destination_states = [],
  mode,
  id: widgetId,
  // todo: check lock, cost, etc:
  ...objectFields
}) => {
  const [openChangeStateDialog, setOpenChangeStateDialog] = useState(false);
  const [changeState, changeStateResult] = useChangeState();
  const [submitButton, submitButtonResult] = useSubmitButton();

  const handleClick = () => {
    if (mode === WidgetModes.Edit || mode === WidgetModes.Disable) {
      return;
    }
    if (destination_states.length === 1) {
      changeState({
        destinationStateId: destination_states[0],
        clickedButtonId: widgetId,
      })
      return;
    }
    if (destination_states.length > 1) {
      setOpenChangeStateDialog(true);
      return;
    }
    if (destination_page_url) {
      window.location.href = destination_page_url;
      return;
    }
    // If none of the above conditions were met, just submit the button:
    submitButton({
      clickedButtonId: widgetId,
    });
  };

  return (
    <Fragment>
      <Box
        sx={{
          position: 'relative',
          minHeight: background_image ? 40 : 60,
          width: '100%',
          height: '100%',
        }}
      >
        <ButtonBase
          onClick={handleClick}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 1,
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
        stateIds={destination_states}
        widgetId={widgetId}
      />
    </Fragment>
  );
};

export default ButtonWidget;
export { ButtonWidgetEditor };
