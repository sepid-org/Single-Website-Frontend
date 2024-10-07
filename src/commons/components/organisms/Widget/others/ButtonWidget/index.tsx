import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import TinyPreview from 'commons/components/organisms/TinyMCE/ReactTiny/Preview';

const ButtonWidget = ({
  label,
  background_image,
  destination_page_url,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (destination_page_url) {
      navigate(destination_page_url);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Button
        disableRipple
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
          backgroundRepeat: 'no-repeat', // Prevents image repetition
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
  );
};

export default ButtonWidget;
