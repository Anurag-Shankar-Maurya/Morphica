import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700/50 text-red-700 dark:text-red-300 rounded-xl shadow-md animate-fadeIn" role="alert">
      <div className="flex items-center">
        <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
        <span>{error}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;