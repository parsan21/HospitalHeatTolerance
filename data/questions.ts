import type { Question } from '@/lib/types';

export const categories = {
  climate: 'Klima & Klimaschutz',
  building: 'Gebäude & Technik',
  governance: 'Governance & Kommunikation',
  staff: 'Personal',
  care: 'Versorgung & Patienten',
} as const;

export type CategoryKey = keyof typeof categories;

export const questions: Question[] = [
  {
    id: 'climate-1',
    category: 'climate',
    text: 'Existiert ein institutionelles Hitzemanagement für das Krankenhaus?',
    weight: 3,
  },
  {
    id: 'climate-2',
    category: 'climate',
    text: 'Sind langfristige Maßnahmen zur Reduktion von Treibhausgasen dokumentiert?',
    weight: 2,
  },
  {
    id: 'building-1',
    category: 'building',
    text: 'Gibt es eine technische Prüfung der Klimaanlagen und Kühlungssysteme?',
    weight: 4,
  },
  {
    id: 'building-2',
    category: 'building',
    text: 'Sind Notfallstromversorgung und Kühlreserven vorhanden?',
    weight: 5,
  },
  {
    id: 'governance-1',
    category: 'governance',
    text: 'Werden Hitze-Risikobewertungen regelmäßig in der Führungsebene diskutiert?',
    weight: 3,
  },
  {
    id: 'governance-2',
    category: 'governance',
    text: 'Gibt es klare Rollen für Hitzeschutz und interne Kommunikation?',
    weight: 3,
  },
  {
    id: 'staff-1',
    category: 'staff',
    text: 'Werden Mitarbeitende in hitzebedingten Sofortmaßnahmen geschult?',
    weight: 4,
  },
  {
    id: 'staff-2',
    category: 'staff',
    text: 'Gibt es besondere Schutzmaßnahmen für besonders belastete Teams?',
    weight: 2,
  },
  {
    id: 'care-1',
    category: 'care',
    text: 'Sind Patientinnen und Patienten in hitzebedingte Versorgungspläne einbezogen?',
    weight: 4,
  },
  {
    id: 'care-2',
    category: 'care',
    text: 'Werden hitzebedingte Betriebsabläufe getestet und dokumentiert?',
    weight: 3,
  },
];
