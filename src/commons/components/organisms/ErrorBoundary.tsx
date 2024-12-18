import React, { PropsWithChildren } from 'react';
import * as Sentry from "@sentry/react";
import errorImg from "../atoms/icons/error1.png";
import { Box, Button, Container, Typography } from '@mui/material';
import ReloadIcon from '../atoms/icons/Reload';

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
            <Box
              component="img"
              src={errorImg}
            />
            <Typography fontWeight={30} fontSize={{md: 30, xs: 20}}>
              {"اینترنت شما قطع شده!"}
              <br />
              {this.state.error?.message || 'خطای ناشناخته'}
            </Typography>
            <br />
            <Button
              onClick={() => window.location.reload()}
              endIcon={<ReloadIcon />}
              variant='outlined'
              size='small'
            >
              {"لطفا اینترنت رو چک کنید و صفحه رو بارگذاری کنید."}
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
            flexDirection: "column"
          }}
        >
          <Box
            component="img"
            src={errorImg}
          />
          <Typography fontWeight={30} fontSize={{ xs: 20, md: 30 }} textAlign={"center"}>
            {"یه مشکلی پیش اومده!"}
            <br />
            {this.state.error?.message || 'خطای ناشناخته'}
          </Typography>
          <br />
          <Button
            onClick={() => window.location.reload()}
            endIcon={<ReloadIcon />}
            variant='outlined'
            size='small'
          >
            {"لطفا صفحه رو از اول بارگذاری کن."}
          </Button>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;