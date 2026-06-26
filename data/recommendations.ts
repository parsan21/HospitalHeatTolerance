import type { Recommendation } from '@/lib/types';

export const recommendations: Recommendation[] = [
  {
    category: 'climate',
    title: 'Kritische Klimamaßnahmen starten',
    description: 'Überprüfen Sie die Klimastrategie und beginnen Sie sofort mit messbaren Reduktionszielen.',
    minScore: 0,
    maxScore: 39,
  },
  {
    category: 'climate',
    title: 'Klimaoptimierung planen',
    description: 'Formalisieren Sie Führungsrollen und kommunizieren Sie Ziele aktiv.',
    minScore: 40,
    maxScore: 69,
  },
  {
    category: 'climate',
    title: 'Klimaprogramm optimieren',
    description: 'Nutzen Sie Monitoring und externe Standards zur kontinuierlichen Verbesserung.',
    minScore: 70,
    maxScore: 100,
  },
  {
    category: 'building',
    title: 'Technische Notfallmaßnahmen umsetzen',
    description: 'Erstellen Sie eine Prioritätenliste für Kühlung, Klima und Notstrom.',
    minScore: 0,
    maxScore: 39,
  },
  {
    category: 'building',
    title: 'Betriebliche Resilienz stärken',
    description: 'Fokussieren Sie sich auf Wartung, Energieeffizienz und Redundanzen.',
    minScore: 40,
    maxScore: 69,
  },
  {
    category: 'building',
    title: 'Technikstrategien ausbauen',
    description: 'Optimieren Sie die Gebäudeautomation und messen Sie Energieflüsse.',
    minScore: 70,
    maxScore: 100,
  },
  {
    category: 'governance',
    title: 'Governance-Strukturen sichern',
    description: 'Schaffen Sie klare Berichtswege für Hitze-Risiken und Notfallkommunikation.',
    minScore: 0,
    maxScore: 39,
  },
  {
    category: 'governance',
    title: 'Governance-Prozesse verbessern',
    description: 'Ergänzen Sie regelmäßige Reviews und Abstimmungsprozesse.',
    minScore: 40,
    maxScore: 69,
  },
  {
    category: 'governance',
    title: 'Kommunikationsprozesse standardisieren',
    description: 'Nutzen Sie strukturierte Leitlinien zur interner und externer Kommunikation.',
    minScore: 70,
    maxScore: 100,
  },
  {
    category: 'staff',
    title: 'Personalabsicherung umsetzen',
    description: 'Sorgen Sie für Schulungen, Pausen und Schutzmaßnahmen besonders für kritische Teams.',
    minScore: 0,
    maxScore: 39,
  },
  {
    category: 'staff',
    title: 'Personalstärke steigern',
    description: 'Entwickeln Sie Schulungsprogramme und Maßnahmen für Belastungsspitzen.',
    minScore: 40,
    maxScore: 69,
  },
  {
    category: 'staff',
    title: 'Personalresilienz festigen',
    description: 'Setzen Sie auf fortgeschrittene Schulungen und ergonomische Arbeitsbedingungen.',
    minScore: 70,
    maxScore: 100,
  }
];
