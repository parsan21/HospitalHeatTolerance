'use client';

import { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { Answer, AssessmentResult, CategoryKey, Question, Recommendation } from '@/lib/types';
import { categories } from '@/data/questions';

interface ResultDashboardProps {
  assessment: AssessmentResult;
  categories: Record<CategoryKey, string>;
  selectedCategory: CategoryKey | null;
  questions: Question[];
  answers: Answer[];
  recommendations: Recommendation[];
  onCategorySelect: (category: CategoryKey) => void;
  onReset: () => void;
}

export function ResultDashboard({
  assessment,
  categories,
  selectedCategory,
  questions,
  answers,
  recommendations,
  onCategorySelect,
  onReset,
}: ResultDashboardProps) {
  const radarData = assessment.categoryScores.map((score) => ({
    category: categories[score.category],
    value: score.normalizedScore,
    key: score.category,
  }));

  const categoryDetail = useMemo(() => {
    if (!selectedCategory) {
      return null;
    }

    const score = assessment.categoryScores.find((item) => item.category === selectedCategory);
    const detailQuestions = questions.filter((question) => question.category === selectedCategory);

    const detailAnswers = detailQuestions.map((question) => {
      const answer = answers.find((item) => item.questionId === question.id);
      const value = answer?.value ?? 0;

      return {
        text: question.text,
        value,
        weight: question.weight,
        weighted: value * question.weight,
      };
    });

    return {
      score: score?.normalizedScore ?? 0,
      label: categories[selectedCategory],
      questions: detailAnswers,
      strengths: detailAnswers.filter((item) => item.value >= 4),
      weaknesses: detailAnswers.filter((item) => item.value <= 2),
    };
  }, [answers, assessment.categoryScores, questions, selectedCategory]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Ergebnisübersicht</p>
            <h2 className="text-3xl font-semibold text-slate-950">Gesamtscore: {assessment.normalizedTotal} %</h2>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Zurücksetzen
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl bg-white p-8 shadow-card">
          <h3 className="text-xl font-semibold text-slate-900">Radar-Diagramm</h3>
          <p className="mt-2 text-slate-600">Klicken Sie auf eine Kategorie für detaillierte Informationen.</p>
          <div className="mt-8 h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="80%">
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Score" dataKey="value" stroke="#0f172a" fill="#0f172a" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          {assessment.categoryScores.map((score) => (
            <button
              type="button"
              key={score.category}
              className="w-full rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-slate-300"
              onClick={() => onCategorySelect(score.category)}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{categories[score.category]}</h4>
                  <p className="mt-1 text-sm text-slate-500">Score: {score.normalizedScore} %</p>
                </div>
                <div className="shrink-0 whitespace-nowrap rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white">
                  {score.rawScore} / {score.maxScore}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedCategory && categoryDetail ? (
        <section className="rounded-3xl bg-white p-8 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Kategorie-Detail</p>
              <h3 className="text-2xl font-semibold text-slate-950">{categoryDetail.label}</h3>
              <p className="mt-2 text-slate-600">Kategoriescore: {categoryDetail.score} %</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Stärken</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{categoryDetail.strengths.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Schwächen</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{categoryDetail.weaknesses.length}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-900">Einzelbewertungen</h4>
              <div className="space-y-4">
                {categoryDetail.questions.map((item) => (
                  <div key={item.text} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-slate-700">{item.text}</p>
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-white">{item.value} × {item.weight}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">Gewichtete Punkte: {item.weighted}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-900">Empfohlene Maßnahmen</h4>
              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((recommendation) => (
                    <div key={recommendation.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <h5 className="font-semibold text-slate-950">{recommendation.title}</h5>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{recommendation.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl bg-slate-50 p-5 text-slate-600">Für diese Kategorie sind keine spezifischen Maßnahmen vorhanden.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
