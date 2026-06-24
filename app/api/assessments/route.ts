import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabaseServer';
import { questions } from '@/data/questions';
import { calculateAssessment } from '@/lib/scoring';

export async function GET() {
  const supabase = createSupabaseServer();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('assessments')
    .select('id, score, answers, created_at, updated_at')
    .eq('user_id', session.user.id)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ assessment: data ?? null });
}

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServer();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const answers = payload.answers;

  if (!Array.isArray(answers)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const assessmentResult = calculateAssessment(questions, answers);
  const { data, error } = await supabase
  .from('assessments')
  .upsert(
    {
      user_id: session.user.id,
      score: assessmentResult.normalizedTotal,
      answers,
    },
    {
      onConflict: 'user_id',
    }
  )
  .select()
  .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ assessment: data?.[0] ?? null });
}
