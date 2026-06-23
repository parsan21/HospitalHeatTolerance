"use client";

import { useState } from 'react';
import { FeatureCard } from './FeatureCard';
import { HeroSection } from './HeroSection';

export function HomepageSections() {
  const [statusMessage, setStatusMessage] = useState('');

  const handleStartAssessment = () => {
    setStatusMessage('Das Assessment wird vorbereitet...');
  };

  const handleLearnMore = () => {
    setStatusMessage('Weitere Informationen werden geladen...');
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-center gap-10">
      <HeroSection
        title="Willkommen zur Basisversion der Plattform"
        subtitle="Dies ist die visuelle Startseite. Hier siehst du das grundlegende Layout ohne funktionale Logik. Später werden Assessment, Score-Dashboard und Empfehlungen ergänzt."
        primaryActionLabel="Assessment starten"
        secondaryActionLabel="Mehr erfahren"
        onPrimaryAction={handleStartAssessment}
        onSecondaryAction={handleLearnMore}
      />

      {statusMessage ? (
        <div className="rounded-3xl border border-sky-200 bg-sky-50 px-6 py-4 text-slate-800 shadow-sm">
          {statusMessage}
        </div>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-3">
        <FeatureCard
          title="Bewertung"
          description="Später werden hier die Kategorien der Heat Resilience übersichtlich angezeigt."
        />
        <FeatureCard
          title="Visualisierung"
          description="Der Dashboard-Bereich bleibt leer, bis Diagramme und Score-Widgets eingebaut sind."
        />
        <FeatureCard
          title="Empfehlungen"
          description="Hier erscheinen nach der Auswertung passende Maßnahmen und Hinweise."
        />
      </section>
    </div>
  );
}
