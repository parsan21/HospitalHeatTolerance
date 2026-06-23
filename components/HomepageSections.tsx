"use client";

import { useRouter } from 'next/navigation';
import { FeatureCard } from './FeatureCard';
import { HeroSection } from './HeroSection';

export function HomepageSections() {
  const router = useRouter();

  const handleStartAssessment = () => {
    router.push('/assessment');
  };

  const handleLearnMore = () => {
    router.push('/login');
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-center gap-10">
      <HeroSection
        title="Willkommen zur Basisversion der Plattform"
        subtitle="Dies ist die visuelle Startseite. Hier siehst du das grundlegende Layout ohne funktionale Logik. Später werden Assessment, Score-Dashboard und Empfehlungen ergänzt."
        primaryActionLabel="Assessment starten"
        secondaryActionLabel="Login"
        onPrimaryAction={handleStartAssessment}
        onSecondaryAction={handleLearnMore}
      />

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
