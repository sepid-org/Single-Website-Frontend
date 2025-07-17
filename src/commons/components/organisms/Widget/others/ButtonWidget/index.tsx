import React, { FC, Fragment } from 'react';
import { Box, Button } from '@mui/material';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from '../..';
import ButtonWidgetEditor from './edit';
import useChangeState from 'commons/hooks/fsm/useChangeState';
import useSubmitButton from 'commons/hooks/useSubmitButton';
import { keyframes } from '@emotion/react';

const wave = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
`;

type ButtonWidgetPropsType = {
  label: string;
  background_image: string;
  destination_page_url: string;
  mode: WidgetModes;
  id: string;
  has_ripple_on_click: boolean;
  has_wave_effect: boolean;
};

const ButtonWidget: FC<ButtonWidgetPropsType> = ({
  label,
  background_image,
  destination_page_url,
  has_ripple_on_click,
  has_wave_effect,
  mode,
  id: widgetId,
}) => {
  const [changeState] = useChangeState();
  const [submitButton] = useSubmitButton();

  const handleClick = () => {
    if (mode === WidgetModes.Edit || mode === WidgetModes.Disable) {
      return;
    }
    if (destination_page_url) {
      window.location.href = destination_page_url;
      return;
    }
    submitButton({
      clickedButtonId: widgetId,
    });
  };

  return (
    <Fragment>
      <Box
        sx={{
          position: 'relative',           // <-- make this relative
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          minHeight: background_image ? 40 : 60,
        }}
      >
        {background_image && (
          <Box
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
              borderRadius: 2,              // match your button’s border radius
              zIndex: 0,
            }}
          />
        )}

        <Button
          onClick={handleClick}
          disableRipple={!has_ripple_on_click}
          sx={{
            position: 'relative',         // sit above the bg‑Box
            width: '100%',
            height: '100%',
            padding: 0,
            backgroundColor: background_image ? 'transparent' : undefined,
            borderRadius: 2,
            overflow: 'hidden',
            animation: has_wave_effect ? `${wave} 2s infinite` : 'none',
          }}
        >
          <TinyPreview
            styles={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
            content={label}
          />
        </Button>
      </Box>
    </Fragment>
  );
};

export default ButtonWidget;
export { ButtonWidgetEditor };
