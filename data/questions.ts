import type { Question } from '@/lib/types';

export const categories = {
  climate: 'Klima & übergeordnete Fragen für den Klimaschutzbeauftragten',
  building: 'Gebäude & Technik',
  governance: 'Governance & Kommunikation',
  staff: 'Personal, Versorgung & Patienten',
} as const;

export type CategoryKey = keyof typeof categories;

export const questions: Question[] = [
  {
    id: 'climate-1',
    category: 'climate',
    text: 'Wird die Hitzeresilienz der Einrichtung regelmäßig anhand definierter Kennzahlen, Scores oder Audits bewertet?',
    weight: 5,
  },
  {
    id: 'climate-2',
    category: 'climate',
    text: 'Ist Hitzeschutz verbindlich in Strategie, Risikomanagement, Qualitätsmanagement oder Krankenhausleitung verankert?',
    weight: 4,
  },
  {
    id: 'climate-3',
    category: 'climate',
    text: 'Werden Erfahrungen, Störungen und Beschwerden aus Hitzeereignissen dokumentiert und für Verbesserungen genutzt?',
    weight: 3,
  },
  {
    id: 'climate-4',
    category: 'climate',
    text: 'Werden Klimaprojektionen oder lokale Hitzedaten in Bau-, Sanierungs- und Betriebsplanung einbezogen?',
    weight: 4,
  },
  {
    id: 'building-1',
    category: 'building',
    text: 'Ist eine ausreichende Kühlinfrastruktur in medizinisch kritischen Bereichen vorhanden? ',
    weight: 5,
  },
  {
    id: 'building-2',
    category: 'building',
    text: 'Wurden besonders hitzegefährdete Gebäude, Stationen und Funktionsbereiche systematisch identifiziert?',
    weight: 5,
  },
   {
    id: 'building-3',
    category: 'building',
    text: 'Werden Neubau- und Sanierungsvorhaben verbindlich auf Hitzeschutz geprüft?',
    weight: 5,
  },
   {
    id: 'building-4',
    category: 'building',
    text: 'Werden die Raumtemperaturen in Patientenzimmern und Arbeitsbereichen standardisiert überwacht?',
    weight: 3,
  },
   {
    id: 'building-5',
    category: 'building',
    text: 'Gibt es ein Konzept für den Ausfall kritischer technischer Systeme bei Hitze?',
    weight: 4,
  },
    {
    id: 'building-6',
    category: 'building',
    text: 'Ist der bauliche Zustand des Gebäudes auf Hitzeschutz ausgelegt? ',
    weight: 5,
  },
    {
    id: 'building-7',
    category: 'building',
    text: 'Sind IT-, Server- und medizintechnische Systeme gegen hitzebedingte Ausfälle abgesichert',
    weight: 4,
  },
    {
    id: 'building-8',
    category: 'building',
    text: 'Sind Kühlketten für Medikamente, Blutprodukte und temperaturempfindliche Materialien auch während Transport und Zwischenlagerung gesichert?',
    weight: 5,
  },
    {
    id: 'building-9',
    category: 'building',
    text: 'Gibt es festgelegte Sofortmaßnahmen bei Hitzeereignissen, z.B. Verschattung, Nachtlüftung, mobile Kühlung oder Anpassung von Abläufen? ',
    weight: 4,
  },
    {
    id: 'building-10',
    category: 'building',
    text: 'Werden Außenflächen, Innenhöfe oder versiegelte Bereiche bei der Hitzebelastung des Krankenhausstandorts berücksichtigt?',
    weight: 5,
  },
  {
    id: 'governance-1',
    category: 'governance',
    text: 'Gibt es eine klar benannte Person oder Stelle, die für Hitzeschutz verantwortlich ist? ',
    weight: 5,
  },
  {
    id: 'governance-2',
    category: 'governance',
    text: 'Existieren strukturierte Entscheidungsprozesse für Hitzeschutzmaßnahmen?',
    weight: 3,
  },
  {
    id: 'governance-3',
    category: 'governance',
    text: 'Existiert ein formaler Hitzeschutz- oder Hitzereaktionsplan? ',
    weight: 5,
  },
  {
    id: 'governance-4',
    category: 'governance',
    text: 'Gibt es eine geregelte Finanzierungs- oder Priorisierungslogik für Hitzeschutzmaßnahmen?',
    weight: 5,
  },
  {
    id: 'governance-5',
    category: 'governance',
    text: 'Existiert ein fest definierter Prozess, über den externe Hitzewarnungen empfangen und intern weitergeleitet werden?',
    weight: 5,
  },
  {
    id: 'governance-6',
    category: 'governance',
    text: 'Gibt es eine festgelegte interne Eskalations- und Kommunikationskette für den Eintritt eines Hitzeereignisse? ',
    weight: 5,
  },
  {
    id: 'governance-7',
    category: 'governance',
    text: 'Werden hitze- oder klimabezogene Daten regelmäßig erfasst und ausgewertet?',
    weight: 4,
  },
  {
    id: 'governance-8',
    category: 'governance',
    text: 'Gibts es einen niedrigschwelligen Meldeweg für hitzebedingte Belastungen, Beschwerden oder Beinahe-Ereignisse des Personals',
    weight: 4,
  },
  {
    id: 'staff-1',
    category: 'staff',
    text: 'Gibt es Maßnahmen zum Schutz des Personals vor Hitzebelastung am Arbeitsplatz? ',
    weight: 5,
  },
  {
    id: 'staff-2',
    category: 'staff',
    text: 'Werden Arbeitsorganisation, Pausenregelungen oder Personalbelastung bei Hitzeereignissen berücksichtigt?',
    weight: 3,
  },
  {
    id: 'staff-3',
    category: 'staff',
    text: 'Wird das Personal regelmäßig auf hitzebedingte Gesundheitsrisiken und Schutzmaßnahmen vorbereitet? ',
    weight: 3,
  },
   {
    id: 'staff-4',
    category: 'staff',
    text: 'Wird die Versorgungsqualität unter Hitzestress standardisiert beobachtet?',
    weight: 3,
  },
   {
    id: 'staff-5',
    category: 'staff',
    text: 'Existiert ein strukturiertes Flüssigkeitsmanagement bei Hitzeereignisse?',
    weight: 4,
  },
   {
    id: 'staff-6',
    category: 'staff',
    text: 'Werden hitzesensible Medikamente bei Risikopatient: innen im Rahmen von Hitzewarnungen überprüft?',
    weight: 3,
  },
   {
    id: 'staff-7',
    category: 'staff',
    text: 'Gibt es ein Notfallkonzept für Intensiv- oder IMC-Bereiche bei Ausfall von Kühl- oder Überwachungssystemen?',
    weight: 4,
  },
   {
    id: 'staff-8',
    category: 'staff',
    text: 'Existieren hitzeadaptierte Pflegestandards, und wird ihre Wirksamkeit für die Versorgungsqualität überprüft? ',
    weight: 4,
  },
   {
    id: 'staff-9',
    category: 'staff',
    text: 'Werden ausreichende Mengen an Infusionslösungen und hitzerelevantem Material bei Hitzewarnungen vorgehalten? ',
    weight: 5,
  },
   {
    id: 'staff-10',
    category: 'staff',
    text: 'Ist die Lagerung temperatursensibler Arzneimittel und Blutprodukte bei Hitze ausreichend gesichert? ',
    weight: 5,
  },
   {
    id: 'staff-11',
    category: 'staff',
    text: 'Stehen ausreichend wirksame Kühlhilfsmittel für die direkte Patientenversorgung zur Verfügung?',
    weight: 4,
  },

   {
    id: 'staff-12',
    category: 'staff',
    text: 'Ist die Lagerung temperatursensibler Arzneimittel und Blutprodukte bei Hitze ausreichend gesichert? ',
    weight: 5,
  },
   {
    id: 'staff-13',
    category: 'staff',
    text: 'Ist eine ausreichende und leicht zugängliche Trinkwasserversorgung für Patienten flächendeckend sichergestellt?',
    weight: 4,
  }
];
