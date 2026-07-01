import type { Answer, AssessmentResult, CategoryScore, Question, CategoryKey, Recommendation } from './types';
import { categories } from '@/data/questions';

export function calculateDisplayValue(question: Question, value: number): number {
  if (question.type === 'boolean') {
    return value === 1 ? 4 : 0;
  }

  return value;
}

export function calculateQuestionScore(question: Question, value: number): number {
  const displayValue = calculateDisplayValue(question, value);
  return displayValue * question.weight;
}

export function normalizeAnswer(question: Question, value: number | undefined, existingAnswer?: Partial<Answer>): Answer {
  const normalizedValue = typeof value === 'number' ? value : existingAnswer?.value ?? existingAnswer?.answer ?? 0;
  const safeValue = Number.isFinite(normalizedValue) ? normalizedValue : 0;
  const scaleValue = question.type === 'boolean' ? (safeValue === 1 ? 4 : 0) : safeValue;

  return {
    questionId: question.id,
    value: safeValue,
    answer: safeValue,
    scaleValue,
    weight: question.weight,
    measureId: question.measureId ?? question.id,
  };
}

export function buildEmptyAnswers(questions: Question[]): Answer[] {
  return questions.map((question) => normalizeAnswer(question, 0));
}

export function normalizeAnswers(questions: Question[], answers: Answer[]): Answer[] {
  return questions.map((question) => {
    const answer = answers.find((item) => item.questionId === question.id);
    return normalizeAnswer(question, answer?.value ?? answer?.answer, answer);
  });
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

  const normalizedAnswers = normalizeAnswers(questions, answers);

  questions.forEach((question) => {
    const answer = normalizedAnswers.find((item) => item.questionId === question.id);
    const value = answer?.value ?? 0;
    const weightedScore = calculateQuestionScore(question, value);
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

export function buildMeasuresByCategory(questions: Question[], answers: Answer[] = []): Record<CategoryKey, Recommendation[]> {
  const groupedMeasures = Object.keys(categories).reduce<Record<CategoryKey, Recommendation[]>>((accumulator, key) => {
    accumulator[key as CategoryKey] = [];
    return accumulator;
  }, {} as Record<CategoryKey, Recommendation[]>);

  const normalizedAnswers = normalizeAnswers(questions, answers);

  questions.forEach((question) => {
    const answer = normalizedAnswers.find((item) => item.questionId === question.id);
    const answerValue = answer?.value ?? 0;
    const scaleValue = answer?.scaleValue ?? 0;
    const hasMeasure = Boolean(question.measureDescription || question.measureId);
    const shouldInclude = question.type === 'boolean' ? answerValue === 0 : answerValue < 3;

    if (!hasMeasure || !shouldInclude || answer == null) {
      return;
    }

    const priorityScore = question.weight * 10 - answerValue;
    const title = question.text;
    const description = question.measureDescription ?? 'Bitte prüfen Sie die Maßnahme zu dieser Frage.';

    groupedMeasures[question.category].push({
      category: question.category,
      title,
      description,
      minScore: 0,
      maxScore: 100,
      questionId: question.id,
      measureId: question.measureId ?? question.id,
      answer: answer.value,
      scaleValue,
      weight: question.weight,
      priorityScore,
    });
  });

  Object.values(groupedMeasures).forEach((items) => {
    items.sort((left, right) => {
      if ((right.priorityScore ?? 0) !== (left.priorityScore ?? 0)) {
        return (right.priorityScore ?? 0) - (left.priorityScore ?? 0);
      }

      return left.title.localeCompare(right.title);
    });
  });

  return groupedMeasures;
}

export function getRecommendationsForCategory(category: CategoryKey, questions: Question[] = [], answers: Answer[] = []) {
  return buildMeasuresByCategory(questions, answers)[category] ?? [];
}
