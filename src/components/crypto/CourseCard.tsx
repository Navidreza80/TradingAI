import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EducationalContent } from '@/types/crypto';

interface CourseCardProps {
  course: EducationalContent;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="h-40 relative">
        <Image 
          src={course.image} 
          alt={course.title} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 m-2 rounded-br rounded-tl">
          {course.level}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
          {course.title}
        </h3>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{course.lessons} Lessons</span>
          <span>{course.students.toLocaleString()} Students</span>
        </div>
        <Link
          href={`/learn/crypto/course/${course.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-md transition duration-300"
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
}