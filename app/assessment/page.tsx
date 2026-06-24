import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabaseServer';
import { AssessmentApp } from '@/components/AssessmentApp';

export const dynamic = 'force-dynamic';

export default async function AssessmentPage() {
  const supabaseServer = createSupabaseServer();
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return <AssessmentApp />;
}
