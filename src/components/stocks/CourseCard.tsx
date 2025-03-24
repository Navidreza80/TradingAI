"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types/education';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="relative h-40">
        {!imageError ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <span className="text-green-600 dark:text-green-300 text-2xl font-bold">
              {course.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 m-2 rounded">
          {course.level}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-black dark:text-white line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {course.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {course.duration}
            </span>
          </div>
          <Link
            href={`/learn/stocks/course/${course.id}`}
            className="text-green-600 dark:text-green-400 text-sm font-medium hover:underline"
          >
            Start Learning →
          </Link>
        </div>
      </div>
    </div>
  );
}