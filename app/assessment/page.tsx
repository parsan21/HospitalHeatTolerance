import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../lib/supabaseClient';

export const dynamic = 'force-dynamic';

export default async function AssessmentPage() {
  const supabaseServer = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <h1 className="text-3xl font-semibold text-slate-900">Nicht angemeldet</h1>
          <p className="mt-4 text-slate-600">Bitte melde dich zuerst an, um deine Assessment-Daten zu sehen.</p>
        </div>
      </main>
    );
  }

  const { data } = await supabase
    .from('assessments')
    .select('id,score,created_at')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <h1 className="text-3xl font-semibold text-slate-900">Assessment</h1>
        {data ? (
          <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-slate-700">
            <p className="text-lg font-semibold">Letztes Ergebnis</p>
            <p className="mt-3 text-sm text-slate-600">Score: {data.score}</p>
            <p className="mt-1 text-sm text-slate-600">Datum: {new Date(data.created_at).toLocaleString()}</p>
          </div>
        ) : (
          <p className="mt-6 text-slate-600">Keine Assessment-Daten gefunden.</p>
        )}
      </div>
    </main>
  );
}
