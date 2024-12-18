import React, { PropsWithChildren } from 'react';
import * as Sentry from "@sentry/react";

type ErrorBoundaryProps = PropsWithChildren<{}>;
type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error | null;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render shows the fallback UI
    return {
      hasError: true,
      error
    };
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
      // Render fallback UI with error message
      return (
        <div className="error-fallback">
          <h1>مشکلی رخ داده است!</h1>
          <p className="error-message">
            {this.state.error?.message || 'خطای ناشناخته'}
          </p>
          <div className="error-actions">
            <button onClick={() => window.location.reload()}>
              بارگذاری مجدد
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;