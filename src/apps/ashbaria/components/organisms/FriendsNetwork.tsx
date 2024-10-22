import React, { Fragment, useEffect } from 'react';
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
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import heartIcon from "../../assets/Heart Angle.svg";
import buttons from "../../assets/Buttons.svg";
import profile2Users from "../../assets/profile-2user.svg";
import verify from "../../assets/verify.svg";
import copyIcon from "../../assets/copy.svg";
import bg from "../../assets/friendsNetworkBg.svg";
import sendIcon from "../../assets/sms.svg";

const App = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("Fixed Text Value");
  };

  const records = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    // text: Record ${index + 1},
    //score: Math.floor(Math.random() * 100),
  }));


  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Paper
          sx={{
            maxWidth: "md",
            width: "100%",
            minHeight: "475px",
            height: "auto",
            display: 'flex',
            flexDirection: 'column',
            margin: "0px",
            padding: 0,
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
              justifyContent: "space-evenly",
              width: "100%",
              margin: "0px"
            }}
          >
            {/* Right Component */}
            <Grid
              item
              xs={11}
              sm={5}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                height: "auto",
                borderRadius: "12px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "36px",
                  marginTop: "10px"
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24.92px",
                    width: "100%",
                  }}
                >
                  کد دوستاتو بزن!
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    flexDirection: "row",
                    height: "36px",
                    borderRadius: "20px",
                    backgroundColor: "#0000004D",
                    border: "2px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "8px",
                      marginRight: "5px",
                      marginTop: "5px",
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
                      width="40px"
                      height="40px"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "8px",
                      marginLeft: "5px",
                      marginTop: "5px",
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
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  margin: "15px",
                  textAlign: "right",
                  direction: "rtl"
                }}
                style={{
                  direction: "rtl",
                  textAlign: "right"
                }}
              >
                اگه از دوستات کد معرف گرفتی، بزنش اینجا. هر کدی 10 تا اعتبار می‌ارزه
              </Typography>
              <TextField
                variant="outlined"
                placeholder="کد ۱۰ رقمی"
                sx={{
                  margin: "10px",
                  '& .MuiOutlinedInput-root': {
                    height: "44px",
                    minWidth: "255px",
                    width: "100%",
                  }
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "44px",
                  width: "101px",
                  left: {
                    xs: "32%",
                    sm: "27%"
                  },
                  margin: "15px",
                  borderRadius: "100px",
                  backgroundClip: "padding-box",
                  position: "relative",
                  overflow: "hidden",
                  background: "linear-gradient(to right, #FE9C42, #E25100)",
                }}
              >
                <Button
                  sx={{
                    width: "99px",
                    height: "42px",
                    minWidth: "80px",
                    borderRadius: "100px",
                    padding: "0px",
                    border: "1px",
                    backgroundColor: "#130e15",
                    backgroundClip: "padding-box",
                    color: "#FE9C42",
                    '&: hover': {
                      background: "linear-gradient(180deg, #FE9C42, #E25100)",
                      color: "black"
                    }
                  }}
                >
                  ثبتش کن
                </Button>
              </Box>
            </Grid>

            {/* Left Component */}
            <Grid
              item
              xs={11}
              sm={5}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                height: "auto",
                borderRadius: "12px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                marginTop: {
                  xs: "15px",
                  sm: "0px"
                }
              }}
            >
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "36px",
                  marginTop: "10px"
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
                  }}
                >
                  به دوستات کد بده!
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    flexDirection: "row",
                    height: "36px",
                    borderRadius: "20px",
                    backgroundColor: "#0000004D",
                    border: "2px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "8px",
                      marginRight: "5px",
                      marginTop: "5px",
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
                      width="40px"
                      height="40px"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "8px",
                      marginLeft: "5px",
                      marginTop: "5px",
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
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "right",
                  margin: "15px"
                }}
                style={{
                  direction: "rtl",
                  textAlign: "right"
                }}
              >
                هر کسی کد اختصاصی تو رو بزنه، هم اون اعتبار میگیره هم تو!
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "12px",
                  margin: "10px",
                  minWidth: "255px",
                  height: "44px"
                }}
              >
                <Typography
                  sx={{
                    width: "172px",
                    heigh: "24px",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "23.86px",
                    textAlign: "right",
                    marginLeft: "5px"
                  }}
                  style={{
                    direction: "rtl",
                    textAlign: "right"
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "44px",
                  width: "257px",
                  margin: "15px",
                  borderRadius: "100px",
                  backgroundClip: "padding-box",
                  position: "relative",
                  overflow: "hidden",
                  background: "linear-gradient(to right, #FE9C42, #E25100)",
                }}
              >
                <Button
                  sx={{
                    height: "42px",
                    width: "255px",
                    gap: "4px",
                    borderRadius: "100px",
                    backgroundColor: "#130e15",
                    backgroundClip: "padding-box",
                    color: "#FE9C42",
                    fill: "#FE9C42",
                    '&: hover': {
                      background: "linear-gradient(180deg, #FE9C42, #E25100)",
                      color: "black"
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={sendIcon}
                    width="20px"
                    height="20px"
                    color="rgba(255, 168, 0, 1)"
                  />
                  ارسال دعوت‌نامه
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Records Section */}
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24.92px",
              textAlign: "left",
              margin: "20px"
            }}
          >
            ماموریت‌های کدزنی
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: "10px",
              overflowX: "auto",
            }}
          >
            {records.map(record => (
              <Box
                key={record.id}
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                  heigh: "110px",
                  minWidth: "80px",
                  borderRadius: "12px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  flexShrink: 0
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    color: "rgba(255, 168, 0, 1)",
                    fontSize: "22px",
                    fontWeight: 800,
                    lineHeight: "36.27px",
                    textAlign: "center",
                  }}
                >
                  {record.id}
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "23.86px",
                    textAlign: "center"
                  }}
                >
                  {"ثبت موفق"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "8px",
                    marginRight: "5px",
                    marginTop: "5px",
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
                    180
                  </Typography>
                  <Box
                    component="img"
                    src={verify}
                    width="40px"
                    height="40px"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default App;