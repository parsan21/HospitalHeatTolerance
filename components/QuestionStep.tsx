'use client';

import type { Answer, Question } from '@/lib/types';

interface QuestionStepProps {
  questions: Question[];
  answers: Answer[];
  onAnswerChange: (questionId: string, value: number) => void;
}

const scoreLabels = ['0', '1', '2', '3', '4', '5'];

export function QuestionStep({ questions, answers, onAnswerChange }: QuestionStepProps) {
  return (
    <div className="mt-8 grid gap-6">
      {questions.map((question) => {
        const answer = answers.find((item) => item.questionId === question.id);
        const selected = answer?.value ?? 0;

        return (
          <div key={question.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{question.text}</h3>
                <p className="mt-1 text-sm text-slate-500">Gewichtung: {question.weight}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {scoreLabels.map((label) => {
                  const value = Number(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                        selected === value
                          ? 'border-slate-950 bg-slate-950 text-white'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                      onClick={() => onAnswerChange(question.id, value)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
