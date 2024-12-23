import React, { PropsWithChildren } from 'react';
import * as Sentry from "@sentry/react";
import errorImg from "../atoms/icons/errorImg2.png";
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import ConnectionProblemIcon from '../atoms/icons/ConnectionProblem';

type ErrorBoundaryProps = PropsWithChildren<{}>;
type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error | null;
  isNetworkError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      isNetworkError: false
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (error.message && (error.message.includes('NetworkError') || !navigator.onLine)) {
      this.setState({ isNetworkError: true });
    }

    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key as keyof React.ErrorInfo]);
      });

      Sentry.captureException(error);
    });
  }

  render() {
    const { hasError, isNetworkError } = this.state;

    if (hasError) {
      if (isNetworkError) {
        return (
          <Container
            sx={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <ConnectionProblemIcon />
            <Typography fontWeight={30} fontSize={{ md: 30, xs: 20 }} textAlign={"center"}>
              {"اینترنت شما قطع شده!"}
              <br />
              {this.state.error?.message || 'خطای ناشناخته'}
            </Typography>
            <br />
            <Button
              onClick={() => window.location.reload()}
              endIcon={<SyncIcon />}
              variant='outlined'
              size='small'
            >
              {"لطفا صفحه رو از اول بارگذاری کن."}
            </Button>
          </Container>
        );
      }

      return (
        <Container
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Box
            component="img"
            src={errorImg}
            width={400}
            height={400}
          />
          <Stack
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
            spacing={3}
          >
            <Typography fontWeight={30} fontSize={{ xs: 20, md: 30 }} color={"#3b4573"}>
              {"یه مشکلی پیش اومده!"}
            </Typography>
            <Typography fontWeight={30} fontSize={{ xs: 10, md: 15 }} color={"#3b4573"}>
              {this.state.error?.message || 'خطای ناشناخته'}
            </Typography>
            <Typography fontWeight={30} fontSize={{ xs: 10, md: 15 }} color={"#3b4573"}>
              {"لطفا صفحه رو از اول بارگذاری کن."}
            </Typography>
            <Button
              onClick={() => window.location.reload()}
              endIcon={<SyncIcon />}
              variant='outlined'
              size='small'
              sx={{
                alignSelf: "end",
                borderColor: "#9fa9cf",
                color: "#3b4573",
              }}
            >
              {"بارگذاری مجدد"}
            </Button>
          </Stack>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;