"use client"
// React built in hooks
import React, { useEffect, useState } from 'react';
// Next built in components
import Head from 'next/head';
import Link from 'next/link';

export default function NotFoundPage() {
  // State to move SVG eye and mouth
  const [eyeOffset, setEyeOffset] = useState(0);
  const [mouthOffset, setMouthOffset] = useState(0);

  // useEffect to move SVG elements
  useEffect(() => {
    const interval = setInterval(() => {
      setEyeOffset(Math.random() * 2 - 1);
      setMouthOffset(Math.random() * 2 - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="relative z-10 mb-4">
          <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx={`${9 + eyeOffset}`} cy="10" r="1"></circle>
            <circle cx={`${15 + eyeOffset}`} cy="10" r="1"></circle>
            <path d={`M8 16c1.5-2 4.5-${2 + mouthOffset} 6 0`}></path>
          </svg>
        </div>
        <div className="text-center relative z-10">
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 dark:from-indigo-400 dark:to-blue-400 drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]">
            404
          </h1>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4 drop-shadow-[0_3px_8px_rgba(0,0,0,0.3)]">
            Page Not Found
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
            {`The page you're looking for doesn't exist.`}
          </p>
          <div className="mt-8">
            <Link href="/" className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-indigo-400 dark:to-blue-400 text-white font-semibold px-6 py-3 rounded-full hover:shadow-2xl transition-all duration-300 shadow-lg">
              Go Home
            </Link>
          </div>
        </div>
        <div className="mt-16 text-center relative z-10">
          <p className="text-sm text-gray-500 dark:text-gray-600 drop-shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
            If you believe this is an error, please contact us.
          </p>
        </div>
      </div>
    </>
  );
};
