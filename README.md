# Hospital Heat Resilience Assessment Platform

## Overview

This project is a web-based assessment platform hosted on Vercel that enables hospitals to evaluate their preparedness and resilience against heat-related risks.

Hospitals complete a structured questionnaire consisting of multiple categories and weighted questions. Based on the responses, the platform calculates a heat resilience score, visualizes the results in an interactive radar (spider web) chart, and provides actionable recommendations to improve heat preparedness.

## Objectives

* Assess hospital heat resilience across multiple domains.
* Identify strengths and weaknesses.
* Provide a transparent scoring methodology.
* Generate category-specific recommendations for improvement.
* Support climate adaptation and heat action planning in healthcare facilities.

## Assessment Categories

The questionnaire is organized into the following categories:

1. Climate Strategy & Cross-Cutting Questions

   * Questions intended for climate officers or sustainability managers.

2. Buildings & Technical Infrastructure

   * Building design, cooling systems, shading, ventilation, emergency power, etc.

3. Governance & Communication

   * Policies, heat action plans, communication procedures, responsibilities.

4. Workforce

   * Staff protection, training, awareness, workload management during heat events.

5. Care Delivery & Patients

   * Patient protection measures, clinical procedures, vulnerable patient management.

## Questionnaire

* Questions are answered on a numerical scale (e.g., 0–5).
* Questions are grouped by category.
* Individual questions can have different weights.
* Weighted scores contribute to category scores and the overall heat resilience score.

## Scoring Methodology

### Question Score

Each question consists of:

* Answer value (0–5)
* Weight factor

Weighted Score = Answer × Weight

### Category Score

Category Score = Sum of Weighted Scores / Maximum Possible Weighted Score

The result is normalized to a percentage value (0–100).

### Overall Score

The overall score is calculated using all category scores and their respective weights.

## Results Dashboard

After completing the questionnaire, users receive:

### Radar (Spider Web) Chart

The chart visualizes performance across all categories:

* Climate Strategy & Cross-Cutting Questions
* Buildings & Technical Infrastructure
* Governance & Communication
* Workforce
* Care Delivery & Patients

### Interactive Category Details

Users can click on any category to view:

* Detailed score breakdown
* Individual question results
* Strengths and weaknesses
* Suggested improvement measures

## Recommendations Engine

Each category contains predefined improvement measures linked to score thresholds.

Example:

* Score < 40% → Critical recommendations
* Score 40–70% → Improvement recommendations
* Score > 70% → Optimization recommendations

Recommendations are maintained in a configurable data structure to allow future updates without changing application logic.

## Technical Requirements

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Responsive design

### Hosting

* Vercel

### Visualization

* Radar/Spider Chart library (e.g., Recharts)

### Data Management

* Configurable question catalog
* Configurable weighting system
* Recommendation mapping

## Future Enhancements

* PDF report generation
* Benchmarking between hospitals
* Multi-language support
* User authentication
* Historical assessments and progress tracking
* Export to Excel/PDF
