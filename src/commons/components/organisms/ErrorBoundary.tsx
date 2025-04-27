import React, { PropsWithChildren } from 'react';
import * as Sentry from "@sentry/react";
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import ConnectionProblemIcon from '../atoms/icons/connectionError.jpg';
import errorImg from "../atoms/icons/errorImg2.png";

type ErrorBoundaryProps = PropsWithChildren<{}>;
type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error | null;
  isNetworkError: boolean;
  isGlobalError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      isNetworkError: false,
      isGlobalError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error
    };
  }

  componentDidMount() {
    window.onerror = (message, source, lineno, colno, error) => {
      this.setState({
        hasError: true,
        error,
        isGlobalError: true,
      });
      Sentry.captureException(error);
      return true;
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
    const FONT_COLOR = '#3b4573';
    const RELOAD_BUTTON_BORDER_COLOR = '#9fa9cf';
    const FONT_FAMILY = 'IRANYekan';

    if (hasError) {
      return (
        <Container
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { sm: "row", xs: "column" },
            gap: { xs: 1, md: 2 },
          }}
        >
          <Box
            component="img"
            src={isNetworkError ? ConnectionProblemIcon : errorImg}
            width={{ xs: 240, sm: 280, md: 420 }}
          />
          <Stack direction={'column'} spacing={{ xs: 2, md: 3 }}>
            <Typography
              textAlign={'start'}
              fontWeight={400}
              fontSize={{ xs: 24, md: 32 }}
              color={FONT_COLOR}
              fontFamily={FONT_FAMILY}
            >
              {isNetworkError ?
                "اتصال شبکه قطع شده!" :
                "یه مشکلی پیش اومده!"
              }
            </Typography>
            <Typography
              textAlign={'start'}
              fontWeight={400}
              fontSize={{ xs: 12, md: 16 }}
              color={FONT_COLOR}
              fontFamily={FONT_FAMILY}
            >
              {this.state.error?.message || 'خطای ناشناخته'}
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={{ xs: 12, md: 16 }}
              color={FONT_COLOR}
              fontFamily={FONT_FAMILY}
            >
              {isNetworkError ?
                "لطفا بعد از بررسی وضعیت اتصال شبکه، صفحه رو از اول بارگذاری کن" :
                "لطفا صفحه رو از اول بارگذاری کن"
              }
            </Typography>
            <Button
              onClick={() => window.location.reload()}
              endIcon={<SyncIcon sx={{ pr: 1 }} />}
              variant='outlined'
              sx={{
                fontFamily: FONT_FAMILY,
                borderColor: RELOAD_BUTTON_BORDER_COLOR,
                color: FONT_COLOR,
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