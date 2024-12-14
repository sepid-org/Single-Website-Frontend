import React, { Component } from 'react';

interface State {
  hasError: boolean;
}

interface Props {
  children: React.ReactNode;  // Declare children prop type
}

class AsyncErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // You can log the error or send it to an error reporting service here
    console.error("Caught error:", error);
    console.error("Error info:", info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>{"یه مشکلی پیش اومد! صفحه رو مجدداً بارگذاری کن"}</h1>;
    }
    return this.props.children;
  }
}

export default AsyncErrorBoundary;

