import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
      <div className="relative w-20 h-20 flex justify-center items-center">
        <div className="absolute w-full h-full border-4 border-t-transparent border-purple-500 dark:border-indigo-400 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Loading...</p>
    </div>
  );
};

export default LoadingPage;