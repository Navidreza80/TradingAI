export interface EducationalContent {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration?: string;
  category: string;
  topics: string[];
  free: boolean;
  premium: boolean;
  author: string;
  publishedAt: string;
  updatedAt: string;
  lessons?: number;
  rating?: number;
  enrolled?: number;
}

export interface Exam {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  questions: number;
  duration: string;
  passingScore: number;
  topics: string[];
  certificate: boolean;
  free: boolean;
  premium: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  exams: number;
  duration: string;
  skills: string[];
  price: string;
  free: boolean;
  premium: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  content: string;
  duration: string;
  courseId: string;
  order: number;
  free: boolean;
  premium: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  examId: string;
}