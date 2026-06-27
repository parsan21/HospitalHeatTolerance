import type { Answer, AssessmentResult, CategoryScore, Question, CategoryKey, Recommendation } from './types';
import { categories } from '@/data/questions';

export function buildEmptyAnswers(questions: Question[]): Answer[] {
  return questions.map((question) => ({ questionId: question.id, value: 0 }));
}

export function calculateAssessment(questions: Question[], answers: Answer[]): AssessmentResult {
  type CategoryTotals = {
    totalWeight: number;
    rawScore: number;
    maxScore: number;
  };

  const categoryTotals: Record<CategoryKey, CategoryTotals> =
    Object.fromEntries(
      Object.keys(categories).map((key) => [
        key,
        { totalWeight: 0, rawScore: 0, maxScore: 0 },
      ])
    ) as Record<CategoryKey, CategoryTotals>;

  questions.forEach((question) => {
    const answer = answers.find((item) => item.questionId === question.id);
    const value = answer?.value ?? 0;
    const weightedScore =
      question.type === 'boolean'
        ? (value === 1 ? 4 : 0) * question.weight
        : value * question.weight;
    const maxWeighted = 4 * question.weight;

    categoryTotals[question.category].totalWeight += question.weight;
    categoryTotals[question.category].rawScore += weightedScore;
    categoryTotals[question.category].maxScore += maxWeighted;
  });

  const categoryScores: CategoryScore[] = Object.entries(categoryTotals).map(([category, totals]) => {
    const normalizedScore = totals.maxScore > 0 ? Math.round((totals.rawScore / totals.maxScore) * 100) : 0;

    return {
      category: category as CategoryKey,
      label: categories[category as CategoryKey],
      totalWeight: totals.totalWeight,
      rawScore: totals.rawScore,
      normalizedScore,
      maxScore: totals.maxScore,
    };
  });

  const rawTotal = categoryScores.reduce((sum, item) => sum + item.rawScore, 0);
  const totalWeight = categoryScores.reduce((sum, item) => sum + item.maxScore, 0);
  const normalizedTotal = totalWeight > 0 ? Math.round((rawTotal / totalWeight) * 100) : 0;

  return {
    categoryScores,
    totalWeight,
    rawTotal,
    normalizedTotal,
  };
}

export function getRecommendationsForCategory(
  recommendations: Recommendation[],
  category: CategoryKey,
  score: number
) {
  return recommendations.filter((item) => item.category === category && score >= item.minScore && score <= item.maxScore);
}
