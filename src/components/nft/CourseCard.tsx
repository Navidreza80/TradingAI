"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EducationalContent } from '@/types/educational';

interface CourseCardProps {
  course: EducationalContent;
}

export function CourseCard({ course }: CourseCardProps) {
  const [imageError, setImageError] = React.useState(false);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-40 w-full">
        {course.image && !imageError ? (
          <Image 
            src={course.image} 
            alt={course.title} 
            fill 
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <span className="text-purple-600 dark:text-purple-300 text-xl font-bold">
              {course.title.substring(0, 2)}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center">
            <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
              {course.level}
            </div>
            {course.duration && (
              <div className="ml-2 text-white text-xs">
                {course.duration}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-black dark:text-white line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {course.description}
        </p>
        
        <div className="mt-auto">
          {course.free ? (
            <Link 
              href={`/learn/nft/${course.slug}`}
              className="block w-full text-center bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Start Learning
            </Link>
          ) : (
            <Link 
              href={`/learn/nft/${course.slug}`}
              className="block w-full text-center border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Preview Course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}