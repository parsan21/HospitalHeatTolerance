import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex flex-col">
      
      {}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          
          {}
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Herzlich Willkommen beim Hospital Heat Resilience Assessment
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              Das Hospital Heat Resilience Assessment (HHRA) ist ein webbasiertes Tool,
              das Krankenhäusern dabei hilft, ihre Hitzetoleranz zu bewerten und zu
              verbessern. Es ermöglicht die strukturierte Bewertung der Hitzeresilienz
              von Krankenhäusern und liefert direkt umsetzbare Optimierungsmaßnahmen.
            </p>

            <div className="space-y-3 text-sm text-slate-600">
              <div>✔ Sichere Speicherung pro Benutzer</div>
              <div>✔ Strukturierte Assessments</div>
              <div>✔ Datenschutz durch Supabase RLS</div>
            </div>

            <div className="pt-4 text-xs text-slate-400">
              Bitte melden Sie sich an, um fortzufahren.
            </div>
          </div>

          {/* Rechte Seite */}
          <div className="w-full">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <LoginForm />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-5 text-sm text-slate-600">
          <div>
            Verantwortlich:{' '}
            <span className="font-medium text-slate-900">
              Max Mustermann
            </span>
          </div>
          <div>Musterstraße 1, 12345 Musterstadt</div>
          <div className="mt-1">
            <a
              href="mailto:max@example.com"
              className="text-sky-600 hover:underline"
            >
              max@example.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}