# Hitzeschutz-Assessment für Krankenhäuser

## Überblick

Diese Anwendung ist ein webbasiertes Assessment-Tool für Krankenhäuser, mit dem die Hitzeschutz- und Hitzeresilienz-Strategie einer Einrichtung bewertet werden kann. Das Produkt richtet sich an Verantwortliche aus Klinikmanagement, Technik, Governance, Pflege und Klimaschutz.

Die App besteht aus einem mehrstufigen Fragebogen mit gewichteten Fragen, einer Ergebnisübersicht und einem interaktiven Dashboard mit Empfehlungen für konkrete Verbesserungsmaßnahmen.

## Was das Produkt heute kann

- Mehrstufiges Assessment mit vier Kategorien
- Zwei Fragetypen:
  - Skala von 0 bis 4
  - Ja/Nein-Fragen (boolesche Fragen)
- Gewichtete Bewertung einzelner Fragen
- Gesamtscore und Kategorien-Scores in Prozent
- Interaktives Radar-Diagramm zur Visualisierung der Ergebnisse
- Detaillierte Ansicht pro Kategorie mit Einzelbewertungen und Maßnahmenvorschlägen
- Speicherung von Antworten und Fortschritt
- Login-/Logout-Fluss über Supabase
- Zurücksetzen des Assessments und Neustart an der Anfangsposition

## Bewertete Kategorien

Das Assessment ist aktuell in folgende Bereiche gegliedert:

1. Klima & übergeordnete Fragen für den Klimaschutzbeauftragten
2. Gebäude & Technik
3. Governance & Kommunikation
4. Personal, Versorgung & Patienten

## Fragebogen und Bewertung

Die Fragen werden pro Kategorie beantwortet. Für jede Frage wird eine Bewertung erfasst und anschließend gewichtet ausgewertet.

Wichtige Aspekte der Bewertung:

- Skalenfragen werden direkt auf der Skala 0 bis 4 bewertet.
- Boolesche Fragen werden als Ja = 4 und Nein = 0 interpretiert.
- Jede Frage hat eine individuelle Gewichtung.
- Der Gesamtscore wird aus den gewichteten Ergebnissen berechnet und als Prozentsatz dargestellt.

## Ergebnisdarstellung

Nach Abschluss des Assessments erhalten Nutzer:innen:

- eine Gesamtbewertung in Prozent
- einen Kategorienvergleich über ein Radar-Diagramm
- eine Detailansicht für jede Kategorie
- Empfehlungen zu Maßnahmen, die auf Basis der Antworten generiert werden

## Technischer Stack

- Next.js 
- React 
- TypeScript
- Tailwind CSS
- Recharts für Diagramme
- Supabase für Authentifizierung und Datenhaltung

## Projektstruktur

- app/: Seiten und Routen der Anwendung
- components/: UI-Komponenten wie Fragebogen, Ergebnisansicht und Login
- data/: Fragekatalog und Kategorien
- lib/: Logik für Scoring, Supabase und Typen
- supabase/: Datenbank-/Schema-Definitionen

## Lokale Entwicklung

1. Abhängigkeiten installieren
   ```bash
   npm install
   ```
2. Umgebungsvariablen für Supabase setzen
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Entwicklungsserver starten
   ```bash
   npm run dev
   ```
4. Die Anwendung ist dann unter http://localhost:3000 verfügbar

## Deployment

Die Anwendung ist für den Einsatz auf Vercel vorbereitet und nutzt Supabase für die Authentifizierung und Speicherung der Assessment-Daten.

## Ziel des Produkts

Das Ziel ist es, Krankenhäusern eine einfache und strukturierte Möglichkeit zu geben, ihre Hitzeschutzfähigkeit zu beurteilen, Schwachstellen sichtbar zu machen und konkrete, priorisierte Maßnahmen für Verbesserungen abzuleiten.

---

# Hospital Heat Resilience Assessment for Hospitals

## Overview

This application is a web-based assessment tool for hospitals to evaluate their heat protection and heat resilience strategy. It is designed for stakeholders from hospital management, technical operations, governance, nursing, and climate protection.

The app consists of a multi-step questionnaire with weighted questions, an results overview, and an interactive dashboard with recommendations for concrete improvement measures.

## What the product offers today

- Multi-step assessment with four categories
- Two question types:
  - Scale from 0 to 4
  - Yes/No questions (boolean questions)
- Weighted evaluation of individual questions
- Overall score and category scores in percent
- Interactive radar chart for visualizing the results
- Detailed view per category with individual ratings and suggested measures
- Saving of answers and progress
- Login/logout flow via Supabase
- Resetting the assessment and restarting from the beginning

## Assessment categories

The assessment is currently structured into the following areas:

1. Climate and overarching questions for the climate protection officer
2. Buildings and technology
3. Governance and communication
4. Personnel, care, and patients

## Questionnaire and scoring

Questions are answered per category. Each response is recorded and then evaluated with weighting.

Key aspects of the scoring:

- Scale questions are rated directly on a 0 to 4 scale.
- Boolean questions are interpreted as Yes = 4 and No = 0.
- Each question has an individual weight.
- The overall score is calculated from the weighted results and displayed as a percentage.

## Result presentation

After completing the assessment, users receive:

- an overall rating in percent
- a category comparison via a radar chart
- a detailed view for each category
- recommendations for measures generated from the answers

## Technical stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts for charts
- Supabase for authentication and data storage

## Project structure

- app/: application pages and routes
- components/: UI components such as the questionnaire, result view, and login
- data/: question catalog and categories
- lib/: scoring logic, Supabase, and types
- supabase/: database and schema definitions

## Local development

1. Install dependencies
   ```bash
   npm install
   ```
2. Set Supabase environment variables
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Start the development server
   ```bash
   npm run dev
   ```
4. The application is then available at http://localhost:3000

## Deployment

The application is prepared for deployment on Vercel and uses Supabase for authentication and storage of assessment data.

## Goal of the product

The goal is to give hospitals a simple and structured way to assess their heat protection capability, make weaknesses visible, and derive concrete, prioritized measures for improvement.

