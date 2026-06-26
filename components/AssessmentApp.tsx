'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Answer, CategoryKey, StoredAssessment } from '@/lib/types';
import { calculateAssessment, buildEmptyAnswers, getRecommendationsForCategory } from '@/lib/scoring';
import { supabase } from '@/lib/supabaseClient';
import { questions, categories } from '@/data/questions';
import { recommendations } from '@/data/recommendations';
import { QuestionStep } from './QuestionStep';
import { ResultDashboard } from './ResultDashboard';

const categoryOrder: CategoryKey[] = ['climate', 'building', 'governance', 'staff', 'care'];

export function AssessmentApp() {
  const [answers, setAnswers] = useState<Answer[]>(() => buildEmptyAnswers(questions));
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [savedAssessment, setSavedAssessment] = useState<StoredAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const assessment = useMemo(() => calculateAssessment(questions, answers), [answers]);
  const currentCategory = categoryOrder[activeStep] ?? 'climate';
  const categoryQuestions = questions.filter((question) => question.category === currentCategory);
  const progress = Math.round(((activeStep + 1) / categoryOrder.length) * 100);

  useEffect(() => {
    async function loadAssessment() {
      const response = await fetch('/api/assessments');
      const json = await response.json();

      if (response.status === 401) {
        router.replace('/login');
        return;
      }

      if (!response.ok) {
        setIsLoading(false);
        return;
      }

      const assessmentData: StoredAssessment | null = json.assessment;

      if (assessmentData?.answers) {
        setAnswers(assessmentData.answers);
        setSavedAssessment(assessmentData);
      }

      if (assessmentData?.progress != null) {
        setActiveStep(assessmentData.progress);
      }

      setIsLoading(false);
    }

    loadAssessment();
  }, [router]);

  async function saveAssessment(): Promise<boolean> {
    setSaveMessage('Speichere Assessment...');

    const response = await fetch('/api/assessments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers, progress: activeStep }),
    });

    const json = await response.json();

    if (!response.ok) {
      setSaveMessage(`Fehler: ${json.error ?? 'Speichern fehlgeschlagen'}`);
      return false;
    }

    setSavedAssessment(json.assessment);
    setSaveMessage('Ihre Antworten wurden gespeichert.');
    return true;
  }

  async function handleSave() {
    await saveAssessment();
  }

  function handleAnswerChange(questionId: string, value: number) {
    setAnswers((prev) => prev.map((answer) => (answer.questionId === questionId ? { ...answer, value } : answer)));
  }

  function handleNext() {
    setActiveStep((prev) => Math.min(prev + 1, categoryOrder.length));
  }

  function handleBack() {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }

  function handleCategorySelect(category: CategoryKey) {
    setSelectedCategory(category);
  }

  async function handleLogout() {
    setIsSigningOut(true);
    const saved = await saveAssessment();

    if (!saved) {
      setIsSigningOut(false);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      setIsSigningOut(false);
      setSaveMessage(`Logout fehlgeschlagen: ${error.message}`);
      return;
    }

    router.push('/login');
  }

  function handleJumpToStart() {
    setActiveStep(0);
    setSelectedCategory(null);
  }

  function handleReset() {
    setAnswers(buildEmptyAnswers(questions));
    setActiveStep(0);
    setSelectedCategory(null);
    setSavedAssessment(null);
  }

  if (isLoading) {
    return <div className="container py-10">Lade Assessment-Daten …</div>;
  }

  if (activeStep >= categoryOrder.length) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-end gap-3 mb-6">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isSigningOut}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSigningOut ? 'Logout...' : 'Logout'}
          </button>
        </div>

        <ResultDashboard
          assessment={assessment}
          categories={categories}
          selectedCategory={selectedCategory}
          questions={questions}
          answers={answers}
          recommendations={getRecommendationsForCategory(recommendations, selectedCategory ?? 'climate', selectedCategory ? assessment.categoryScores.find((item) => item.category === selectedCategory)?.normalizedScore ?? 0 : 0)}
          onCategorySelect={handleCategorySelect}
          onReset={handleReset}
        />
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Speichern
          </button>
          <button
            type="button"
            onClick={handleJumpToStart}
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Zum Anfang
          </button>
        </div>
        {saveMessage ? <p className="mt-4 text-sm text-slate-600">{saveMessage}</p> : null}
      </div>
    );
  }

  return (
    <main className="container py-10">
      <section className="bg-white rounded-3xl shadow-card p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Hitzeresilienz</p>
            <h1 className="text-3xl font-semibold text-slate-950">Bewertung für Krankenhäuser</h1>
            <p className="mt-2 max-w-2xl text-slate-600">Beantworten Sie die Fragen für jede Kategorie. Ihre zuletzt gespeicherten Antworten werden automatisch geladen.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-inner">
            Fortschritt: <span className="font-semibold">{progress}%</span>
          </div>
        </div>

        <div className="mt-8 border-b border-slate-200 pb-6">
          <h2 className="text-xl font-semibold text-slate-900">Kategorie: {categories[currentCategory]}</h2>
          <p className="mt-2 text-slate-600">Bewerte jede Frage auf der Skala von 0 bis 4.</p>
        </div>

        <QuestionStep questions={categoryQuestions} answers={answers} onAnswerChange={handleAnswerChange} />

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-3">
            {activeStep > 0 ? (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={handleBack}
              >
                Zurück
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-400"
                disabled
              >
                Zurück
              </button>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
              onClick={handleNext}
            >
              {activeStep === categoryOrder.length - 1 ? 'Ergebnis anzeigen' : 'Nächste Kategorie'}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={handleJumpToStart}
            >
              Zum Anfang
            </button>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Speichern
            </button>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isSigningOut}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSigningOut ? 'Logout...' : 'Logout'}
            </button>
          </div>
        </div>
        {saveMessage ? <p className="mt-4 text-sm text-slate-600">{saveMessage}</p> : null}
      </section>
    </main>
  );
}
