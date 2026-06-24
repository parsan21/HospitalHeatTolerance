'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session && !error) {
        router.replace('/assessment');
      } else {
        router.replace('/login');
      }
    };

    handleCallback();
  }, [router]);

  return <p className="min-h-screen flex items-center justify-center text-slate-700">Logging you in…</p>;
}