'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setMessage('Login wird vorbereitet...');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(`Fehler: ${error.message}`);
      return;
    }

    setMessage('Login-Link gesendet. Bitte prüfe deine E-Mails.');
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <h1 className="text-3xl font-semibold text-slate-900">Login</h1>

        <p className="mt-3 text-slate-600">
          Melde dich mit deiner E-Mail an, um deine Assessment-Daten zu speichern.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
          />

          <button
            type="button"
            onClick={handleLogin}
            className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Login per Magic Link
          </button>

          {message && (
            <p className="text-sm text-slate-600">{message}</p>
          )}
        </div>
      </div>
    </main>
  );
}