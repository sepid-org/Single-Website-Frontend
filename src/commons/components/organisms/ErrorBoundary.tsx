import React, { PropsWithChildren } from 'react';

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
    // Log error details if needed
    console.error('Error caught in boundary:', error, errorInfo);
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
