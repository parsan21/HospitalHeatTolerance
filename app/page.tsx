import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  redirect('/assessment');
}
