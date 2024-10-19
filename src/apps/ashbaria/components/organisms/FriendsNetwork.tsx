import React from 'react';
import {
  Box,
  Container,
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { CopyAll } from '@mui/icons-material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import heartIcon from "../../assets/Heart Angle.svg";
import buttons from "../../assets/Buttons.svg";

const App = () => {
  const handleCopy = () => {
    // Logic to copy text to clipboard
    navigator.clipboard.writeText("Fixed Text Value");
  };

  const records = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    // text: Record ${index + 1},
    //score: Math.floor(Math.random() * 100),
  }));

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh"
      }}
    >
      <Container
        sx={{
          width: "700px",
          height: "475px",
          display: 'flex',
          flexDirection: 'column',
          background: "linear-gradient(180deg, rgba(72, 67, 105, 0.9) 0%, rgba(9, 5, 23, 0.891)) 100%",
          borderRadius: "20px"
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <IconButton sx={{color:"#FFA800"}}>
            <ArrowRightAltIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={heartIcon}
              width="24px"
              height="24px"
            />
            <Typography variant="h6" color="white" sx={{ ml: 1 }}>حلقه دوستان</Typography>
          </Box>
          <IconButton color="inherit">
            <Box
              component="img"
              src={buttons}
              width="40px"
              height="28px"
            />
          </IconButton>
        </Box>

        {/* Main Content */}
        <Grid 
          container 
          sx={{
            width: "668px",
            height: "224px",
            gap: "16px",
          }}
        >
          {/* Right Component */}
          <Grid 
            item 
            xs={6}
            container 
            spacing={2}
            sx={{
              width: "326px",
              height: "224px",
              borderRadius: "12px"
            }}  
          >
            <Paper sx={{ padding: 2, bgcolor: '#2a2a2a' }}>
              <Typography variant="h6" color="white">Right Component Title</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton color="inherit">👍</IconButton>
                  <Typography color="white">Score 1</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <IconButton color="inherit">👎</IconButton>
                  <Typography color="white">Score 2</Typography>
                </Box>
              </Box>
              <Typography color="white">Some descriptive text below.</Typography>
              <TextField fullWidth variant="outlined" placeholder="Type here..." sx={{ mt: 1 }} />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>Submit</Button>
            </Paper>
          </Grid>

          {/* Left Component */}
          <Grid 
            item 
            xs={6}
            container 
            spacing={2}
            sx={{
              width: "326px",
              height: "224px",
              borderRadius: "12px"
            }}    
          >
            <Paper sx={{ padding: 2, bgcolor: '#2a2a2a' }}>
              <Typography variant="h6" color="white">Left Component Title</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton color="inherit">👍</IconButton>
                  <Typography color="white">Score A</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <IconButton color="inherit">👎</IconButton>
                  <Typography color="white">Score B</Typography>
                </Box>
              </Box>
              <Typography color="white">Some descriptive text below.</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <IconButton onClick={handleCopy} color="inherit">
                  <CopyAll />
                </IconButton>
                <TextField
                  fullWidth
                  variant="outlined"
                  value="Fixed Text Value"
                  InputProps={{ readOnly: true }}
                  sx={{ ml: 1 }}
                />
              </Box>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Full Width Button</Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Records Section */}

      </Container>
    </Container>
  );
};

export default App;