export type CategoryKey = 'climate' | 'building' | 'governance' | 'staff' | 'care';

export interface Question {
  id: string;
  category: CategoryKey;
  text: string;
  weight: number;
}

export interface Answer {
  questionId: string;
  value: number;
}

export interface CategoryScore {
  category: CategoryKey;
  label: string;
  totalWeight: number;
  rawScore: number;
  normalizedScore: number;
  maxScore: number;
}

export interface AssessmentResult {
  categoryScores: CategoryScore[];
  totalWeight: number;
  rawTotal: number;
  normalizedTotal: number;
}

export interface Recommendation {
  category: CategoryKey;
  title: string;
  description: string;
  minScore: number;
  maxScore: number;
}

export interface Hospital {
  id: string;
  user_id: string;
  hospital_name: string;
  created_at: string;
  updated_at: string;
}

export interface StoredAssessment {
  id: string;
  user_id: string;
  score: number;
  answers: Answer[];
  progress?: number;
  created_at: string;
  updated_at: string;
}
