export type CategoryKey = 'climate' | 'building' | 'governance' | 'staff';

export interface Question {
  id: string;
  category: CategoryKey;
  text: string;
  weight: number;
  measureDescription?: string;
  measureId?: string;
  /**
   * Type of the question. Defaults to 'scale' when omitted.
   * - 'scale' = numerical scale 0..4
   * - 'boolean' = yes/no stored as 4/0
   */
  type?: 'scale' | 'boolean';
  /**
   * Optional: whether the question is required
   */
  required?: boolean;
}

export interface Answer {
  questionId: string;
  value: number;
  answer?: number;
  scaleValue?: number;
  weight?: number;
  measureId?: string;
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
  questionId?: string;
  measureId?: string;
  answer?: number;
  scaleValue?: number;
  weight?: number;
  priorityScore?: number;
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
