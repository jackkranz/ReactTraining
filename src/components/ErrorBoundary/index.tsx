import React from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any): State {
    console.log(error);
    return { hasError: true };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h2>Something went wrong</h2>;
    }
    return this.props.children;
  }

  componentDidCatch(error: any, info: any): void {
    console.log(error);
    console.log(info);
  }
}

export default ErrorBoundary;
