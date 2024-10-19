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
import { CopyAll, Gradient } from '@mui/icons-material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import heartIcon from "../../assets/Heart Angle.svg";
import buttons from "../../assets/Buttons.svg";
import profile2Users from "../../assets/profile-2user.svg";
import verify from "../../assets/verify.svg";
import copyIcon from "../../assets/copy.svg";

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
          <IconButton sx={{ color: "#FFA800" }}>
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
            display: "flex",
            justifyContent: "space-between",
            width: "668px",
            height: "224px",
            gap: "16px",
          }}
        >
          {/* Right Component */}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "326px",
              height: "224px",
              borderRadius: "12px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "310px",
                height: "36px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24.92px",
                  width: "185px",
                }}
                style={{
                  direction: "rtl",
                  textAlign: "right",
                  //text align is not working
                }}
              >
                کد دوستاتو بزن!
              </Typography>
              <Box //go to left
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: "row",
                  width: "125px",
                  height: "36px",
                  borderRadius: "20px",
                  backgroundColor: "#0000004D",
                  padding: "4px 8px 4px 12px",
                  gap: "8px",
                  border: "2px",
                }}
              >
                <Box //align items to center
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 800,
                      lineHeight: "26.38px",
                      textAlign: "right"
                    }}
                  >
                    12
                  </Typography>
                  <Box
                    component="img"
                    src={verify}
                    width="34px"
                    height="34px"
                  />
                </Box>
                <Box //align items to center
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 800,
                      lineHeight: "26.38px",
                      textAlign: "right"
                    }}
                  >
                    2
                  </Typography>
                  <Box
                    component="img"
                    src={profile2Users}
                    width="28px"
                    height="28px"
                  />
                </Box>
              </Box>
            </Container>
            <Typography
              sx={{ //text align is still set to left
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                textAlign: "right",
                marginTop: "10px",
              }}
            >اگه از دوستات کد معرف گرفتی، بزنش اینجا. هر کدی 10 تا اعتبار می‌ارزه</Typography>
            <TextField 
              variant="outlined" 
              placeholder="کد ۱۰ رقمی" 
              sx={{
                width: "310px",
                height: "44px",
                marginTop: "10px"
              }} 
            />
            <Button //layout problem
              sx={{ 
                marginTop: "10px",
                width: "99px",
                height: "42px",
                minWidth: "80px",
                borderRadius: "100px",
                padding: "0px",
                border: "1px"
              }}>ثبتش کن</Button>
          </Grid>

          {/* Left Component */}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "326px",
              height: "224px",
              borderRadius: "12px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "310px",
                height: "36px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24.92px",
                  width: "185px",
                }}
                style={{
                  direction: "rtl",
                  textAlign: "right",
                  //text align is not working
                }}
              >
                به دوستات کد بده!
              </Typography>
              <Box //go to left
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: "row",
                  width: "125px",
                  height: "36px",
                  borderRadius: "20px",
                  backgroundColor: "#0000004D",
                  padding: "4px 8px 4px 12px",
                  gap: "8px",
                  border: "2px",
                }}
              >
                <Box //align items to center
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 800,
                      lineHeight: "26.38px",
                      textAlign: "right"
                    }}
                  >
                    12
                  </Typography>
                  <Box
                    component="img"
                    src={verify}
                    width="34px"
                    height="34px"
                  />
                </Box>
                <Box //align items to center
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 800,
                      lineHeight: "26.38px",
                      textAlign: "right"
                    }}
                  >
                    2
                  </Typography>
                  <Box
                    component="img"
                    src={profile2Users}
                    width="28px"
                    height="28px"
                  />
                </Box>
              </Box>
            </Container>
            <Typography
              sx={{//text align is still set to left
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                textAlign: "right",
                marginTop: "10px",
              }}
            >هر کسی کد اختصاصی تو رو بزنه، هم اون اعتبار میگیره هم تو!</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "12px",
                marginTop: "10px",
                width: "310px",
                height: "44px"
              }}
            >
              <Typography //text is still at left
                sx={{
                  width: "172px",
                  heigh: "24px",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "23.86px",
                  textAlign: "right",
                }}
              >
                کد اختصاصی تو
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography>101001</Typography>
                <IconButton onClick={handleCopy} color="inherit">
                  <Box
                    component="img"
                    src={copyIcon}
                  />
                </IconButton>
              </Box>
            </Box>
            <Button sx={{ mt: 2 }}>Submit</Button>
          </Grid>
        </Grid>

        {/* Records Section */}

      </Container>
    </Container>
  );
};

export default App;