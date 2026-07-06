export const metadata = {
  title: 'Impressum',
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-start justify-center px-6 py-16">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 p-8 shadow-md">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">Impressum</h1>

        <div className="text-sm text-slate-700 space-y-3">
          <div>
            <strong>Verantwortliche:</strong> Max Mustermann
          </div>

          <div>
            <strong>Anschrift:</strong> Musterstraße 1, 12345 Musterstadt
          </div>

          <div>
            <strong>E‑Mail:</strong> <a href="mailto:max@example.com" className="text-sky-600 hover:underline">max@example.com</a>
          </div>
        </div>
      </div>
    </main>
  );
}
