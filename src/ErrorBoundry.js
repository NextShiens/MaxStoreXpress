import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
          <div className="text-center p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-3xl font-bold mb-4 text-red-600">
              Oops! Something went wrong.
            </h1>
            <p className="text-lg text-gray-500">
              We're working on it! Please try again later.
            </p>
            <button onClick={this.handleReload} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;