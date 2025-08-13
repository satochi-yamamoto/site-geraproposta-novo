import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin ${sizeClasses[size]}`}
      />
    </div>
  );
};

export default LoadingSpinner;