import React from "react";

class ErrorBoundary extends React.Component {
  state: { hasError: boolean } = { hasError: false };
  props: { children: React.ReactNode } = { children: null };
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    console.error(error)
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>in issue occurred while rendering the barcode</div>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;