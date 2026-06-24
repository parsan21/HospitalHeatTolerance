'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    let isClosed = false;
    let timeoutId: number | undefined;

    const handleSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user && !isClosed) {
        window.clearTimeout(timeoutId);
        router.replace('/assessment');
      }
    };

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && !isClosed) {
        window.clearTimeout(timeoutId);
        router.replace('/assessment');
      }
    });

    timeoutId = window.setTimeout(() => {
      if (!isClosed) {
        router.replace('/login');
      }
    }, 5000);

    const subscription = data?.subscription;
    handleSession();

    return () => {
      isClosed = true;
      window.clearTimeout(timeoutId);
      subscription?.unsubscribe();
    };
  }, [router]);

  return <p className="min-h-screen flex items-center justify-center text-slate-700">Logging you in…</p>;
}