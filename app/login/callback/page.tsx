'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    let isClosed = false;

    const handleSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user && !isClosed) {
        router.replace('/assessment');
      }
    };

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && !isClosed) {
        router.replace('/assessment');
      }
    });

    const subscription = data?.subscription;
    handleSession();

    return () => {
      isClosed = true;
      subscription?.unsubscribe();
    };
  }, [router]);

  return <p className="min-h-screen flex items-center justify-center text-slate-700">Logging you in…</p>;
}