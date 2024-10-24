import React, { Fragment } from 'react';
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
import profile2Users from "../../assets/profile-2user.svg";
import verify from "../../assets/verify.svg";
import copyIcon from "../../assets/copy.svg";
import bg from "../../assets/friendsNetworkBg.svg";
import sendIcon from "../../assets/sms.svg";
import BackButton from '../molecules/buttons/Back';
import HeartIcon from '../atoms/icons/Heart';
import ExclamationIcon from '../atoms/icons/Exclamation';
import VerifyIcon from '../atoms/icons/Verify';
import TwoPeopleIcon from '../atoms/icons/TwoPeople';
import FriendsNetworkPoints from '../molecules/FriedndsNetworkPoint';
import CustomOutlinedButton from '../molecules/buttons/CustomOutlinedButton';

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
        <Container maxWidth='lg' component={Paper}>

          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            <BackButton />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HeartIcon />
              <Typography variant="h6" color="white" sx={{ ml: 1 }}>حلقه دوستان</Typography>
            </Box>
            <IconButton color="inherit">
              <ExclamationIcon />
            </IconButton>
          </Box>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              margin: 0
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
                borderRadius: 2,
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
                  height: 36,
                  marginTop: 1,
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  sx={{
                    width: "100%",
                  }}
                >
                  کد دوستاتو بزن!
                </Typography>
                <FriendsNetworkPoints points={129} numberOfFriends={12} />
              </Container>
              <Typography
              fontSize={16}
              fontWeight={400}
                sx={{
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
                    height: 44,
                    minWidth: 255,
                    width: "100%",
                  }
                }}
              />
              <CustomOutlinedButton buttonText='ثبتش کن' handleClick={() => {}} minWidth={80} fullWidth={false} />
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
                borderRadius: 2,
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
                  height: 36,
                  marginTop: 1,
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  sx={{
                    width: "100%",
                  }}
                >
                  به دوستات کد بده!
                </Typography>
                <FriendsNetworkPoints numberOfFriends={1} points={9} />
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
        </Container >
      </Box>
    </Fragment>
  );
};

export default App;