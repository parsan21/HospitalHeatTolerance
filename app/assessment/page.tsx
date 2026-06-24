import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabaseServer';
import { AssessmentApp } from '@/components/AssessmentApp';

export const dynamic = 'force-dynamic';

export default async function AssessmentPage() {
  const supabase = createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <AssessmentApp />;
}