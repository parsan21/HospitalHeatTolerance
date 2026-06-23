"use client";

import { Button } from './Button';

type HeroSectionProps = {
  title: string;
  subtitle: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
};

export function HeroSection({
  title,
  subtitle,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: HeroSectionProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
          Hospital Heat Resilience Assessment
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">{subtitle}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button label={primaryActionLabel} onClick={onPrimaryAction} variant="primary" />
          <Button label={secondaryActionLabel} onClick={onSecondaryAction} variant="secondary" />
        </div>
      </div>
    </section>
  );
}