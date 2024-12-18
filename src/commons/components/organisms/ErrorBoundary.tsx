import React, { PropsWithChildren } from 'react';
import * as Sentry from "@sentry/react";

type ErrorBoundaryProps = PropsWithChildren<{}>;
type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Report error to Sentry
    Sentry.withScope((scope) => {
      // Attach additional context information if needed
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key as keyof React.ErrorInfo]);
      });

      // Capture the error with Sentry
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <h1>یه مشکلی پیش اومد! صفحه رو مجدداً بارگذاری کن</h1>;
    }

    // Ensure TypeScript knows that `children` is part of props
    return this.props.children;
  }
}

export default ErrorBoundary;