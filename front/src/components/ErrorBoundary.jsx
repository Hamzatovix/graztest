import React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

/**
 * ErrorBoundary component - Catches JavaScript errors anywhere in the child component tree
 * Features: Error logging, fallback UI, recovery options
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console and potentially to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Here you could send error to error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <motion.div
              className="text-6xl mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Package size={48} className="text-gray-400" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Упс! Что-то пошло не так
            </h2>
            
            <p className="text-gray-600 mb-6">
              Мы сожалеем, но произошла неожиданная ошибка. 
              Наша команда уже работает над её исправлением.
            </p>

            <div className="space-y-3">
              <motion.button
                onClick={this.handleRetry}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Попробовать снова
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '/'}
                className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Вернуться на главную
              </motion.button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Техническая информация (только в режиме разработки)
                </summary>
                <pre className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
