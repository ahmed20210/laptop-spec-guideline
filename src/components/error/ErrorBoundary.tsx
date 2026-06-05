import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-red-700 dark:text-red-300">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {this.state.error?.message || "An unexpected error occurred."}
              </p>
              <button
                type="button"
                className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
