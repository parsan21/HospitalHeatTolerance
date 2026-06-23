import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AssessmentPage() {
  const cookieStore = cookies();

  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session?.user) {
    redirect('/login');
  }

  const { data } = await supabaseServer
    .from('assessments')
    .select('id, score, created_at')
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
            <p className="mt-1 text-sm text-slate-600">
              Datum: {new Date(data.created_at).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="mt-6 text-slate-600">Keine Assessment-Daten gefunden.</p>
        )}
      </div>
    </main>
  );
}