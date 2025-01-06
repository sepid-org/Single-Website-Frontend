import React, { FC, Fragment, useState, useEffect } from 'react';
import { Box, ButtonBase } from '@mui/material';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import ChangeStateDialog from 'commons/components/organisms/dialogs/ChangeStateDialog';
import { WidgetModes } from '../..';
import ButtonWidgetEditor from './edit';
import useChangeState from 'commons/hooks/fsm/useChangeState';
import useSubmitButton from 'commons/hooks/useSubmitButton';

// Utility function to extract path data from an SVG file (basic example)
const extractSvgPath = (svgUrl: string) => {
  return new Promise<string>((resolve, reject) => {
    fetch(svgUrl)
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const path = doc.querySelector('path');
        if (path) {
          resolve(path.getAttribute('d') || ''); // Extract path data
        } else {
          reject('No path found in SVG');
        }
      })
      .catch(reject);
  });
};

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
  ...objectFields
}) => {
  const [openChangeStateDialog, setOpenChangeStateDialog] = useState(false);
  const [changeState, changeStateResult] = useChangeState();
  const [submitButton, submitButtonResult] = useSubmitButton();
  const [clipPath, setClipPath] = useState<string>(''); // To hold the clip-path value

  // Extract SVG path on mount
  useEffect(() => {
    if (background_image.endsWith('.svg')) {
      extractSvgPath(background_image).then((pathData) => {
        if (pathData) {
          console.log(pathData)
          setClipPath(`path('${pathData}')`);
        }
      }).catch((error) => {
        console.error('Error loading SVG:', error);
      });
    }
  }, [background_image]);

  const handleClick = () => {
    if (mode === WidgetModes.Edit || mode === WidgetModes.Disable) {
      return;
    }
    if (destination_states.length === 1) {
      changeState({
        destinationStateId: destination_states[0],
        clickedButtonId: widgetId,
      });
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
          minHeight: background_image ? 400 : 600,
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
            clipPath: clipPath,
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
