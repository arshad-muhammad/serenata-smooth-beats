
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );
};

export default LoadingSpinner;
