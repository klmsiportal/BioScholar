export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string; // The text of the correct answer
  explanation?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface UserProgress {
  [moduleId: string]: {
    score: number;
    totalAttempted: number;
    completedQuestions: number[]; // IDs of correctly answered questions
  };
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isPremium?: boolean;
}
