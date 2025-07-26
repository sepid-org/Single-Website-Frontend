import React, { FC, Fragment } from 'react';
import { Box, Button } from '@mui/material';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from '../..';
import ButtonWidgetEditor from './edit';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import useSubmitButton from 'commons/hooks/useSubmitButton';

const wave = keyframes`
  0%   { box-shadow: 0 0 0 0   rgba(0,0,0,0.3); }
  100% { box-shadow: 0 0 0 20px rgba(0,0,0,0); }
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
  const navigate = useNavigate();

  const [submitButton, { isLoading }] = useSubmitButton();

  const handleClick = async () => {
    if (mode === WidgetModes.Edit || mode === WidgetModes.Disable || isLoading) return;

    try {
      await submitButton({ clickedButtonId: widgetId });

      if (destination_page_url) {
        const urlObj = new URL(destination_page_url, window.location.origin);
        if (urlObj.origin === window.location.origin) {
          navigate(`${urlObj.pathname}${urlObj.search}${urlObj.hash}`);
        } else {
          window.location.href = destination_page_url;
        }
      }
    } catch (err) {
    }
  };

  return (
    <Fragment>
      <Box
        sx={{
          position: 'relative',
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
              borderRadius: 1,
              zIndex: 0,
            }}
          />
        )}

        <Button
          onClick={handleClick}
          disableRipple={!has_ripple_on_click}
          disabled={isLoading}
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            p: 0,
            backgroundColor: background_image ? 'transparent' : undefined,
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
              justifyContent: 'center',
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